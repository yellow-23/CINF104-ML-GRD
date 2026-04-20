# Resumen del Paper — Predicción de GRD Hospital El Pino
### CINF104 Aprendizaje de Máquinas — Universidad Andrés Bello, 2026
**Autores:** Cristóbal Flores Villegas, Benjamin Peña Díaz, Matías Muñoz Parraguirre, Francisco Morales Díaz

---

## ¿De qué trata el proyecto?

Construimos un modelo de **inteligencia artificial** que sea capaz de predecir automáticamente el **GRD** (Grupo Relacionado con el Diagnóstico) de un paciente hospitalario. El GRD es un código que los hospitales usan para clasificar los tipos de atención y calcular los costos de cada caso clínico.

Actualmente este proceso lo hace una persona manualmente, lo que es lento y propenso a errores. Nuestro modelo lo hace de forma automática usando los datos clínicos del paciente.

---

## El Dataset

- **Fuente:** Hospital El Pino, San Bernardo, Chile
- **Tamaño:** 14.561 pacientes, 68 columnas por paciente
- **Qué tiene cada fila:** diagnóstico principal CIE, hasta 34 diagnósticos secundarios, hasta 30 procedimientos, edad y sexo del paciente, y el GRD real (etiqueta que queremos predecir)
- **Sin valores nulos** en las columnas clave — datos de buena calidad
- **Edad promedio:** 39.4 años (std 24.7), rango 0–121 años
- **Sexo:** 66% mujeres / 34% hombres (muchos partos → GRDs obstétricos)

---

## El Problema Clave: Demasiadas Clases

El dataset tiene **526 GRDs distintos**, pero la distribución es muy desigual:
- El GRD más frecuente (`146101` – Parto vaginal) aparece solo 813 veces (5.6%)
- 76 GRDs tienen **solo 1 paciente** (imposible de entrenar)
- Para cubrir el 80% de los pacientes, basta con los top 119 GRDs

Esto se llama **distribución long-tail** — unas pocas clases tienen muchos datos, y muchas clases tienen muy pocos.

### Solución: Estrategia Long-Tail

Decidimos **mantener solo los GRDs con al menos 10 pacientes** y agrupar el resto en una clase llamada `OTROS`:
- **229 GRDs específicos** + clase `OTROS` = **230 clases en total**
- Cubre el **92.4%** de los pacientes con etiqueta específica
- Los modelos pueden aprender de estos datos sin ser confundidos por casos rarísimos

---

## Cómo Construimos las Features (variables de entrada)

Para que el modelo "entienda" a cada paciente, convertimos los datos clínicos en números:

| Feature | Descripción | Dimensiones |
|---|---|---|
| Multi-hot diagnósticos | ¿El paciente tiene X código CIE? (sí/no) para los 200 códigos más frecuentes | 200 |
| Multi-hot procedimientos | ¿El paciente tuvo X procedimiento? para los 83 más frecuentes | 83 |
| Edad (normalizada) | Años del paciente, estandarizado | 1 |
| Nº diagnósticos | Cuántos diagnósticos tiene | 1 |
| Nº procedimientos | Cuántos procedimientos tuvo | 1 |
| Sexo | 1=Masculino, 0=Femenino | 1 |
| **TOTAL** | | **287** |

Cada paciente queda representado como un vector de **287 números**.

### División del dataset

| Partición | Pacientes | Uso |
|---|---|---|
| Train | 10.192 (70%) | Para entrenar los modelos |
| Validación | 2.184 (15%) | Para ajustar hiperparámetros |
| Test | 2.185 (15%) | Evaluación final (no se toca durante el entrenamiento) |

---

## Los Modelos que Entrenamos

### 1. Random Forest (Baseline)
- 200 árboles de decisión votando en conjunto
- Modelo clásico e interpretable, nuestro punto de comparación base

### 2. LightGBM
- Gradient Boosting: árboles que se construyen corrigiendo los errores del anterior
- Muy bueno en datos tabulares, usado mucho en competencias de Kaggle
- 500 árboles, se detiene antes si deja de mejorar en validación

