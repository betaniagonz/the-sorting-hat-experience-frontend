# Lógica de Varitas - Ollivander's Store

**Proyecto:** Harry Potter - The Sorting Hat Experience

---

## 1. Compatibilidad por Casa

| Casa | Madera | Núcleo | Notas |
|------|--------|--------|-------|
| **Gryffindor** | Roble | Nervio de Dragón | Varitas de coraje |
| **Hufflepuff** | Fresno, Avellano | Fibra de Corazón de Dragón | Varitas leales |
| **Ravenclaw** | Ébano | Pelo de Unicornio | Varitas de sabiduría |
| **Slytherin** | Tejo | Pluma de Fénix | Varitas ambiciosas |

---

## 2. Implementación Backend

### 2.1 Filtrado de Varitas Compatibles

```java
// WandRepository.java
@Query("SELECT w FROM Wand w WHERE w.compatibleHouse.id = :houseId")
List<Wand> findByCompatibleHouseId(@Param("houseId") Long houseId);
```

### 2.2 Servicio

```java
public List<WandDTO> getCompatibleWands(Long houseId) {
    return wandRepository.findByCompatibleHouseId(houseId)
        .stream()
        .map(this::toDTO)
        .collect(Collectors.toList());
}
```

---

## 3. Implementación Frontend

### 3.1 Bloqueo de Ollivander's

```javascript
// Solo mostrar/store accesible si student.houseId !== null
const canAccessOllivanders = () => createMemo(() => 
  studentStore.houseId() !== null
);
```

### 3.2 "La Varita te Elige"

Opción aleatoria entre las varitas compatibles:

```javascript
function selectRandomWand(wands) {
  const index = Math.floor(Math.random() * wands.length);
  return wands[index];
}
```

### 3.3 Elección Manual

El usuario ve la lista de varitas compatibles y hace clic en una para seleccionarla.

---

## 4. Datos de Seed (Varitas)

```sql
-- Gryffindor
INSERT INTO WAND (wood_type, core_type, compatible_house_id, description) 
VALUES ('Roble', 'Nervio de Dragón', 1, 'Varita de roble, ideal para magos valientes.');

-- Hufflepuff
INSERT INTO WAND (wood_type, core_type, compatible_house_id, description) 
VALUES ('Fresno', 'Fibra de Corazón de Dragón', 2, 'Varita de fresno, leal a su dueño.');
INSERT INTO WAND (wood_type, core_type, compatible_house_id, description) 
VALUES ('Avellano', 'Fibra de Corazón de Dragón', 2, 'Varita de avellano, pacífica y constante.');

-- Ravenclaw
INSERT INTO WAND (wood_type, core_type, compatible_house_id, description) 
VALUES ('Ébano', 'Pelo de Unicornio', 3, 'Varita de ébano, para mentes brillantes.');

-- Slytherin
INSERT INTO WAND (wood_type, core_type, compatible_house_id, description) 
VALUES ('Tejo', 'Pluma de Fénix', 4, 'La varita de tejo elige a su dueño. Famosamente conocida.');
```

---

## 5. Flujo de Usuario

1. Usuario tiene casa asignada → Ollivander's se desbloquea
2. GET /wands/compatible/{houseId} → Lista de varitas
3. Usuario elige (manual o aleatorio)
4. PATCH /students/{id}/wand { wandId }
5. Confirmación visual + mensaje "La varita te ha elegido"
