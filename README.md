# 🛠️ Laboratorio de Auditoría: Rompe tu App (React Edition)

Este repositorio contiene una guía paso a paso para evaluar la robustez y resiliencia de un componente en React. Un código robusto no es el que no falla, sino el que sabe **cómo fallar con gracia** sin arruinar la experiencia del usuario.

La auditoría se realiza bajo un enfoque dual: **Inspección de Interfaz (UI)** y **Análisis del Código Fuente**.

---

## 📋 Checklist de Ataque (Evaluación de Robustez)

Ejecuta estas pruebas sobre la aplicación frágil. Utiliza la siguiente tabla para marcar el estado (`[ ] Sí`, `[ ] No`, `[ ] Parcial`) a medida que descubras las fallas.

| # | Punto de Ataque | Estado Actual | ¿Cómo comprobarlo en UI? | ¿Qué buscar en el Código? |
| :-: | :--- | :---: | :--- | :--- |
| **1** | ¿Maneja estado `loading`? | **Parcial** | Recarga la app con red lenta (*Slow 3G*). ¿Aparece un spinner/esqueleto o la pantalla se queda congelada estáticamente? | Busca un `useState(true)` que pase a `false` inmediatamente después de resolver la promesa del `fetch`/`axios`. |
| **2** | ¿Maneja estado `error`? | **Parcial** | Apaga el servidor backend o altera la URL de la API. ¿La app muestra un mensaje de error o se queda la pantalla en blanco (*crash*)? | Verifica si la petición asíncrona cuenta con un bloque `.catch()` o está envuelta en una estructura `try/catch`. |
| **3** | ¿Maneja estado `empty` (sin datos)? | **Parcial** | Introduce un término en la barra de búsqueda que sepas que no existe. ¿Aparece un texto como *"No se encontraron productos"* o queda un vacío gris? | Revisa si hay un condicional implícito del tipo `if (products.length === 0)` antes del renderizado de la lista. |
| **4** | ¿Imágenes sin fallback? | **Sí (Frágil)** | Observa la UI actual: las imágenes rotas muestran un recuadro vacío o el texto del atributo `alt`. | Busca la etiqueta `<img>`. Verifica si implementa el evento `onError` para cargar una imagen por defecto (`placeholder.png`). |
| **5** | ¿El formulario valida antes de enviar? | **Parcial** | Escribe un string cualquiera sin el carácter `@` en el campo de email y presiona Enter/Submit. ¿El formulario procesa la petición? | Comprueba si el input tiene el atributo `type="email"` o si la función `handleSubmit` valida la estructura mediante una Expresión Regular. |
| **6** | ¿`LocalStorage` protegido contra JSON corrupto? | **Parcial** | Abre DevTools -> *Application* -> *Local Storage*. Altera manualmente el JSON guardado rompiendo su estructura y recarga la página. | Busca líneas con `JSON.parse(localStorage.getItem(...))`. Si no tienen un `try/catch` alrededor, la app entera morirá. |
| **7** | ¿El botón previene el doble click / clicks inválidos? | **Parcial** | Deja el formulario vacío e intenta hacer click repetidamente en el botón de suscripción. ¿Ejecuta alguna acción o parpadea? | Verifica si el botón recibe el atributo HTML `disabled={!isValid || isSubmitting}` o si maneja un *debounce* del lado del cliente. |

---

## 🚨 Los 3 Puntos Más Críticos a Priorizar

Si vas a empezar a refactorizar, concentra tus esfuerzos en resolver estos tres fallos en orden de impacto catastrófico:

### 1. 🛑 Punto 6: `LocalStorage` sin protección (Prioridad Máxima)
* **El riesgo:** Si el estado guardado en el navegador se corrompe o se modifica de forma maliciosa/accidental, el método `JSON.parse` lanzará un error fatal que React no podrá capturar por sí solo. 
* **El resultado:** Una **pantalla en blanco persistente** para el usuario que la recargue, obligándolo a borrar manualmente los datos del navegador (algo que un usuario común no sabe hacer).

