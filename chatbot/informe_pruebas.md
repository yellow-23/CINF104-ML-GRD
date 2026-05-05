# Informe de Pruebas – AgroBot
## Chatbot de Gestión Agrícola Chilena
**CINF104 – Aprendizaje de Máquinas – Universidad Andrés Bello 2026**
**Autores:** Cristóbal Flores Villegas · Benjamin Peña Díaz · Matías Muñoz Parraguirre · Francisco Morales Díaz

---

## 1. Descripción del Sistema

AgroBot es un chatbot conversacional que responde preguntas del dominio de la gestión agrícola chilena, utilizando el modelo de lenguaje `llama3.2:3b` ejecutado localmente con Ollama. La técnica principal empleada es **prompt engineering**: un system prompt estructurado inyecta base de conocimiento del dominio en cada conversación, orientando las respuestas del LLM hacia información técnica y regulatoria relevante para Chile.

**Stack tecnológico:**
- LLM: `llama3.2:3b` (Meta) vía Ollama
- Backend: Python 3 + Flask
- Frontend: HTML/CSS/JS (single-page, sin frameworks)
- Técnica: Prompt engineering con historial de conversación

---

## 2. Set de 10 Preguntas de Validación

Las preguntas cubren las áreas temáticas definidas para el dominio: fenología, plagas, riego, normativa laboral, enfermedades, fertilización, heladas, certificación y cosecha.

### Pregunta 1
**¿Cuál es el ciclo fenológico de la uva de mesa y cuándo se recomienda realizar la poda de invierno en la zona central de Chile?**

**Respuesta esperada (referencia):** El ciclo comprende brotación (julio-agosto), floración (sept-oct), envero (nov-dic), cosecha (ene-mar) y reposo invernal (jun-jul). La poda de invierno se realiza en junio-julio, durante el reposo vegetativo completo, cuando se han acumulado las horas frío necesarias.

**Análisis:** El modelo responde correctamente identificando las etapas del ciclo y el período de poda. La información sobre horas frío (>400 horas bajo 7°C) es precisa para variedades tempranas en zona central.

**Calificación:** ✅ Correcta y completa

---

### Pregunta 2
**¿Qué es la mosca de la fruta (Ceratitis capitata) y cuáles son los métodos de control integrado autorizados por el SAG?**

**Respuesta esperada:** Es una plaga cuarentenaria bajo el PNMF del SAG. Métodos: trampeo con Trimedlure, Técnica del Insecto Estéril (TIE), cebo proteico con Spinosad, cobertura de mallas, y como último recurso control químico de cobertura.

**Análisis:** El modelo describe correctamente la plaga y enumera los métodos oficiales del SAG. Menciona apropiadamente la obligación de notificación al SAG en caso de detección positiva.

**Calificación:** ✅ Correcta y completa

---

### Pregunta 3
**¿Cómo calcular el requerimiento hídrico de un huerto de paltos de 10 hectáreas en la región de Valparaíso durante enero?**

**Respuesta esperada:** Usar ETc = ETo × Kc. En Valparaíso, ETo enero ≈ 6-7 mm/día, Kc palto ≈ 0.85-1.0, por tanto ETc ≈ 5.5-6.5 mm/día. Para 10 ha: 550-650 m³/día.

**Análisis:** El modelo aplica correctamente la fórmula ETc = ETo × Kc y entrega valores numéricos razonables para la región. Recomienda goteo como sistema apropiado, lo cual es correcto para paltos adultos.

**Calificación:** ✅ Correcta con valores numéricos útiles

---

### Pregunta 4
**¿Cuáles son los derechos laborales de un trabajador agrícola de temporada según el Código del Trabajo chileno?**

**Respuesta esperada:** Contrato escrito obligatorio, ingreso mínimo proporcional, 1 día de descanso cada 6 días, horas extras al 150%, feriado proporcional (1.25 días/mes), finiquito con ministro de fe, cotizaciones previsionales, fuero maternal.

**Análisis:** El modelo cubre los derechos principales. Incluye artículos relevantes del Código del Trabajo y menciona la Dirección del Trabajo como organismo fiscalizador. Respuesta completa y precisa.

**Calificación:** ✅ Correcta y detallada

---

### Pregunta 5
**¿Qué enfermedades fúngicas afectan al arándano y cómo se previenen con manejo cultural?**

**Respuesta esperada:** Botrytis cinerea (pudrición gris), Monilinia (momificado), Colletotrichum (antracnosis), Phytophthora (raíces). Control cultural: poda para airear, evitar riego nocturno, eliminar restos vegetales.

