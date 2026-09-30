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

//reduce recorre el nuevo array para convertir todas las edades en una sola suma (TE ACUMULA), sum guarda el total acumulado y person.age es la edad de cada persona. El 0 indica que la suma empieza desde cero
//Después dividimos la suma entre el número de personas Junior.
const averageJuniorAge = juniors.reduce((sum, person) => sum + person.age, 0) / juniors.length;
console.log('edad media de los Juniors:', averageJuniorAge); // 42

//MAPA, FILTRO Y REDUCE TE GENERAN NUEVOS ARRAYS 

const sentence = ['hola', 'que', 'tal'];
const fullSentence = sentence.reduce((phrase, word)=> phrase + ' ' + word, ''); //hola que tal
console.log(fullSentence);

console.log(sentence.join(' ')); //hola que tal
//Con interpolacion y luego cortamos con el trim para quitar el espacio al principio
const fullSentence2 = sentence.reduce((phrase, word)=> `${phrase} ${word}`, '').trim(); //hola que tal
console.log(fullSentence2);

//isJunior es una funcion que devuelve true o false si es junior
const isJunior = person =>person.seniority === 'Junior';
//aqui llamamos a la funcion de si es junior y si lo es le sumamos 1 al contador, sino devolvemos el contador tal cual
const juniorCount = people.reduce((cont, person) => isJunior(person) ? cont + 1 : cont, 0);
console.log('juniorCount: ', juniorCount);

//Construir un objeto con la cantidad de personas por seniority
// {junior: 2, middle 1, senior:1}
//Objectify
//Es lo mismo si en vez de {} creo una const initialValue = {Junior: 0, Middle:1, Senior: 1}, y luego lo cambio
const initialValue = {Junior: 0, Middle:1, Senior: 1};
const table = people.reduce((contador, person) => {
//Si le pongo los corchetes se vuelve dinamicamente en una variable.
contador[person.seniority] = contador[person.seniority]+1;
return contador;

}, initialValue);
console.log(table);


console.log('6. Object.groupBy');
const table2 = Object.groupBy(people, (person) => person.seniority);
console.log(table2);


//Aqui lo metemos en una categoria u otra según si es par o no es par
console.log(Object.groupBy(numbers, n => isEven(n) ? 'even' : 'odd'));


//Queremos meter en una categoria si es menor o mayores que los distintos valores, para ello podemos hacer un if dentro de la función que le pasamos a groupBy
console.log(Object.groupBy(numbers, n => {

  if(n<10){
    return 'CATEGORIA <5';
  }

  if(n>=5 && n < 50) {
    return 'CATEGORIA >=5&&<10';
  } else {
    return 'CATEGORIA >10';
  }

}))

const teams =[{name: 'A', members: ['Ana']}, {name: 'B', members: ['Jose']}, {name: 'C', members: ['Eva']}];

console.log(teams.flatMap(team => team.members)); // ['Ana', 'Jose', 'Eva'] 


const juniorAgeSum = people //CUALQUIER LENGUAJE FUNCIONAL ES PERFECTO, EN JS NO!, PORQUE EN CADA UNO ES UN ARRAY FOR, UNO EN EL FILTER, UNO EN EL MAP Y OTRO EN EL REDUCE
                      .filter(isJunior)
                      .map(person => person.age)
                      .reduce((total, age) => total + age, 0); 

//Es mejor hacer 3 bucles for de 1000 iteraciones por ejemplo que 3 bucles anidados de 1000 que daria 10000000 de iteraciones.

//En programación funcional se busca que cada función haga una cosa y la haga bien, por eso se hace un bucle for para filtrar, otro para mapear y otro para reducir. En programación imperativa se haría todo en un bucle for, pero no es tan legible ni reutilizable.
                      


