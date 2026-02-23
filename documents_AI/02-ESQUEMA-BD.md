# Esquema de Base de Datos - Oracle DB

**Proyecto:** Harry Potter - The Sorting Hat Experience

---

## 1. Diagrama Entidad-Relación

```
┌─────────────────────┐       ┌─────────────────────┐
│      STUDENT        │       │        WAND         │
├─────────────────────┤       ├─────────────────────┤
│ id (PK)             │       │ id (PK)             │
│ name                │   ┌───│ wood_type           │
│ house_id (FK)       │───┘   │ core_type           │
│ wand_id (FK)        │───────│ compatible_house    │
│ created_at          │       │ description         │
└─────────────────────┘       └─────────────────────┘
         │
         │
┌────────┴────────┐
│      HOUSE      │
├─────────────────┤
│ id (PK)         │
│ name            │
│ color_primary   │
│ color_secondary │
└─────────────────┘
```

---

## 2. Tablas Detalladas

### 2.1 HOUSE (Casas de Hogwarts)

| Columna | Tipo | Restricciones | Descripción |
|---------|------|---------------|-------------|
| id | NUMBER | PK, AUTO | Identificador |
| name | VARCHAR2(50) | NOT NULL, UNIQUE | Gryffindor, Hufflepuff, Ravenclaw, Slytherin |
| color_primary | VARCHAR2(20) | | Color principal (#c41e3a, etc.) |
| color_secondary | VARCHAR2(20) | | Color secundario |
| description | VARCHAR2(500) | | Descripción de la casa |

**Datos iniciales (seed):**
- Gryffindor, Hufflepuff, Ravenclaw, Slytherin

---

### 2.2 STUDENT (Estudiantes)

| Columna | Tipo | Restricciones | Descripción |
|---------|------|---------------|-------------|
| id | NUMBER | PK, AUTO | Identificador |
| name | VARCHAR2(100) | NOT NULL | Nombre del estudiante |
| house_id | NUMBER | FK → HOUSE.id, NULL | Casa asignada (NULL hasta completar test) |
| wand_id | NUMBER | FK → WAND.id, NULL | Varita elegida (NULL hasta visitar Ollivander's) |
| created_at | TIMESTAMP | DEFAULT SYSTIMESTAMP | Fecha de registro |
| updated_at | TIMESTAMP | | Última actualización |

---

### 2.3 WAND (Varitas)

| Columna | Tipo | Restricciones | Descripción |
|---------|------|---------------|-------------|
| id | NUMBER | PK, AUTO | Identificador |
| wood_type | VARCHAR2(50) | NOT NULL | Roble, Tejo, Ébano, Fresno, etc. |
| core_type | VARCHAR2(100) | NOT NULL | Nervio de Dragón, Pluma de Fénix, etc. |
| compatible_house_id | NUMBER | FK → HOUSE.id | Casa con la que es compatible |
| description | VARCHAR2(500) | | Descripción de la varita |
| length_inches | NUMBER(4,2) | | Longitud en pulgadas (opcional) |

---

## 3. Entidades JPA (Java)

### 3.1 House.java

```java
@Entity
@Table(name = "HOUSE")
public class House {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "house_seq")
    @SequenceGenerator(name = "house_seq", sequenceName = "HOUSE_SEQ", allocationSize = 1)
    private Long id;
    
    @Column(nullable = false, unique = true, length = 50)
    private String name;
    
    private String colorPrimary;
    private String colorSecondary;
    private String description;
    
    // Getters, setters, relaciones
}
```

### 3.2 Student.java

```java
@Entity
@Table(name = "STUDENT")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "student_seq")
    @SequenceGenerator(name = "student_seq", sequenceName = "STUDENT_SEQ", allocationSize = 1)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String name;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "house_id")
    private House house;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "wand_id")
    private Wand wand;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
```

### 3.3 Wand.java

```java
@Entity
@Table(name = "WAND")
public class Wand {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "wand_seq")
    @SequenceGenerator(name = "wand_seq", sequenceName = "WAND_SEQ", allocationSize = 1)
    private Long id;
    
    @Column(name = "wood_type", nullable = false, length = 50)
    private String woodType;
    
    @Column(name = "core_type", nullable = false, length = 100)
    private String coreType;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "compatible_house_id")
    private House compatibleHouse;
    
    private String description;
    
    @Column(name = "length_inches", precision = 4, scale = 2)
    private BigDecimal lengthInches;
}
```

---

## 4. Scripts SQL (Oracle)

### 4.1 Creación de Secuencias

```sql
CREATE SEQUENCE HOUSE_SEQ START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE STUDENT_SEQ START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE WAND_SEQ START WITH 1 INCREMENT BY 1;
```

### 4.2 Configuración JPA

Con `spring.jpa.hibernate.ddl-auto=update` o `create`, Hibernate puede generar las tablas. Para producción, usar scripts Flyway/Liquibase.

---

## 5. Datos de Varitas Compatibles (Seed)

| Madera | Núcleo | Casa |
|--------|--------|------|
| Roble | Nervio de Dragón | Gryffindor |
| Tejo | Pluma de Fénix | Slytherin |
| Ébano | Pelo de Unicornio | Ravenclaw |
| Fresno | Fibra de Corazón de Dragón | Hufflepuff |
| Avellano | Fibra de Corazón de Dragón | Hufflepuff |

*Nota: Se pueden añadir más varitas por casa para variedad.*
