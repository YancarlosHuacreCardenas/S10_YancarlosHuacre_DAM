# S10_YancarlosHuacre_DAM

## 📱 Desarrollo de Aplicaciones Móviles • S10 | AP5
### Actividad Individual — Formularios y Validaciones

---

## 📌 Datos de la Actividad
- **Estudiante:** Yancarlos Huacre Cárdenas
- **Entorno:** React Native + Expo (Expo Router)
- **Opción Seleccionada:** **Opción 5 — Registro de Curso**
- **Modalidad:** Individual

---

## 🎯 Objetivo de la Actividad
Diseñar e implementar un formulario móvil interactivo aplicando manejo de estados (`useState`), captura de datos (`onChangeText`, `TextInput`), botones de acción con `Pressable` y validaciones en tiempo real con retroalimentación clara de error y éxito.

---

## 📋 Opción 5: Registro de Curso

### 1. Campos Implementados:
1. **Nombre del Estudiante** (`TextInput`): Nombre completo del alumno.
2. **Correo Electrónico** (`TextInput` tipo `email-address`): Dirección de correo del estudiante.
3. **Curso a Matricular** (`TextInput` + selector rápido): Materia o curso académico seleccionado.
4. **Edad del Estudiante** (`TextInput` tipo `numeric`): Edad numérica del estudiante.

### 2. Reglas de Validación Aplicadas:
- ✅ **Nombre obligatorio:** No vacío y longitud mínima de 3 caracteres.
- ✅ **Correo electrónico válido:** Debe contener `@` y estructura de correo válida.
- ✅ **Curso requerido:** Debe contener el nombre del curso (mínimo 3 caracteres).
- ✅ **Edad válida:** Valor numérico entre 16 y 99 años.

### 3. Retroalimentación (Feedback UI):
- ⚠️ **Mensajes de Error:** Alerta destacada en rojo ante datos incompletos o inválidos.
- 🟢 **Mensaje de Éxito:** Tarjeta verde de confirmación con el resumen de la matrícula realizada.
- 📊 **Panel de Validaciones en Vivo:** Contador dinámico (`X/4`) y estado de cada regla (Válido / Pendiente).
- 🧹 **Acción de Limpieza:** Botón para reiniciar el formulario.

---

## 🖼️ Evidencias de la Actividad (Entregables)

| Entregable | Descripción | Estado |
| :--- | :--- | :--- |
| **Captura 1 — Formulario** | Pantalla principal con el formulario limpio y preparado | Listo para captura |
| **Captura 2 — Validación** | Formulario con datos incorrectos y mensajes de error | Listo para captura |
| **Captura 3 — Resultado Exitoso** | Formulario con datos válidos y confirmación de éxito | Listo para captura |

---

## 🚀 Instrucciones para Ejecutar el Proyecto

1. **Ingresar a la carpeta de la aplicación:**
   ```bash
   cd FormularioApp
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor Expo:**
   ```bash
   npx expo start
   ```

4. **Probar en dispositivo:**
   - Escanear el código QR con la app **Expo Go** (Android / iOS) o presionar `w` para abrir en Web / `a` para emulador Android.

---

## 📂 Estructura del Proyecto

```text
S10_YancarlosHuacre_DAM/
├── README.md
└── FormularioApp/
    ├── package.json
    ├── app.json
    ├── tsconfig.json
    └── src/
        ├── app/
        │   ├── _layout.tsx      # Configuración de navegación Stack
        │   └── index.tsx        # Pantalla principal del Formulario de Registro de Curso
        ├── components/
        │   └── common/
        │       ├── app-button.tsx  # Componente Pressable estilizado
        │       └── app-input.tsx   # Componente TextInput con label y diseño
        ├── constants/
        │   ├── colors.ts       # Paleta de colores
        │   └── theme.ts        # Espaciados, radios y tipografía
        └── utils/
            └── validators.ts   # Lógica de validación pura
```