### 3. MLP (Red Neuronal)
- **Red neuronal** con 4 capas: 512 → 256 → 128 → 230 neuronas
- Usa **BatchNormalization** (estabiliza el entrenamiento) y **Dropout** (evita memorizar el train)
- Entrenada con el optimizador **Adam** durante ~35 épocas hasta que dejó de mejorar

---

## Resultados

| Modelo | Accuracy | Macro-F1 | Weighted-F1 | Top-3 Acc |
|---|---|---|---|---|
| Random Forest | 50.4% | 16.5% | 42.6% | 76.1% |
| LightGBM | 46.1% | 29.2% | 47.5% | 63.6% |
| **🏆 MLP (Red Neuronal)** | **63.8%** | **42.0%** | **61.7%** | **84.2%** |

### ¿Qué significa cada métrica?

- **Accuracy:** Del total de predicciones, ¿cuántas acertamos exactamente?
- **Macro-F1:** Promedio de F1 por clase sin importar cuán frecuente sea — penaliza fuerte cuando fallamos en clases raras
- **Weighted-F1:** Igual pero ponderado por tamaño de clase
- **Top-3 Accuracy:** ¿El GRD correcto está entre nuestras 3 mejores predicciones? → **84.2%** — esto es muy relevante: en un sistema de apoyo clínico, el codificador elegiría entre los 3 candidatos sugeridos

### La red neuronal gana en todo

La MLP supera a los otros dos modelos en las 4 métricas. El RF tiene buena accuracy porque favorece las clases mayoritarias, pero su Macro-F1 de 16.5% revela que falla mucho en clases minoritarias.

---

## Análisis de Errores

La confusion matrix del MLP en los top-15 GRDs muestra que:
- La mayoría de los GRDs frecuentes se predicen con ≥93% de acierto por clase
- **El error principal:** el GRD `146102` (Parto vaginal sin complicaciones) se confunde con `146101` (Parto vaginal con complicaciones) en el 39% de los casos — los dos códigos son casi idénticos y solo difieren en si hay o no comorbilidades registradas en los diagnósticos secundarios

---

## Overfitting del MLP

Las curvas de entrenamiento muestran un gap moderado:
- **Train accuracy:** ~83%
- **Val accuracy:** ~64%

Esto significa que el modelo tiene **capacidad suficiente** pero le faltan datos para las clases raras. Con más pacientes (o técnicas de oversampling como SMOTE) se podría cerrar este gap.

---

## Comparación con Otros Trabajos

| Trabajo | Clases | Método | Accuracy |
|---|---|---|---|
| Raju et al. (2021) | 25 (categorías) | Gradient Boosting | 72% |
| Goldstein et al. (2017) | 30 clases | Random Forest | 68% |
| **Este trabajo** | **230 clases** | **MLP** | **63.8%** |

Nuestro 63.8% con **230 clases** es comparable o mejor que trabajos que usan **25–30 clases**, un problema mucho más fácil.

---

## Conclusiones

1. **La estrategia long-tail funciona** — agrupar los GRDs raros en `OTROS` nos permite mantener el 92.4% de los datos con etiqueta específica y entrenar modelos razonables

2. **La red neuronal (MLP) es el mejor modelo** — 63.8% accuracy y 84.2% Top-3, adecuado para un sistema de apoyo a la codificación clínica

3. **El principal error es entre GRDs de la misma familia con distinta severidad** — un problema inherente al diseño del IR-GRD en Chile

---

## Qué se podría mejorar (trabajo futuro)

- **Pesos por clase:** Penalizar más los errores en clases raras para mejorar el Macro-F1
- **Embeddings de códigos CIE:** Usar representaciones semánticas vectoriales (Med2Vec) en lugar de multi-hot binario
- **Más hospitales:** Entrenar con datos de múltiples centros para generalizar mejor
- **Pipeline en cascada:** Primero predecir la familia de GRD, luego la severidad — para reducir las confusiones entre variantes del mismo código
- **SHAP:** Análisis de importancia de variables para que los codificadores clínicos entiendan por qué el modelo da cada predicción
