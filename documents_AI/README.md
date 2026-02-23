# Documentación AI - Harry Potter: The Sorting Hat Experience

Índice de documentos de planificación y especificación del proyecto.

---

## Documentos

| # | Documento | Descripción |
|---|-----------|-------------|
| 01 | [Plan de Desarrollo](01-PLAN-DESARROLLO.md) | Resumen ejecutivo, arquitectura, fases y cronograma |
| 02 | [Esquema de Base de Datos](02-ESQUEMA-BD.md) | Entidades, tablas Oracle, modelos JPA |
| 03 | [Especificación API](03-API-SPEC.md) | Endpoints REST, request/response, flujo de llamadas |
| 04 | [Preguntas Sorting](04-PREGUNTAS-SORTING.json) | JSON del cuestionario del Sombrero Seleccionador |
| 05 | [Guía Visual UI](05-GUIA-VISUAL-UI.md) | Paleta, tipografía, componentes estilo Mapa del Merodeador |
| 06 | [Lógica de Varitas](06-LOGICA-VARITAS.md) | Compatibilidad por casa, implementación Ollivander's |
| - | [Prompts Cronológico](PROMPTS-CHRONOLOGICO.md) | Registro de prompts en orden cronológico |

---

## Stack

- **Frontend:** SolidJS, Tailwind CSS, Signals
- **Backend:** Java 17+, Spring Boot
- **Base de Datos:** Oracle DB (JPA/Hibernate)

---

## Inicio Rápido

1. Revisar `01-PLAN-DESARROLLO.md` para el overview
2. Configurar BD según `02-ESQUEMA-BD.md`
3. Implementar API según `03-API-SPEC.md`
4. Usar `04-PREGUNTAS-SORTING.json` en el frontend
5. Aplicar estilos de `05-GUIA-VISUAL-UI.md`
6. Implementar Ollivander's según `06-LOGICA-VARITAS.md`
