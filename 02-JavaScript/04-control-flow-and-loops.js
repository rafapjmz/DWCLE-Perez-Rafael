/**
 * 04 · OPERADORES, CONDICIONALES Y BUCLES
 */



console.log('--- 1. Incremento: pre y post ---');
let x = 5;
const y = x++; // POST: primero usa el valor (y = 5), luego incrementa (x = 6)
const z = ++x; // PRE: primero incrementa (x = 7), luego usa el valor (z = 7)
console.log({ x, y, z }); // { x: 7, y: 5, z: 7 }
// CONSEJO: en código de equipo, x += 1 es más legible que x++ y evita estas trampas
let counter = 0;
counter += 1;
counter -= 2;
counter *= 3;
console.log('counter:', counter); // -3

console.log('--- 2. Operador ternario: solo para elegir entre DOS valores ---');
const grade = 7;
const result = grade >= 5 ? 'aprobado' : 'suspenso'; // OK: devuelve un valor
console.log(result);
// NO: ternarios anidados o con efectos secundarios; usa if/else o una función
// const text = grade >= 9 ? 'sobresaliente' : grade >= 7 ? 'notable' : grade >= 5 ? 'aprobado' : 'suspenso';

console.log('--- 3. switch: recuerda el break ---');
const day = 'sábado';
switch (day) {
  case 'sábado':
  case 'domingo': // sin break: "cae" al siguiente case a propósito
    console.log(day, 'es fin de semana');
    break;
  default:
    console.log(day, 'es laborable');
}

console.log('--- 4. Bucles clásicos ---');
const words = ['hola', 'adiós', 'await', 'sopa'];
for (let i = 0; i < words.length; i += 1) {
  console.log('for       →', i, words1[i]);
}
let n = 0;
while (n < 2) {
  console.log('while     →', n);
  n += 1;
}
do {
  console.log('do…while  → se ejecuta al menos una vez aunque la condición sea falsa');
} while (false);

console.log('--- 5. for…of (ES6): recorre VALORES de cualquier iterable ---');
for (const word of words1) console.log('for…of    →', word);
for (const letter of 'DAW') console.log('for…of    →', letter); // los strings también son iterables
for (const [index, word] of words.entries()) console.log('for…of    →', index, word); // índice + valor
for (const [key, value] of new Map([['a', 1], ['b', 2]])) console.log('for…of    →', key, value);

console.log('--- 6. for…in: recorre CLAVES de un objeto (no lo uses con arrays) ---');
const person = { name: 'Ana', age: 20 };
for (const key in person) console.log('for…in    →', key, person[key]);
// Alternativa moderna sin for…in:
for (const [key, value] of Object.entries(person)) console.log('entries   →', key, value);

console.log('--- 7. forEach: un callback por elemento (no se puede cortar con break) ---');
words.forEach((word, index) => console.log('forEach   →', index, word));

console.log('--- 8. break, continue y etiquetas ---');
for (const word of words) {
  if (word === 'await') continue; // salta este
  if (word === 'sopa') break; // corta el bucle
  console.log('break/cont→', word);
}
outer: for (let i = 0; i < 3; i += 1) {
  for (let j = 0; j < 3; j += 1) {
    if (j === 1) continue outer; // salta a la siguiente vuelta del bucle EXTERIOR
    console.log('etiqueta  →', i, j);
  }
}


console.log([1,2,3]);
console.log(new Array(3,4)); //no se usa, porque es confuso lo spuedes hacer con [3,4]
console.log(new Array(8)); //no se usa, crea un array con 8 elemntos vacios
console.log(Array.of(3,4)); //equivalente al primero
console.log(Array.from('DAW'));//Convierte iterables en array
console.log(Array.from(new Set([1,2,3])));

console.log(Array.from({length:4},(_,i) => i* i)) //En donde esta el length es lo equivalente a que se haya creado un array de 4 posiciones, como si hubiera puesto [1,2,3,4]

console.log(Array.from([1,2,3,4],(value,index) => value* index)) //Es lo mismo que arriba creo

console.log('----2. ACCESO');
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
console.log(animals.length, animals[0], animals.at(-1));
console.log(animals.includes('duck'), animals.includes('zebra'), animals.indexOf('camel'))

console.log('---3. push/pop/unshift/shift(mutan devuelven longitud o elemento) ---');
const queue = ['pigs', 'goats'];

//push inserta, pop saca
console.log(queue.push('cows', 'hens'), queue);
console.log(queue.pop(),queue);
console.log(queue.unshift('dogs'), queue);
console.log(queue.shift(), queue);
console.log('----------');
console.log(queue.slice(2), queue); //Corta en la posicion 2 y crea otro array
console.log(queue.slice(2,4)); // Apartir de la posicion 2 y aunque nuestro array sea de 3 toma hasta donde pueda de nuestro array

console.log(queue.slice(-2,-2));// si vamos para atras al tener -2 solo podemos ir para delante no para atras porque sino nos sale vacio
console.log(queue.slice(-2,4));// asi si

//const deepCopy = structuredClone(groups); copia profunda de verdad (es2022, navegador y node); USAR 

console.log('---6.Concat y flat (no mutan) ---');
console.log([1,2].concat(['a','b'])); //[1,2,]


// EJERCICIOS
//   a) Recorre `words` mostrando solo las posiciones pares; después solo las impares. Hazlo con for, con
//      for…of + entries() y con filter. ¿Cuál es más legible?

const words2 = ["one", "two", "three", "four", "five"];
//Con for normal
//Posiciones pares
for(let i=0;i<words2.length;i+=2){
  console.log(i,words2[i])
}
//Posiciones impares
for(let i=1;i<words2.length;i+=2){
  console.log(i,words2[i])
}

//Con for of
//Como el .entries devuelves tanto clave como valor tenemos que crear un iterador de pares
console.log("Pares con for of");
for(const [i,word] of words2.entries()){
  if(i%2==0) console.log(i,word);
}

console.log("Impares con for of");
for(const [i,word] of words2.entries()){
  if(i%2!==0) console.log(i,word);
}

//filter, es un método de los arrays que sirve para quedarte solo con los elementos que cumplen una condición, devolviendo un nuevo array
console.log("Pares con el filter");
const pares = words2.filter((words2,i) => i%2 == 2);
console.log("Pares: ", pares);

console.log("Impares con el filter");
const impares = words2.filter((words2,i) => i%2 !== 2);
console.log("Impares: ", pares);



//   b) ¿Cuándo y por qué tiene sentido escribir  for (;;) { … }  ? ¿Qué lo diferencia de while (true)?

//El for(;;) es un bucle infinito, el cual omite la inicializacion, condición e incremento, no hay condición que lo detenga, sigue hasta que algo dentro lo rompa, un break, un return, o una excepcion, es igual que el while(true), lo único que lo diferencia es que se ve mejor la condición en el while por lo que se diferencia mejor que es infinito.


//   c) ¿Qué pasa si haces `return` dentro de un forEach? ¿Y `break`? Pruébalo.

//Prueba con return en un forEach
word.forEach((word,i)=>{
  if(i===2)return;
  console.log(i,word);
});
//El return no sale del bucle solo sale de la función en esa iteración, tal cual como un continue, se salta el elemento actual y el bucle sigue

//Prueba con el break
/*
word.forEach((word,i)=>{
  if(i===2) break;
  console.log(i,word);
});
*/
//Sale error, el break solo es valido en bucles reales, forEach es una fnuución como tal, no tiene bucle de verdad