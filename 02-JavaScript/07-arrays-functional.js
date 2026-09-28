/**
 * 07 · PROGRAMACIÓN FUNCIONAL CON ARRAYS
 *
 * En JavaScript las funciones son VALORES: se guardan en variables, se pasan como argumento
 * (callbacks) y se devuelven. Los métodos find/filter/map/reduce reciben una función que se
 * ejecuta por cada elemento. Ninguno de ellos muta el array original.
 */

const numbers = [5, 12, 8, 130, 44];

console.log('--- 1. Del bucle a la función ---');
// Bucle clásico: el primer elemento mayor que 10
let found;
for (const n of numbers) {
  if (n > 10) {
    found = n;
    break;
  }
}
console.log('bucle →', found);

// La misma lógica como función que se pasa a find
function greaterThan10(n) {
  return n > 10;
}
console.log('find + función →', numbers.find(greaterThan10));
console.log('find + anónima →', numbers.find(function (n) { return n > 10; }));
console.log('find + arrow   →', numbers.find((n) => n > 10)); // arrow function (ES6): return implícito

console.log('--- 2. Predicados reutilizables ---');
const isEven = (n) => n % 2 === 0;
const isOdd = (n) => !isEven(n);
console.log('primer par:', numbers.find(isEven)); // 12
console.log('último par:', numbers.findLast(isEven)); // 44 (ES2023)
console.log('posición del primer par:', numbers.findIndex(isEven)); // 1
console.log('¿alguno impar?', numbers.some(isOdd)); // true
console.log('¿todos pares?', numbers.every(isEven)); // false

console.log('--- 3. filter: todos los que cumplen ---');
const people = [
  { name: 'Fermín', age: 37, seniority: 'Middle' },
  { name: 'Miguel', age: 27, seniority: 'Junior' },
  { name: 'Lorena', age: 31, seniority: 'Senior' },
  { name: 'Luis', age: 57, seniority: 'Junior' },
];
const olderThan30 = (person) => person.age > 30;
console.log('primera >30:', people.find(olderThan30).name); // Fermín
console.log('todas >30:', people.filter(olderThan30).map((p) => p.name)); // ['Fermín','Lorena','Luis']
const experienced = (p) => p.age > 30 && ['Senior', 'Middle'].includes(p.seniority);
console.log('con experiencia:', people.filter(experienced).map((p) => p.name));

console.log('--- 4. map: transforma cada elemento (mismo tamaño) ---');
const addYear = (person) => ({ ...person, age: person.age + 1 }); // copia con la edad +1, sin tocar el original
console.table(people.map(addYear));
console.log('original intacto:', people[0].age); // 37
const names = people.map((p) => p.name); // proyección: de objetos a strings
console.log(names);


// Ejercicio: ¿cuál es la edad media de las personas Junior?
//filter recorre todas las personas y se queda solo con las que cumplen la condición, luego person es cada persona del array y person.seniority es su categoría profesional.
const juniors = people.filter((person) => person.seniority === 'Junior');

//reduce recorre el nuevo array para convertir todas las edades en una sola suma, sum guarda el total acumulado y person.age es la edad de cada persona. El 0 indica que la suma empieza desde cero

//Después dividimos la suma entre el número de personas Junior.
const averageJuniorAge = juniors.reduce((sum, person) => sum + person.age, 0) / juniors.length;
console.log('edad media de los Juniors:', averageJuniorAge); // 42



