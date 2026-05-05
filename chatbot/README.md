# AgroBot – Chatbot de Gestión Agrícola Chilena
**CINF104 – Aprendizaje de Máquinas – Universidad Andrés Bello 2026**

AgroBot es un chatbot que responde preguntas sobre agricultura chilena usando un LLM local (`llama3.2:3b`) ejecutado con Ollama. No envía datos a ningún servidor externo.

## Dominio
Cultivos · Plagas · Riego · Fertilización · Normativa laboral agrícola · Cosecha · Clima

## Arquitectura
```
[Navegador Web] ──── HTML/CSS/JS ────▶ [Flask :5000] ──▶ [Ollama :11434] ──▶ [llama3.2:3b]
                                              │
                                    knowledge/system_prompt.py
                                    (base de conocimiento agrícola)
```

---

## Requisitos minimos
- macOS con Apple Silicon (M1) o Intel Core i5-1240P 
- 8 GB RAM
- Python 3.10+
- Ollama instalado

---

## Instalación paso a paso

### 1. Instalar Ollama
Descarga desde https://ollama.com e instala la app en tu Mac.

### 2. Descargar el modelo
Abre Terminal y ejecuta:
```bash
ollama pull llama3.2:3b
```
Espera a que descargue (~2 GB). Verifica con:
```bash
ollama list
```
Deberías ver `llama3.2:3b` en la lista.

### 3. Instalar dependencias Python
Desde la carpeta raíz del proyecto (`CINF104-ML-GRD/`):
```bash
cd chatbot
pip install -r requirements.txt
```

### 4. Iniciar el chatbot
Asegúrate de que la app Ollama esté abierta (ícono en la barra de menú). Luego:
```bash
python app.py
```
Abre tu navegador en: **http://localhost:5000**

---

## Uso
- Escribe tu pregunta en el cuadro de texto y presiona **Enter** o el botón de enviar.
- Usa los botones de temas rápidos para explorar las áreas del dominio.
- El indicador verde en la parte superior muestra si Ollama está conectado.

## Estructura de archivos
```
chatbot/
├── app.py                  # Backend Flask (API + servidor web)
├── requirements.txt        # Dependencias Python
├── README.md               # Este archivo
├── knowledge/
│   └── system_prompt.py    # Base de conocimiento agrícola (prompt engineering)
└── templates/
    └── index.html          # Interfaz web del chatbot
```

## Técnica principal: Prompt Engineering
El chatbot usa un **system prompt** detallado (en `knowledge/system_prompt.py`) que contiene
conocimiento estructurado del dominio agrícola chileno, cubriendo:
- Fenología de uva de mesa, palto, arándano, cereza y kiwi
- Control integrado de la mosca de la fruta (SAG)
- Cálculo de requerimientos hídricos y comparación de sistemas de riego
- Protección contra heladas en viñedos
- Derechos del trabajador agrícola de temporada (Código del Trabajo)
- Registros requeridos para certificación GlobalGAP
- Nutrición y fertilización en frutales

El historial de conversación se mantiene en memoria durante la sesión para permitir
preguntas de seguimiento.

## Modelo LLM
- **Modelo:** `llama3.2:3b` (Meta, licencia Llama 3 Community License)
- **Ejecutado con:** Ollama (100% local, sin API keys, sin envío de datos)
- **Temperatura:** 0.3 (respuestas precisas y consistentes)
- **RAM usada:** ~2.5 GB de los 8 GB disponibles

## Equipo
Cristóbal Flores Villegas · Benjamin Peña Díaz · Matías Muñoz Parraguirre · Francisco Morales Díaz
