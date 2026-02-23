# Plan de Desarrollo: Harry Potter - The Sorting Hat Experience

**Versión:** 1.0  
**Fecha:** 23 de Febrero, 2025  
**Stack:** SolidJS + Tailwind | Java 17+ Spring Boot | Oracle DB

---

## 1. Resumen Ejecutivo

Minijuego web interactivo que recrea la experiencia del Sombrero Seleccionador de Hogwarts. Los usuarios completan un cuestionario dinámico, reciben su asignación de casa, una carta de aceptación animada y pueden visitar la tienda de Ollivander para obtener su varita.

---

## 2. Arquitectura General

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (SolidJS)                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │ Test        │  │ Carta      │  │ Ollivander's Store      │  │
│  │ Sombrero    │  │ Aceptación │  │ (Varitas compatibles)   │  │
│  └──────┬──────┘  └──────┬──────┘  └───────────┬─────────────┘  │
│         │                │                      │                 │
│         └────────────────┼──────────────────────┘                 │
│                          │ Signals + API Client                   │
└──────────────────────────┼──────────────────────────────────────┘
                           │ REST API (JSON)
┌──────────────────────────┼──────────────────────────────────────┐
│                        BACKEND (Spring Boot)                     │
│  ┌──────────────────────┴──────────────────────────────────────┐ │
│  │ Controllers: /students, /sorting, /wands                     │ │
│  └──────────────────────────┬───────────────────────────────────┘ │
│                             │                                     │
│  ┌──────────────────────────┴───────────────────────────────────┐ │
│  │ Services: StudentService, SortingService, WandService         │ │
│  └──────────────────────────┬───────────────────────────────────┘ │
│                             │                                     │
│  ┌──────────────────────────┴───────────────────────────────────┐ │
│  │ JPA Repositories → Oracle DB                                 │ │
│  └──────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Estructura del Proyecto

### 3.1 Monorepo o Separado

**Recomendación:** Dos proyectos en la misma carpeta raíz para facilitar el desarrollo.

```
hp-game/
├── documents_AI/           # Documentación y planificación
│   ├── 01-PLAN-DESARROLLO.md
│   ├── 02-ESQUEMA-BD.md
│   ├── 03-API-SPEC.md
│   └── 04-PREGUNTAS-SORTING.json
├── frontend/               # SolidJS + Vite + Tailwind
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── stores/
│   │   ├── api/
│   │   └── styles/
│   └── package.json
└── backend/                # Spring Boot
    ├── src/main/java/com/hogwarts/sorting/
    │   ├── controller/
    │   ├── service/
    │   ├── repository/
    │   ├── entity/
    │   └── dto/
    └── pom.xml
```

---

## 4. Base de Datos (Oracle DB)

### 4.1 Entidades Principales

| Entidad | Descripción |
|---------|-------------|
| `Student` | Estudiante con nombre, casa asignada, varita |
| `Wand` | Catálogo de varitas (madera, núcleo, casa compatible) |
| `SortingQuestion` | Preguntas del cuestionario (opcional si se usa JSON estático) |

### 4.2 Esquema Detallado

Ver documento: `02-ESQUEMA-BD.md`

---

## 5. Fases de Desarrollo

### Fase 1: Configuración Inicial (Días 1-2)
- [x] Crear proyecto SolidJS con Vite + Tailwind
- [x] Crear proyecto Spring Boot con dependencias (JPA, Oracle, Web)
- [x] Configurar base de datos (H2 desarrollo / Oracle producción)
- [x] Configurar CORS y proxy para desarrollo local

### Fase 2: Identidad Visual (Días 2-3)
- [x] Paleta: fondo #f4e4bc, texto sepia/negro desgastado
- [x] Fuentes: Dancing Script, Henny Penny (Google Fonts)
- [x] Componentes base: botones estilo sello de cera, bordes dibujados a mano
- [x] Animaciones de tinta extendiéndose (CSS keyframes)

### Fase 3: Test del Sombrero Seleccionador (Días 4-6)
- [x] JSON de preguntas con puntuación por casa
- [x] Componente de cuestionario dinámico (una pregunta a la vez)
- [x] Lógica de puntuación (Gryffindor, Hufflepuff, Ravenclaw, Slytherin)
- [x] API: POST /students (crear), POST /sorting/complete (asignar casa)
- [x] Persistencia en H2 (desarrollo) / Oracle (producción)

### Fase 4: Carta de Aceptación (Días 6-7)
- [x] Modal animado estilo sobre que se despliega
- [x] Contenido personalizado: nombre + casa
- [x] Botón "Ir al Callejón Diagon" (navegación a Ollivander's)

### Fase 5: Ollivander's Store (Días 8-10)
- [x] Bloqueo hasta tener casa asignada
- [x] Lógica de varitas compatibles por casa
- [x] UI de selección de varita (o "la varita te elige")
- [x] API: GET /wands/compatible/{houseId}, PATCH /students/{id}/wand
- [x] Actualización en DB

### Fase 6: Integración y Pulido (Días 10-12)
- [x] Flujo completo end-to-end
- [x] Manejo de errores y estados de carga
- [x] Responsive design
- [x] Testing básico

---

## 6. Especificaciones Técnicas Clave

### 6.1 Lógica del Sombrero
- Cada pregunta tiene 4 opciones, cada una suma puntos a una casa
- Al finalizar: la casa con más puntos gana
- En empate: criterio de desempate (ej: última pregunta con más peso)

### 6.2 Varitas Compatibles por Casa

| Casa | Madera | Núcleo |
|------|--------|--------|
| Gryffindor | Roble | Nervio de Dragón |
| Slytherin | Tejo | Pluma de Fénix |
| Ravenclaw | Ébano | Pelo de Unicornio |
| Hufflepuff | Fresno / Avellano | Fibra de Corazón de Dragón |

### 6.3 Flujo de Usuario
1. Landing → Ingresar nombre
2. Test del Sombrero (cuestionario)
3. Resultado + Carta de Aceptación (modal)
4. "Ir al Callejón Diagon" → Ollivander's (desbloqueado)
5. Elegir varita → Confirmar → Actualizar perfil

---

## 7. Dependencias Principales

### Frontend
- `solid-js`, `solid-router`
- `tailwindcss`
- `@solidjs/router`

### Backend
- `spring-boot-starter-web`
- `spring-boot-starter-data-jpa`
- `ojdbc11` (Oracle JDBC)
- `spring-boot-starter-validation`

---

## 8. Riesgos y Mitigaciones

| Riesgo | Mitigación |
|--------|------------|
| Oracle DB no disponible | Usar H2 en desarrollo, configurar perfil |
| Animaciones complejas | CSS puro primero, librerías si hace falta |
| CORS en desarrollo | Proxy en Vite hacia backend |

---

## 9. Próximos Pasos

1. Crear documentos detallados: `02-ESQUEMA-BD.md`, `03-API-SPEC.md`
2. Crear JSON de preguntas: `04-PREGUNTAS-SORTING.json`
3. Iniciar Fase 1: scaffolding de proyectos
