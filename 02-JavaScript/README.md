# Unidad 2 · JavaScript moderno — código de clase (curso 2026/27)

Cada fichero se ejecuta solo, imprime lo que explica y termina con ejercicios. Los bloques van numerados en el
orden en que los veremos en clase; cada uno cabe en una sesión o media.

**Convención del curso:** el código (variables, funciones, clases, propiedades, ficheros) siempre en inglés;
los comentarios y los textos que ve el usuario, en castellano.

## Cómo ejecutar

Solo hace falta **Node 22 o superior** (recomendado 24). Sin `npm install`: no hay dependencias.
Cada bloque tiene su script con el mismo número; `npm run` sin nada lista todos.

| Script                                    | Qué hace                                                                                                              |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `npm run 01` … `npm run 11`, `npm run 14` | Ejecuta ese fichero con `node --watch`: se vuelve a ejecutar cada vez que guardas el fichero o cualquiera que importe |
| `npm run 15:01` … `npm run 15:07`         | Igual, para cada fichero de `15-this/`                                                                                |
| `npm run 15`                              | Los siete de `15-this/` seguidos, sin watch                                                                           |
| `npm run 12`, `npm run 13`                | Arranca Vite y abre el ejemplo de navegador; recarga sola al guardar                                                  |
| `npm run all`                             | Ejecuta todos los ficheros de Node de una vez, para comprobar que todo sigue funcionando                              |
| `npm run check`                           | Comprueba la sintaxis de todos los ficheros sin ejecutarlos                                                           |
| `npm run watch -- <fichero>`              | Watch de cualquier fichero que le pases (el `--` separa los argumentos de npm de los del script)                      |
| `npm run web`                             | Servidor Vite en la raíz, para navegar a mano a `/11-modules/`, `/12-mvp-first/` o `/13-mvp-todo/`                    |

`node --watch` vigila el fichero de entrada y todos los módulos que carga. No vigila ficheros que se leen con
`fs` (un JSON de datos, por ejemplo): para eso existe `node --watch-path=./datos fichero.js`.

`package.json` declara `"type": "module"`: todos los `.js` son módulos ES, se ejecutan en modo estricto y
admiten `import`/`export` y `await` de nivel superior. La única excepción es `15-this/01-global.cjs`, que es
CommonJS a propósito para ver el modo no estricto.

## Guion de sesiones

| #     | Fichero                           | Qué se enseña                                                                                                                                                                                                                   | Preguntas para lanzar en clase                    |
| ----- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| 1     | `01-hello-world.js`               | Versiones ES hasta 2025, TC39, `console.*`, template literals, cómo ejecutar                                                                                                                                                    | ¿Qué es un polyfill? ¿Por qué ES sale cada junio? |
| 2     | `02-variables-and-scope.js`       | global implícita, `var` y hoisting, `let`/`const`, TDZ, shadowing, `const` no congela, `Object.freeze`                                                                                                                          | ¿Qué imprime el `for` con `var` y `setTimeout`?   |
| 2     | `02b-using.js`                    | `using` y `Symbol.dispose`, orden LIFO, se libera aunque haya excepción                                                                                                                                                         | ¿Qué recursos hay que cerrar en una web?          |
| 3     | `03-types-and-comparisons.js`     | `typeof`, IEEE 754, `NaN`, `BigInt`, `null`/`undefined`, conversiones explícitas e implícitas, `==` vs `===`, falsy, `&&`/`\|\|`/`??`, `?.`, `??=`                                                                              | `'10' - '4' + '2'` sin ejecutar                   |
| 3     | `04-control-flow-and-loops.js`    | `x++` vs `++x`, ternario, `switch`, `for`/`while`, `for…of` con `entries()`, `for…in`, `forEach`, `break`/`continue`, etiquetas                                                                                                 | Recorrer de dos en dos; `for(;;)`                 |
| 4     | `05-iterators-and-generators.js`  | protocolo `Symbol.iterator`/`next()`, iterable propio, generadores `function*`, iteradores infinitos, ayudantes de iteradores ES2025                                                                                            | ¿Qué gana un iterador perezoso?                   |
| 5     | `06-array-methods.js`             | crear arrays, `at`, mutan vs no mutan, `slice`, copia superficial y `structuredClone`, `splice`/`toSpliced`, `sort`/`toSorted` con `localeCompare('es')`, `with`, `join`                                                        | ¿Por qué `[...a]` no basta con objetos dentro?    |
| 6     | `07-arrays-functional.js`         | funciones como valores, arrow, `find`/`findLast`/`some`/`every`, `filter`, `map`, `reduce`, `Object.groupBy`, `flatMap`, encadenar                                                                                              | Implementa tu `myMap`                             |
| 7     | `08-spread-rest-destructuring.js` | referencia vs copia, spread en arrays y objetos, orden de sobrescritura, actualizar y borrar sin mutar, rest, parámetros por defecto, desestructuración, objeto de opciones                                                     | `toggleActive` sin mutar                          |
| 8     | `09-callbacks.js`                 | callbacks síncronos, objeto `{ success, error }` con cláusula de guarda, convención error-primero de Node, `setTimeout` y el orden a-b-c                                                                                        | Dibuja la cola de tareas                          |
| 8     | `10-callback-hell.js`             | la pirámide, aplanar con funciones con nombre, spoiler de promesas                                                                                                                                                              | ¿Y si el callback se llama dos veces?             |
| 9     | `11-modules/`                     | `export` con nombre y por defecto, `import` con alias y namespace, `import()` dinámico, por qué hace falta servidor                                                                                                             | ¿Qué hace un bundler?                             |
| 10    | `12-mvp-first/`                   | contador con servicio, vista y controlador; inyección de dependencias; campos privados; arrow como propiedad para conservar `this`                                                                                              | ¿Dónde va la regla "no bajar de 0"?               |
| 11-12 | `13-mvp-todo/`                    | MVC completo: modelo inmutable con `with()` y validación, servicio observable con `subscribe`, vista con `render()`, delegación de eventos, edición en línea, i18n con diccionarios, controlador que traduce errores a mensajes | ¿Cuántas líneas se tocan para añadir el francés?  |
| 13    | `14-exceptions/`                  | `try/catch/finally`, excepciones propias con datos (`field`, `value`, `id`), `instanceof` de específica a general, relanzar, `cause`, errores nativos, por qué no lanzar strings                                                | Excepciones vs `{ ok, error }`                    |
| 14    | `15-this/`                        | valor por defecto (sloppy vs estricto), pérdida de `this` y sus tres arreglos, `new` y `prototype`, `call`/`apply`/`bind`, arrow léxico, clases, las 4 reglas en orden y un quiz                                                | ¿Qué recibe `setTimeout(obj.get)`?                |
| —     | `semver.md`                       | MAJOR.MINOR.PATCH, prerelease con guion, `^` y `~` en package.json                                                                                                                                                              | ¿Qué versión tras renombrar un método público?    |

