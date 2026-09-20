/**
 * 01 · HOLA MUNDO
 *
 * Cómo ejecutar:   node 01-hello-world.js
 * Con recarga:     node --watch 01-hello-world.js   (sustituye a nodemon, viene con Node)
 *
 * JavaScript se ejecuta en el navegador (Chrome, Firefox…), en el servidor (Node, Deno, Bun)
 * y hasta en móviles y escritorio (React Native, Electron). El lenguaje lo define el estándar
 * ECMAScript (ECMA-262), que el comité TC39 publica CADA JUNIO desde 2015.
 *
 *   ES5      2009  strict mode, JSON, forEach/map/filter
 *   ES6      2015  let/const, clases, arrow functions, módulos, promesas, template literals
 *   ES2016         Array.includes, **
 *   ES2017         async/await, Object.entries
 *   ES2018         rest/spread en objetos, for await
 *   ES2019         Array.flat, Object.fromEntries
 *   ES2020         ?. y ??, BigInt, Promise.allSettled, import() dinámico
 *   ES2021         ||= &&= ??=, String.replaceAll
 *   ES2022         campos privados #x, top-level await, Array.at
 *   ES2023         toSorted/toSpliced/with, findLast
 *   ES2024         Object.groupBy, Promise.withResolvers
 *   ES2025         Set.union/intersection, ayudantes de iteradores, RegExp.escape, Promise.try
 *   propuestas     using (gestión explícita de recursos), decoradores, Temporal…
 *
 * Nosotros vamos a usar la última versión a pesar de que no todos los navegadores la soporten todavía. Node sí.
 * Una PROPUESTA pasa por 4 fases (stages) en TC39; solo en la 4 entra en el estándar.
 * Un POLYFILL es código que implementa una función nueva en un motor que aún no la trae. Es decir nos permite usar
 * una versión moderna
 * 
 * Cuando está actualizado el navegador al ser nativo va más rápido que un polyfill, que es código JavaScript que emula la * función nueva.
 *
 * Convención del curso: el CÓDIGO (variables, funciones, clases, propiedades) siempre en inglés;
 * los comentarios y los textos que ve el usuario, en castellano.
 */

console.log('Hola DAW, ¿qué tal estamos?');

// console tiene más métodos que log: úsalos, ayudan a leer la salida
console.info('info: mensaje informativo');
console.warn('warn: aviso');
console.error('error: va por la salida de error (stderr)');
console.table([
  { subject: 'DWCLE', hours: 6 },
  { subject: 'DIW', hours: 5 },
]);

// Template literals (ES6): comillas invertidas, interpolación con ${} y varias líneas
const subject = 'DWCLE';
const year = 2026;
console.log(`Bienvenidos a ${subject}, curso ${year}/${year + 1}
Segunda línea sin concatenar nada`);

// Los ficheros de esta carpeta son MÓDULOS ES ("type": "module" en package.json):
//  - se ejecutan siempre en modo estricto ('use strict' implícito)
//  - las variables no se cuelan en el ámbito global
//  - podemos usar import/export (lo veremos en 11-modules)

// EJERCICIO: ejecuta `node --watch 01-hello-world.js`, cambia el texto del saludo y guarda.