**Análisis:** El modelo identifica correctamente las principales enfermedades fúngicas del arándano, con sus nombres científicos y síntomas. Las medidas culturales descritas son adecuadas y coinciden con recomendaciones del INIA.

**Calificación:** ✅ Correcta y técnicamente precisa

---

### Pregunta 6
**¿Cuál es la diferencia entre riego por goteo y microaspersión y en qué tipo de cultivos conviene usar cada uno?**

**Respuesta esperada:** Goteo: alta eficiencia (85-95%), aplica agua en zona radicular, ideal para frutales adultos y hortalizas. Microaspersión: cubre mayor área, útil para árboles jóvenes y protección ante heladas, mayor evaporación.

**Análisis:** El modelo diferencia correctamente ambos sistemas en términos de eficiencia, cobertura y aplicaciones recomendadas. La regla práctica aportada es útil para toma de decisiones.

**Calificación:** ✅ Correcta

---

### Pregunta 7
**¿Qué nutrientes son más críticos para el desarrollo de la cereza en etapa de cuaja y cómo se aplican?**

**Respuesta esperada:** Calcio (Ca) vía foliar para firmeza, Boro (B) en plena flor para cuaja, Potasio (K) vía fertirrigación para tamaño, Zinc (Zn) en brotación. Nitrógeno moderado para evitar caída.

**Análisis:** El modelo entrega información técnica precisa sobre los micronutrientes críticos, incluyendo dosis, momento de aplicación y forma de administración. Esta es la pregunta de mayor complejidad técnica y el modelo la maneja adecuadamente.

**Calificación:** ✅ Correcta con dosis específicas

---

### Pregunta 8
**¿Cuáles son las medidas de protección contra heladas tardías en un viñedo de la región del Maule?**

**Respuesta esperada:** Activas: torres antihielo, riego por aspersión, calefactores. Pasivas: selección de sitio evitando fondos de cuencas, variedades de brotación tardía, control de malezas bajo hilera, altura de espaldera.

**Análisis:** El modelo cubre tanto métodos activos como pasivos. Incluye correctamente el umbral de daño por estado fenológico de las yemas (-3°C en estado lanoso, -1.5°C en punta verde), dato de alta utilidad práctica.

**Calificación:** ✅ Correcta y completa

---

### Pregunta 9
**¿Qué registros debe llevar un agricultor para obtener la certificación GlobalGAP?**

**Respuesta esperada:** Registros de aplicaciones fitosanitarias, fertilizaciones, riego, análisis de agua y suelo, cosecha, trazabilidad, calibración de equipos, capacitación de trabajadores, gestión de residuos y evaluación de riesgos.

**Análisis:** El modelo enumera los registros obligatorios cubriendo todos los módulos principales de GlobalGAP (CB, FV, IPM). La respuesta es estructurada y útil como guía práctica para el agricultor.

**Calificación:** ✅ Correcta y completa

---

### Pregunta 10
**¿Cómo se determina el punto óptimo de cosecha del kiwi y qué índices se usan para medirlo?**

**Respuesta esperada:** Índices: °Brix mínimo 6.2-6.5 (refractómetro), firmeza >7-8 kg/cm² (penetrómetro), materia seca ≥15-16% (más confiable), días desde plena flor (~155-165 días para Hayward).

**Análisis:** El modelo describe correctamente el procedimiento de muestreo (30 frutos de distintas partes del huerto) y los umbrales mínimos de cada índice. La mención de la materia seca como indicador más confiable es técnicamente correcta.

**Calificación:** ✅ Correcta con procedimiento de muestreo

---

## 3. Resumen de Resultados

| # | Área | Calificación |
|---|---|---|
| 1 | Fenología uva de mesa – poda de invierno | ✅ Correcta y completa |
| 2 | Mosca de la fruta – control SAG | ✅ Correcta y completa |
| 3 | Requerimiento hídrico paltos Valparaíso | ✅ Correcta con valores numéricos |
| 4 | Derechos trabajador agrícola temporada | ✅ Correcta y detallada |
| 5 | Enfermedades fúngicas arándano | ✅ Correcta y técnica |
| 6 | Goteo vs microaspersión | ✅ Correcta |
| 7 | Nutrientes cereza en cuaja | ✅ Correcta con dosis |
| 8 | Protección heladas viñedo Maule | ✅ Correcta y completa |
| 9 | Registros GlobalGAP | ✅ Correcta y completa |
| 10 | Punto óptimo cosecha kiwi | ✅ Correcta con procedimiento |

**Tasa de respuestas correctas: 10/10 para preguntas dentro del dominio definido.**

---

## 4. Limitaciones del Sistema

### 4.1 Limitaciones del Modelo (llama3.2:3b)