## Cuándo pasar al template

A partir de `12-mvp-first` el código ya tiene varias capas y ficheros. Es el momento natural de abrir la
[plantilla TypeScript + Vite](../template/) para que el alumnado trabaje con tipos, lint y tests desde ahí.
`13-mvp-todo` es la app que conviene rehacer allí como primer proyecto con tests.

## Lo que aún no hemos visto de JavaScript y dónde lo veremos

Esta unidad cubre la base del lenguaje. El resto se va viendo a lo largo del curso, siempre dentro de una
práctica o de una unidad concreta, para aprenderlo usándolo. La previsión es esta; el orden puede ajustarse.

| Tema                                   | Qué incluye                                                                                                                                                          | Dónde se verá                                                                      |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Closures y funciones de orden superior | ámbito léxico, closures como estado privado, currying, composición, memoización, debounce y throttle                                                                 | Ampliación de esta unidad, antes de la **P1 · arrays**                             |
| Cadenas y expresiones regulares        | métodos de `String`, `RegExp` con grupos con nombre y `matchAll`, `Intl` para fechas, números y ordenación                                                           | **P2 · formulario**: validación de campos                                          |
| Fechas                                 | `Date` y sus trampas, `Temporal`, formato ISO 8601 en JSON                                                                                                           | **P2 · formulario** (fecha de nacimiento) y **P5**                                 |
| DOM y eventos a fondo                  | burbujeo y captura, `target` vs `currentTarget`, delegación, `dataset`, `classList`, `<template>` y `cloneNode`, `requestAnimationFrame`, `IntersectionObserver`     | **P2 · formulario**, **P3 · Hangman** y **P4 · TPV**                               |
| Objetos a fondo                        | `Object.entries`/`fromEntries`, getters y setters, descriptores, `Symbol`, cadena de prototipos, herencia con `extends` y `super`, `static`, mixins                  | **Unidad 3 · TypeScript** (clases e interfaces) y modelos de **P3** y **P4**       |
| Colecciones                            | `Map`, `Set` con `union`/`intersection`/`difference` (ES2025), `WeakMap`, `WeakRef`                                                                                  | **P4 · TPV** y el ejemplo del hospital que construiremos en clase con la plantilla |
| JSON y serialización                   | `JSON.parse` con `reviver`, `stringify` con `replacer`, `toJSON`, límites con fechas y `Map`                                                                         | **P5 · animals** (API con json-server) y **P6**                                    |
| Asincronía                             | event loop con macro y microtareas, promesas, `async/await`, `fetch` con `AbortController`, `Promise.all`/`allSettled`/`any`/`race`, errores asíncronos, `for await` | **Unidad 7 · asincronía** y **P5 · animals**                                       |
| Almacenamiento en el navegador         | `localStorage`, `sessionStorage`, `IndexedDB` con Dexie, `structuredClone`, Cache API                                                                                | **P6 · local stores** y **P7 · animals con Dexie**                                 |
| Herramientas                           | depuración en DevTools (breakpoints, `debugger`, rendimiento), tests con Vitest, ESLint y Prettier                                                                   | Desde la **P1** con la [plantilla TypeScript + Vite](../template/)                 |
| Rendimiento y memoria                  | referencias y recolección de basura, fugas con listeners y timers, Web Workers                                                                                       | Al cerrar **P4 · TPV**                                                             |
| Web Components                         | `customElements`, shadow DOM, `<template>`                                                                                                                           | Final del curso, como puente hacia un framework                                    |
| Novedades del lenguaje                 | `Promise.try`, `RegExp.escape`, decoradores, import attributes, propuestas de TC39                                                                                   | Sesiones cortas repartidas por el curso                                            |
| TypeScript                             | tipos, interfaces, genéricos, `strict`, por qué la plantilla lo activa desde el primer día                                                                           | **Unidad 3 · TypeScript**                                                          |
