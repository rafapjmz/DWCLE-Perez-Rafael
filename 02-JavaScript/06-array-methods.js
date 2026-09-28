/**
 * 06 · ARRAYS: MÉTODOS QUE MUTAN Y MÉTODOS QUE NO
 *
 * La pregunta clave ante cada método: ¿modifica el array original (MUTA) o devuelve uno nuevo?
 *
 *   MUTAN                          NO MUTAN (devuelven uno nuevo)
 *   push, pop, shift, unshift      concat, slice, join, flat, at, includes, indexOf
 *   splice                         toSpliced (ES2023)
 *   sort                           toSorted (ES2023)
 *   reverse                        toReversed (ES2023)
 *   fill, copyWithin               with (ES2023)
 */

console.log('--- 1. Crear arrays ---');
console.log([1, 2, 3]); // literal: casi siempre
console.log(new Array(3)); // [ <3 empty items> ] ← ¡trampa! un solo número = longitud
console.log(new Array(3, 4)); // [3, 4]
console.log(Array.of(3)); // [3]
console.log(Array.from('DAW')); // ['D', 'A', 'W'] desde cualquier iterable
console.log(Array.from({ length: 4 }, (_, i) => i * i)); // [0, 1, 4, 9]

console.log('--- 2. Acceso ---');
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
console.log(animals.length, animals[0], animals.at(-1)); // 5 'ant' 'elephant'  (at(-1) = último)
console.log(animals.includes('duck'), animals.indexOf('camel'), animals.indexOf('zebra')); // true 2 -1

console.log('--- 3. push / pop / unshift / shift (mutan; devuelven longitud o elemento) ---');
const queue = ['pigs', 'goats'];
console.log(queue.push('cows', 'hens'), queue); // 4 [...] push devuelve la NUEVA LONGITUD
console.log(queue.pop(), queue); // 'hens' quita y devuelve el último
console.log(queue.unshift('dogs'), queue); // 3 añade al principio
console.log(queue.shift(), queue); // 'dogs' quita el primero

console.log('--- 4. slice (no muta): copia un tramo [inicio, fin) ---');
console.log(animals.slice(2)); // ['camel', 'duck', 'elephant']
console.log(animals.slice(2, 4)); // ['camel', 'duck']
console.log(animals.slice(-2)); // ['duck', 'elephant']
console.log(animals.slice(2, -1)); // ['camel', 'duck']
console.log(animals.slice(-2, 2)); // [] : de la posición 3 a la 2 no hay nada
console.log(animals.slice()); // copia completa… SUPERFICIAL

console.log('--- 5. Copia superficial (shallow) vs profunda (deep) ---');
const groups = [['ant', 'bison'], ['camel']];
const copy = groups.slice(); // igual con [...groups] o Array.from(groups)
copy[0] = 'replaced'; // cambiar un elemento de la copia NO afecta al original…
copy[1][0] = 'CHANGED'; // …pero los elementos internos son los MISMOS objetos (misma referencia)
console.log(groups); // [['ant','bison'], ['CHANGED']]  ← el original se ha visto afectado
const deepCopy = structuredClone(groups); // copia profunda de verdad (ES2022, navegador y Node)
deepCopy[1][0] = 'again';
console.log(groups[1][0]); // 'CHANGED': ahora sí es independiente

console.log('--- 6. concat y flat (no mutan) ---');
console.log([1, 2].concat(['a', 'b'], 'c')); // [1, 2, 'a', 'b', 'c']
console.log([1, [2, [3, [4]]]].flat(), [1, [2, [3, [4]]]].flat(Infinity)); // [1,2,[3,[4]]] [1,2,3,4]

console.log('--- 7. splice (muta) vs toSpliced (no muta) ---');
const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb'); // en la posición 1 borra 0 e inserta 'Feb'
console.log(months); // ['Jan', 'Feb', 'March', 'April', 'June']
console.log('borrados:', months.splice(3, 1, 'May'), 'quedan:', months); // ['April'] [...'May','June']
const months2 = ['Jan', 'March', 'April'];
console.log(months2.toSpliced(1, 0, 'Feb'), '| original intacto:', months2);

console.log('--- 8. sort: cuidado, ordena como TEXTO por defecto y MUTA ---');
console.log([40, 1, 5, 200].sort()); // [1, 200, 40, 5] ← alfabético, no numérico
const byValue = (a, b) => a - b; // negativo: a antes; 0: iguales; positivo: b antes
console.log([40, 1, 5, 200].sort(byValue)); // [1, 5, 40, 200]
console.log([40, 1, 5, 200].toSorted(byValue)); // igual, sin mutar (ES2023)
console.log(['Beluga', 'ñu', 'Humpback', 'ardilla'].toSorted((a, b) => a.localeCompare(b, 'es'))); // respeta acentos y ñ

const people = [
  { name: 'Samuel', age: 20 },
  { name: 'Alejandro', age: 19 },
  { name: 'Zulema', age: 30 },
  { name: 'Ana', age: 30 },
];
const byAgeDescThenName = (a, b) => {
  if (b.age !== a.age) return b.age - a.age; // cláusula de guarda (early return)
  return a.name.localeCompare(b.name, 'es');
};
console.table(people.toSorted(byAgeDescThenName));

console.log('--- 9. with, toReversed, join ---');
console.log([1, 2, 3].with(1, 'two'), [1, 2, 3].toReversed()); // [1,'two',3] [3,2,1]
console.log(['Blue', 'Humpback', 'Beluga'].join(), ['a', 'b'].join(''), ['a', 'b'].join(' - ')); // "Blue,Humpback,Beluga" "ab" "a - b"

// EJERCICIOS
//   a) Explica con tus palabras qué es una copia superficial. ¿Por qué [...array] no basta con objetos dentro?

//Una copia superficial es aquel que crea un array nuevo, pero mantiene las mismas referencias internas, por eso [...array] copia el contenedor, pero no duplica los objetos o arrays que contiene. Para una copia profunda se puede usar structuredClone(array).

//   b) Ordena `people` por nombre de forma ascendente sin mutar el array. ¿Y descendente?
const peopleByNameAsc = people.toSorted((a, b) => a.name.localeCompare(b.name, 'es'));
const peopleByNameDesc = people.toSorted((a, b) => b.name.localeCompare(a.name, 'es'));
console.table(peopleByNameAsc);
console.table(peopleByNameDesc);
// toSorted devuelve un array nuevo, por eso people no cambiaa

//   c) Dado ['a','b','c','d'], deja ['a','X','d'] usando splice y después toSpliced
const lettersWithSplice = ['a', 'b', 'c', 'd'];
lettersWithSplice.splice(1, 2, 'X'); //splice modifica el array original
console.log(lettersWithSplice); // ['a', 'X', 'd']

const lettersWithToSpliced = ['a', 'b', 'c', 'd'];
const lettersResult = lettersWithToSpliced.toSpliced(1, 2, 'X'); //no modifica el original
console.log(lettersResult); //['a', 'X', 'd']
