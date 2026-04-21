# Tópico Chatbot — Gestión Agrícola (Fase 2)
### CINF104 – Universidad Andrés Bello, 2026

---

## Dominio Seleccionado: **Gestión Agrícola Chilena**

### ¿Por qué este dominio?

El equipo cuenta con experiencia directa en el área agrícola
(trabajo familiar en el sector) y ha desarrollado previamente un sistema ERP para
empresas agrícolas (proyecto *Cultia*). Esto garantiza acceso a
conocimiento de dominio real y la capacidad de formular preguntas
de validación representativas de los problemas cotidianos del sector.

Chile es el 3er exportador mundial de frutas de contraestación,
con más de 300.000 hectáreas cultivadas. Los trabajadores y
administradores agrícolas requieren acceso rápido a información
técnica sobre cultivos, plagas, riego, normativa laboral y cosecha
— exactamente el tipo de consultas que un chatbot basado en LLM
puede resolver.

---

## Alcance del Chatbot

El chatbot responderá preguntas del dominio agrícola chileno, con foco en:

| Área temática | Ejemplos de conocimiento |
|---|---|
| 🌱 Cultivos y fenología | Ciclos de crecimiento, variedades, épocas de siembra |
| 🐛 Plagas y enfermedades | Identificación, control integrado, pesticidas permitidos |
| 💧 Riego y agua | Cálculo de necesidades hídricas, sistemas de riego, goteo |
| ✂️ Poda y faenas | Prácticas culturales por cultivo |
| 📋 Normativa y trabajo | Código del trabajo agrícola, contrato de temporeros |
| 🌡️ Clima y heladas | Protección ante eventos climáticos adversos |
| 🧪 Fertilización | Nutrientes, suelo, análisis foliar |

---

## Fuentes de Datos

| # | Fuente | Tipo | Contenido |
|---|---|---|---|
| 1 | **SAG** (Servicio Agrícola y Ganadero) — sag.gob.cl | PDF / Web | Plagas cuarentenarias, pesticidas registrados, normativas fitosanitarias |
| 2 | **INIA** (Instituto de Investigaciones Agropecuarias) — inia.cl | PDF / Web | Manuales técnicos de cultivos (uva, manzana, arándano, cereza, palta) |
| 3 | **INDAP** — indap.gob.cl | PDF | Guías de buenas prácticas agrícolas, riego tecnificado |
| 4 | **CNR** (Comisión Nacional de Riego) — cnr.gob.cl | PDF | Fichas técnicas de riego, eficiencia hídrica |
| 5 | **Dirección del Trabajo** — dt.gob.cl | Web | Contrato agrícola, derechos del trabajador de temporada |
| 6 | **ODEPA** (Oficina de Estudios Agroalimentarios) — odepa.gob.cl | Web | Estadísticas, precios de mercado, exportaciones |
| 7 | **Conocimiento experto del equipo** | Interno | Experiencia en faenas agrícolas, cuaderno de campo digital |

---

## 10 Preguntas de Validación

> Estas preguntas guiarán el video de demostración y el análisis de desempeño del chatbot.

| # | Pregunta | Área | Dificultad |
|---|---|---|---|
| 1 | ¿Cuál es el ciclo fenológico de la uva de mesa y cuándo se recomienda realizar la poda de invierno en la zona central de Chile? | Cultivos / Fenología | Media |
| 2 | ¿Qué es la mosca de la fruta (*Ceratitis capitata*) y cuáles son los métodos de control integrado autorizados por el SAG? | Plagas | Alta |
| 3 | ¿Cómo calcular el requerimiento hídrico de un huerto de paltos de 10 hectáreas en la región de Valparaíso durante enero? | Riego | Alta |
| 4 | ¿Cuáles son los derechos laborales de un trabajador agrícola de temporada según el Código del Trabajo chileno? | Normativa laboral | Media |
| 5 | ¿Qué enfermedades fúngicas afectan al arándano y cómo se previenen con manejo cultural? | Enfermedades | Media |
| 6 | ¿Cuál es la diferencia entre riego por goteo y microaspersión y en qué tipo de cultivos conviene usar cada uno? | Riego | Baja |
| 7 | ¿Qué nutrientes son más críticos para el desarrollo de la cereza en etapa de cuaja y cómo se aplican? | Fertilización | Alta |
| 8 | ¿Cuáles son las medidas de protección contra heladas tardías en un viñedo de la región del Maule? | Clima | Media |
| 9 | ¿Qué registros debe llevar un agricultor para obtener la certificación GlobalGAP? | Normativa / Calidad | Alta |
| 10 | ¿Cómo se determina el punto óptimo de cosecha del kiwi y qué índices se usan para medirlo? | Cosecha | Media |

---

## Arquitectura Técnica Propuesta

```
[Usuario] → [Interfaz Web Simple (HTML/JS)]
                        ↓
              [API Backend (Python Flask)]
                        ↓
         [Prompt Engineering + Contexto RAG]
                        ↓
        [LLM Local: Ollama + Llama 3 / DeepSeek]
                        ↓
     [Base de conocimiento: PDFs SAG + INIA + INDAP]
```

- **LLM:** Llama 3.2 (8B) vía [Ollama](https://ollama.ai) — corre 100% local
- **RAG (Retrieval Augmented Generation):** LangChain + ChromaDB para indexar los PDFs
- **Frontend:** HTML/CSS/JS simple con campo de texto y respuestas
- **Técnica:** Prompt engineering con contexto del dominio + retrieval de documentos relevantes

---

## Slide para la Presentación

```
FASE 2 — CHATBOT: ASESOR AGRÍCOLA INTELIGENTE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Dominio: Gestión Agrícola Chilena
(cultivos, plagas, riego, normativa laboral, cosecha)

Motivación:
• Experiencia directa del equipo en el sector agrícola
• Chile es el 3er exportador mundial de frutas de contraestación
• Los agricultores necesitan acceso rápido a conocimiento técnico

Fuentes: SAG · INIA · INDAP · CNR · ODEPA

Tecnología: Llama 3 local (Ollama) + RAG con LangChain

10 preguntas de validación definidas:
  cultivos | plagas | riego | normativa | cosecha | clima
```
