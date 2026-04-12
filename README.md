# CINF104 - Proyecto 1: Predicción GRD Hospital El Pino

Proyecto del curso Aprendizaje de Máquina (CINF104) - Universidad Andrés Bello.

## Objetivo

Construir un modelo de ML que prediga el GRD (Grupo Relacionado con el Diagnóstico) de un paciente a partir de sus diagnósticos CIE, procedimientos, edad y sexo.

## Estructura

```
CINF104-ML-GRD/
├── data/               # Datasets (no subir a GitHub si son sensibles)
│   ├── dataset_elpino.csv
│   ├── CIE-9.xlsx
│   ├── CIE-10.xlsx
│   └── ...
├── notebooks/
│   ├── 01_eda.ipynb    # Análisis exploratorio de datos
│   ├── 02_preprocesamiento.ipynb
│   └── 03_modelos.ipynb
├── models/             # Modelos entrenados (.h5, .pkl)
└── reports/            # Figuras y gráficos para el informe
```

## Dataset

- **Fuente:** Hospital El Pino
- **Filas:** 14.561 pacientes
- **Target:** GRD (526 clases)
- **Features:** Diagnóstico principal CIE, hasta 34 diagnósticos secundarios, hasta 30 procedimientos, edad, sexo

## Tecnologías

- Python 3
- pandas, numpy
- scikit-learn
- TensorFlow / Keras
- matplotlib, seaborn