### 2. 🛑 Punto 2: Falta de manejo de errores en peticiones de API
* **El riesgo:** Depender de que el backend esté en línea el 100% del tiempo es una utopía. Si el servicio cae o sufre un *timeout*, las promesas de JavaScript se quedan colgadas en estado *Rejected*.
* **El resultado:** La interfaz muta a un estado zombi (spinners infinitos o interfaces vacías congeladas) sin ofrecerle al usuario un botón de "Reintentar" o una explicación clara.

### 3. 🛑 Punto 4: Imágenes sin fallback visual
* **El riesgo:** Las URLs de imágenes externas suelen romperse con facilidad debido a caídas de servidores proxy, cambios de nombres en bases de datos o problemas de CORS.
* **El resultado:** El diseño estético de la tienda se rompe de inmediato en la primera carga, transmitiendo una sensación de abandono del producto y reduciendo la confianza del cliente.

---

## 🎯 Instrucciones del Ejercicio

1. **Fase de Diagnóstico:** Ejecuta las pruebas en tu navegador usando las *Developer Tools* (F12).
2. **Documentación:** Completa el checklist de este documento modificando los estados de la tabla anterior.
3. **Refactorización Seguro:** Abre el editor de código, crea una rama alternativa (`git checkout -b fix/robustez`) y soluciona primero los 3 puntos más críticos **sin alterar** la lógica de negocio principal del componente.


---

## 👤 Información del Auditor

* **Nombre del Auditor:** Xamuel Romero
* **Rol:** Programador / Analista de Robustez QA
* **Fecha de Evaluación:** Junio 2026

---

## 🎯 Paso a Paso para Completar la Auditoría (Casillas de Verificación)

Sigue este orden metodológico para evaluar y corregir el componente. Puedes marcar cada tarea cambiando el espacio `[ ]` por una `[x]` directamente en este archivo:

### 🔍 Fase 1: Diagnóstico en la Interfaz (UI)
- [x] **Paso 1.1:** Abrir las Herramientas de Desarrollador (F12) en el navegador y posicionarse en la pestaña *Network*.
- [x] **Paso 1.2:** Activar el perfil **Slow 3G** y recargar la página para evaluar si existe una interfaz visual de carga (Estado `loading`).
- [x] **Paso 1.3:** Forzar una búsqueda con caracteres inexistentes (ej: `asdfghjk123`) para verificar si la UI maneja el estado vacío (Estado `empty`).
- [x] **Paso 1.4:** Evaluar visualmente si las imágenes rotas muestran un diseño alternativo o si se ven rotas en la UI (Estado `fallback`).
- [x] **Paso 1.5:** Intentar enviar el formulario de ofertas con un formato de correo inválido (ej: `nombre-sin-arroba`) y con el campo vacío para comprobar la validación nativa.

### 💻 Fase 2: Inspección del Código Fuente
- [ ] **Paso 2.1:** Localizar el archivo del componente principal en el editor (ej: `src/App.jsx` o similar).
- [ ] **Paso 2.2:** Buscar todas las instancias de `fetch` o `axios` y confirmar si contienen un bloque `.catch()` o una estructura `try/catch` para interceptar caídas del servidor.
- [ ] **Paso 2.3:** Rastrear el uso de `localStorage.getItem` y verificar si la conversión con `JSON.parse()` está blindada contra datos corruptos.
- [ ] **Paso 2.4:** Inspeccionar si los botones de acción (`<button>`) cuentan con la propiedad `disabled` vinculada al estado de validación del formulario.

### 🛠️ Fase 3: Mitigación y Cierre
- [ ] **Paso 3.1:** Crear una rama limpia en Git para implementar las soluciones (`git checkout -b fix/robustez-samuel`).
- [ ] **Paso 3.2:** Resolver el riesgo crítico de `LocalStorage` implementando un bloque `try/catch` de contingencia.
- [ ] **Paso 3.3:** Añadir el manejador `onError` a las etiquetas de imágenes para asegurar un renderizado limpio.
- [ ] **Paso 3.4:** Completar el checklist de la sección anterior indicando las conclusiones finales de la auditoría.
