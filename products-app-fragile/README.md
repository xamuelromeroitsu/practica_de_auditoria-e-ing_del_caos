# products-app-fragile

Este proyecto funciona en el camino feliz.
Tu tarea es romperlo, detectar fallas y proponer mejoras.

No está diseñado como ejemplo perfecto.
Está diseñado para **auditar**.

## 🚀 Cómo Ejecutarlo

```bash
# 1. Instalar dependencias del proyecto
npm install

# 2. Levantar el entorno local en Vite
npm run dev!

```


## 🔍 Qué Observar (Vectores de Falla)

Al interactuar con la aplicación en tu navegador, analiza críticamente los siguientes escenarios:

* **Búsquedas vacías:** ¿Qué pasa si no hay productos que coincidan con los criterios de la búsqueda?
* **Ciclo de vida asíncrono:** ¿Qué pasa en la interfaz mientras los datos cargan? (especialmente durante los primeros 800ms).
* **Inconsistencia multimedia:** ¿Qué pasa con los productos que tienen una imagen vacía o un valor `null`?
* **Validación perimetral:** ¿Qué pasa si escribes mal el email (o lo dejas vacío) y haces clic en *Submit*?
* **Persistencia vulnerable:** ¿Qué pasa si alteras el `LocalStorage` inyectando datos corruptos o texto plano?
* **Arquitectura:** ¿Qué responsabilidades tiene el archivo `App.jsx`? ¿Cumple con el principio de responsabilidad única?

---

## ⚠️ Fallas Intencionales Marcadas en el Código

El código fuente contiene comentarios explícitos anotados como `// ❌ FRAGILE:` que señalan exactamente los puntos críticos del sistema. Tu objetivo es encontrarlos, deducir por qué representan un riesgo técnico en entornos de producción y proponer soluciones defensivas.

---

## 📊 Siguiente Paso: Reporte de Hallazgos

Para revisar el análisis técnico profundo de cada una de estas vulnerabilidades y evaluar sus impactos directos en la seguridad de la UI, dirígete al:

➡️ **[📋 Diagnóstico Definitivo del Código Fuente (AUDITORIA.md)](./AUDITORIA.md)**

---

## ↩️ Volver al Índice General de la Raíz

* **[Regresar al panel principal](../README.md)**