**Conocimiento desactualizado:** El modelo tiene una fecha de corte de conocimiento (septiembre 2024). Datos normativos como el ingreso mínimo mensual vigente, los plaguicidas registrados en el SAG, o las estadísticas de ODEPA pueden estar desactualizados. El system prompt mitiga esto para los datos cuantificados que se incluyeron explícitamente, pero no cubre actualizaciones posteriores.

**Alucinaciones fuera del dominio:** Cuando se formulan preguntas fuera del dominio agrícola chileno o muy específicas (por ejemplo, el nombre de un proveedor de agroquímicos local), el modelo puede generar información plausible pero incorrecta. El system prompt instruye al modelo a indicar incertidumbre, pero esto no está garantizado al 100%.

**Modelo pequeño (3B parámetros):** Al ser un modelo compacto, puede fallar en preguntas que requieran razonamiento matemático complejo, síntesis de múltiples fuentes o seguimiento de instrucciones muy largas. Modelos más grandes (8B, 70B) tienen mejor desempeño en estas tareas.

**Sin memoria persistente:** El historial de conversación se mantiene solo en la sesión actual del navegador. Si el usuario recarga la página o abre una nueva sesión, el contexto se pierde.

### 4.2 Limitaciones de la Arquitectura

**Sin RAG (Retrieval-Augmented Generation):** El sistema usa exclusivamente prompt engineering con conocimiento curado manualmente. No indexa ni consulta documentos externos en tiempo real (como PDFs del SAG o INIA). Esto limita la actualización del conocimiento sin modificar el código.

**Conocimiento fijo:** La base de conocimiento del system prompt cubre los cultivos y temas principales, pero no puede responder preguntas sobre cultivos no incluidos (por ejemplo, arándano blueberry vs lowbush, espárragos, cebollas) sin expandir el prompt.

**Sin validación de seguridad:** El sistema no filtra ni valida las entradas del usuario antes de enviarlas al modelo. En un entorno productivo se requeriría sanitización de entradas.

**Sin autenticación:** La API Flask es abierta en la red local. No está diseñado para exposición a internet.

---

## 5. Propuestas de Mejora

### 5.1 Mejoras a corto plazo

**RAG con documentos oficiales:** Implementar Retrieval-Augmented Generation usando LangChain + ChromaDB para indexar PDFs del SAG (registros de plaguicidas), INIA (manuales técnicos por cultivo), INDAP y CNR. Esto permitiría al chatbot responder con información actualizada directamente de fuentes oficiales, citando el documento y página de origen.

**Actualización periódica del prompt:** Establecer un proceso semestral de revisión del system prompt incorporando cambios normativos (nuevo ingreso mínimo, nuevos plaguicidas autorizados, nuevas regulaciones laborales).

**Modelos más grandes con Ollama:** Usar `llama3.1:8b` en equipos con 16 GB RAM para mejor calidad de razonamiento y menor tasa de alucinaciones, manteniendo la misma arquitectura de backend.

### 5.2 Mejoras a mediano plazo

**Interfaz con historial persistente:** Guardar el historial de conversaciones en una base de datos local (SQLite) para que el usuario pueda retomar conversaciones anteriores.

**Multimodal:** Permitir al usuario subir fotografías de plantas enfermas o de insectos para diagnóstico visual, usando un modelo multimodal como LLaVA.

**Integración con APIs gubernamentales:** Conectar con la API de datos abiertos de ODEPA para precios de mercado en tiempo real, o con el sistema de alertas fitosanitarias del SAG.

**Evaluación automática:** Implementar un pipeline de evaluación con un conjunto de preguntas y respuestas de referencia (gold standard), para medir automáticamente la calidad del sistema al cambiar el modelo o el prompt.

### 5.3 Mejoras a largo plazo

**Fine-tuning del modelo:** Entrenar un modelo especializado en agricultura chilena usando datos del SAG, INIA e historial de consultas reales del chatbot. Esto mejoraría significativamente la precisión en terminología técnica chilena.

**Despliegue multi-usuario:** Adaptar el sistema para uso simultáneo de múltiples usuarios (por ejemplo, en una intranet de un SAG regional o cooperativa agrícola), con autenticación y control de acceso.

---

## 6. Conclusión

AgroBot demuestra que el prompt engineering aplicado a un LLM local de tamaño reducido (3B parámetros) es una estrategia efectiva para construir asistentes especializados en dominios acotados. Las 10 preguntas de validación fueron respondidas correctamente, evidenciando que la técnica funciona cuando el dominio está bien cubierto en la base de conocimiento. Las principales limitaciones son la cobertura fija del dominio y la ausencia de acceso a fuentes de datos dinámicas, ambas abordables con una arquitectura RAG en una versión futura del sistema.
