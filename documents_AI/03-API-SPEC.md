# Especificación de API REST

**Proyecto:** Harry Potter - The Sorting Hat Experience  
**Base URL:** `/api` (ej: `http://localhost:8080/api`)

---

## 1. Endpoints

### 1.1 Casas (Houses)

#### GET /houses
Lista todas las casas de Hogwarts.

**Response 200:**
```json
[
  {
    "id": 1,
    "name": "Gryffindor",
    "colorPrimary": "#c41e3a",
    "colorSecondary": "#ffd700",
    "description": "Valentía, osadía y caballerosidad"
  }
]
```

---

### 1.2 Estudiantes (Students)

#### POST /students
Crea un nuevo estudiante (antes del test).

**Request:**
```json
{
  "name": "Harry Potter"
}
```

**Response 201:**
```json
{
  "id": 1,
  "name": "Harry Potter",
  "houseId": null,
  "houseName": null,
  "wandId": null,
  "createdAt": "2025-02-23T10:00:00"
}
```

#### GET /students/{id}
Obtiene un estudiante por ID.

**Response 200:**
```json
{
  "id": 1,
  "name": "Harry Potter",
  "houseId": 1,
  "houseName": "Gryffindor",
  "wandId": 2,
  "wandDescription": "Varita de Tejo, núcleo de Pluma de Fénix",
  "createdAt": "2025-02-23T10:00:00"
}
```

#### PATCH /students/{id}/wand
Asigna una varita al estudiante.

**Request:**
```json
{
  "wandId": 2
}
```

**Response 200:**
```json
{
  "id": 1,
  "name": "Harry Potter",
  "houseId": 1,
  "wandId": 2,
  "updatedAt": "2025-02-23T10:30:00"
}
```

---

### 1.3 Sorting (Sombrero Seleccionador)

#### POST /sorting/complete
Completa el test y asigna la casa al estudiante.

**Request:**
```json
{
  "studentId": 1,
  "scores": {
    "gryffindor": 12,
    "hufflepuff": 5,
    "ravenclaw": 8,
    "slytherin": 15
  }
}
```

**Alternativa (por array de respuestas):**
```json
{
  "studentId": 1,
  "answers": [1, 3, 2, 4, 1, 2, 3, 4, 1, 2]
}
```
*El backend calcula los scores según el JSON de preguntas.*

**Response 200:**
```json
{
  "studentId": 1,
  "houseId": 4,
  "houseName": "Slytherin",
  "message": "¡El Sombrero te ha asignado a Slytherin!"
}
```

---

### 1.4 Varitas (Wands)

#### GET /wands
Lista todas las varitas (opcional, para admin).

#### GET /wands/compatible/{houseId}
Lista varitas compatibles con una casa.

**Response 200:**
```json
[
  {
    "id": 2,
    "woodType": "Tejo",
    "coreType": "Pluma de Fénix",
    "compatibleHouseId": 4,
    "compatibleHouseName": "Slytherin",
    "description": "Una varita de tejo con núcleo de pluma de fénix. La varita elige al mago."
  }
]
```

---

## 2. Códigos de Error

| Código | Descripción |
|--------|-------------|
| 400 | Bad Request - Datos inválidos |
| 404 | Not Found - Recurso no encontrado |
| 409 | Conflict - Ej: estudiante ya tiene casa asignada |
| 500 | Internal Server Error |

**Formato de error:**
```json
{
  "timestamp": "2025-02-23T10:00:00",
  "status": 404,
  "error": "Not Found",
  "message": "Estudiante con id 999 no encontrado",
  "path": "/api/students/999"
}
```

---

## 3. Configuración CORS

Permitir origen del frontend en desarrollo:
```
http://localhost:5173
```

---

## 4. Flujo de Llamadas (Frontend)

```
1. Usuario ingresa nombre
   → POST /students { name }

2. Usuario completa cuestionario
   → POST /sorting/complete { studentId, scores }

3. Usuario ve carta, hace clic en "Ir al Callejón Diagon"
   → GET /students/{id} (verificar houseId)
   → GET /wands/compatible/{houseId}

4. Usuario elige varita
   → PATCH /students/{id}/wand { wandId }
```
