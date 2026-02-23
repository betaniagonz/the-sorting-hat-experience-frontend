# Guía de Identidad Visual - Estilo Mapa del Merodeador

**Proyecto:** Harry Potter - The Sorting Hat Experience

---

## 1. Paleta de Colores

| Uso | Color | Hex | Uso en CSS |
|-----|-------|-----|------------|
| Fondo pergamino | Parchment | `#f4e4bc` | `bg-[#f4e4bc]` |
| Texto principal | Sepia oscuro | `#5c4a3a` | `text-[#5c4a3a]` |
| Texto secundario | Sepia desgastada | `#8b7355` | `text-[#8b7355]` |
| Tinta negra | Negro desgastado | `#2c1810` | `text-[#2c1810]` |
| Bordes/lineas | Sepia medio | `#a08060` | `border-[#a08060]` |
| Sello cera Gryffindor | Rojo granate | `#8b0000` | - |
| Sello cera Slytherin | Verde esmeralda | `#2d5016` | - |
| Sello cera Ravenclaw | Azul bronce | `#5c4033` | - |
| Sello cera Hufflepuff | Amarillo miel | `#b8860b` | - |

---

## 2. Tipografía (Google Fonts)

```html
<link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600;700&family=Henny+Penny&display=swap" rel="stylesheet">
```

| Elemento | Fuente | Peso | Uso |
|----------|--------|------|-----|
| Títulos principales | Henny Penny | 400 | Headers, nombres de casas |
| Texto caligráfico | Dancing Script | 400, 600 | Carta, botones, etiquetas |
| Cuerpo legible | System / Georgia | - | Párrafos largos (accesibilidad) |

**Tailwind config:**
```js
fontFamily: {
  'henny': ['Henny Penny', 'cursive'],
  'dancing': ['Dancing Script', 'cursive'],
}
```

---

## 3. Componentes UI

### 3.1 Botones - Estilo Sello de Cera

- Bordes redondeados tipo sello
- Sombra suave que simule relieve
- Hover: ligera elevación
- Colores según contexto (neutral sepia por defecto)

```css
.btn-seal {
  @apply rounded-lg px-6 py-3 font-dancing font-semibold;
  background: linear-gradient(145deg, #d4a574, #c4956a);
  border: 2px solid #8b7355;
  box-shadow: 2px 2px 4px rgba(92, 74, 58, 0.3);
}
```

### 3.2 Bordes Dibujados a Mano

- `border-image` o SVG como borde
- Alternativa: `filter` con ruido para textura
- Líneas ligeramente irregulares (no perfectamente rectas)

### 3.3 Animación "Tinta Extendiéndose"

- Transición de `opacity` + `transform: scale()` al revelar contenido
- Efecto de "mancha de tinta" con `border-radius` animado
- Duración: 0.5s - 1s con `ease-out`

---

## 4. Estructura de Páginas

### Landing
- Fondo pergamino con textura sutil
- Título: "Harry Potter: The Sorting Hat Experience"
- Input de nombre con estilo etiqueta de papel
- Botón "Empezar el Test"

### Test del Sombrero
- Una pregunta a la vez
- Opciones como etiquetas/botones
- Barra de progreso sutil
- Transición suave entre preguntas

### Carta de Aceptación (Modal)
- Diseño de sobre que se "abre"
- Contenido en papel con bordes irregulares
- Texto centrado, fuente Dancing Script
- Botón "Ir al Callejón Diagon"

### Ollivander's Store
- Grid de varitas compatibles
- Cada varita: madera + núcleo + descripción
- Botón "Elegir esta varita" / "Dejar que la varita me elija"

---

## 5. Accesibilidad

- Contraste mínimo WCAG AA para texto
- Fuentes de cuerpo con tamaño legible (min 16px)
- Alternar Dancing Script con fuentes más legibles en textos largos
- Focus visible en elementos interactivos
