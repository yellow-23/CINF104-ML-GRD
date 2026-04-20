# CINF104 - Proyecto 1: Predicción GRD Hospital El Pino

Proyecto del curso Aprendizaje de Máquina (CINF104) - Universidad Andrés Bello.

## Objetivo

Construir un modelo de ML que prediga el GRD (Grupo Relacionado con el Diagnóstico) de un paciente a partir de sus diagnósticos CIE, procedimientos, edad y sexo.

## Estructura

```
CINF104-ML-GRD/
├── data/
│   ├── dataset_elpino.csv          # Dataset principal (14,561 pacientes)
│   ├── CIE-9.xlsx                  # Tabla de códigos CIE-9
│   ├── CIE-10.xlsx                 # Tabla de códigos CIE-10
│   ├── IR-GRD V3.1 CON PRECIOS FONASA 2016.xlsx
│   ├── Tablas maestras bases GRD.xlsx
│   └── processed/                  # Datasets preprocesados (generados por 02)
│       ├── X_train.npy / X_val.npy / X_test.npy
│       ├── y_train.npy / y_val.npy / y_test.npy
│       ├── label_encoder.pkl
│       ├── scaler.pkl
│       ├── vocabulario.pkl
│       └── metadata.json
├── documentos/
│   ├── CINF104 Proyecto 1 Parte 1 202610.pdf   # Enunciado oficial
│   └── CINF104-Presentacion.pptx               # Presentación
├── notebooks/
│   ├── 01_eda.ipynb                # Análisis exploratorio de datos ✅
│   ├── 02_preprocesamiento.ipynb   # Pipeline de features y splits ✅
│   └── 03_modelos.ipynb            # Entrenamiento y comparación de modelos ✅
├── models/                         # Modelos entrenados (.keras, .pkl)
├── reports/                        # Figuras y gráficos
└── avance benito camelo/
    └── 01_target_granularidad.ipynb  # Análisis de granularidad del target ✅
```

## Dataset

- **Fuente:** Hospital El Pino
- **Filas:** 14,561 pacientes
- **Columnas:** 68 (diagnósticos, procedimientos, edad, sexo, GRD)
- **Target:** GRD (526 clases originales → 230 con estrategia long-tail, umbral ≥ 10)
- **Features:** Diagnóstico principal CIE + hasta 34 secundarios + hasta 30 procedimientos + edad + sexo

## Decisión de Granularidad del Target

Análisis de 5 niveles jerárquicos del código GRD:

| Nivel | Clases | Singletons | K@80% | Gini |
|---|---|---|---|---|
| grd_full (6 dígitos) | 526 | 76 | 119 | 0.733 |
| grd_base (4 dígitos) | 69 | 5 | 18 | 0.709 |
| grd_cdm_base (3 díg.) | 37 | 1 | 13 | 0.617 |
| cdm (~25 categorías) | 22 | 0 | 11 | 0.477 |
| tipo_phmh (PH/MH) | 3 | 0 | 2 | 0.311 |

**Decisión:** Predecir `grd_full` con estrategia **long-tail** (umbral = 10 ejemplos mínimos):
- 229 GRDs específicos + clase `OTROS` = **230 clases**
- Cubre el **92.4%** de los pacientes con etiqueta específica

## Pipeline de Procesamiento

1. `01_eda.ipynb` — Exploración inicial del dataset
2. `02_preprocesamiento.ipynb` — Extracción de códigos CIE, multi-hot encoding (top-200 diagnósticos + top-100 procedimientos), split estratificado 70/15/15, normalización
3. `03_modelos.ipynb` — Random Forest (baseline), LightGBM, MLP Keras

## Métricas de Evaluación

- **Accuracy** — predicción exacta del GRD
- **Macro-F1** — rendimiento promedio por clase (sensible a clases minoritarias)
- **Top-3 Accuracy** — el GRD real está en el top-3 predicho (relevante para soporte clínico)

## Tecnologías

- Python 3
- pandas, numpy, scikit-learn
- LightGBM
- TensorFlow / Keras
- matplotlib, seaborn, joblib

## Reproducir el proyecto

```bash
# 1. Crear y activar el entorno virtual
python -m venv .venv && source .venv/bin/activate

# 2. Instalar dependencias
pip install pandas numpy scikit-learn lightgbm tensorflow matplotlib seaborn joblib

# 3. Ejecutar notebooks en orden
jupyter notebook notebooks/01_eda.ipynb
jupyter notebook notebooks/02_preprocesamiento.ipynb
jupyter notebook notebooks/03_modelos.ipynb
```
