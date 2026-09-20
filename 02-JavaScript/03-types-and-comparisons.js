/**
 * 03 Tipos, conversiones y comparaciones
 * 
 * JavaScript es de tipado dinámico(que pasas de string a number y demás fácil, antes hemos pasado de un array a un número) y el motor convierte tipos por su cuenta (coerción) Saber cuando lo hace evita la mitad de los bugs. 
 * 
 * 7 tipos primitivos + objetos: number, bigint, string, boolean, undefined, null, symbol
 */


console.log (typeof 42, typeof 3.14, typeof NaN); //NaN es tipo que no es un numero
console.log (typeof 'hola', typeof true, typeof undefined); // string, boolean, undefined
console.log(typeof null); //object es un error historico del lenguaje no se puede arreglar desde el 95
console.log (typeof {}, typeof [], typeof (()=>{})); // este devuelve object object y function porque function viene de object
console.log (typeof 10n, typeof Symbol('id'));  //Esto sería el bigint
console.log ('es array?', Array.isArray([])); 
console.log ('es array?', typeof[] === 'Array'); //false porque typeof devuelve object, no array, los tres iguales son como un if
console.log(0.1+0.2 == 0.3); //IEEE-754 del 84 de como se codifica un núnmero grande o pequeño en el HW, si lo comparo con 0.3 da error, por el problema de las comas flotantes, este problema los suele resolver las bibliotecas, pero aqui no tenemos, por eso se nos comenta que no usemos javascript para las matematicas, para paginas con contabilidad grande cuidao por eso se usa rust o go en esos casos.
console.log(0.1+0.2);
console.log(Math.abs(0.1+0.2-0.3) < Number.EPSILON);
console.log((0.1+0.2).toFixed(2)+1);//Concatenar
console.log(Number.MAX_SAFE_INTEGER, 2 ** 53 === 2**53+1); //El ** es elevado, el max safe integer es el numero mmaimo permitido, entonces mostramos el numero maximo permitido entero y luego si sumamos +1 nos sale true o +2 nos sale false

console.log(Number.isNaN(NaN), NaN === NaN); //No podemos comparar NaN entre ellos con los tres iguales

//Null y undefined son lo mismo conceptialmente
//En el desarrollo moderno el undefined no se usa, solo se trabaja con NULL
let noValue; // Declarada pero no inicializada
console.log(noValue); // Undefined
const empty = null;
console.log(empty);
console.log(null == undefined, null === undefined); // desigualdad == o desigualdad estricta ===, por ejemplo en el +1 de antes concatenado nos detectaría si es concatenado o no

console.log (Number('2.11'), Number('abc'), Number(''), Number(true)); //Nos devuelve en el '' 0, en el true 1 y en el false 0, y en el abc nos devuelve NaN
console.log(parseInt('42px'), parseFloat('3.5kg'), parseInt('px42')); //el px hay que quitarlo porque en uno da error en el otro no

console.log(String(123), (123).toString(), `${123}`); //Nos devuelve el 123 en string, el toString es un metodo de los objetos y el ${} es una interpolacion de string, todos son string

console.log(Boolean(''), Boolean('0'), Boolean(0), Boolean([])); //Nos devuelve en el primero false porque es un string vacio, el segundo true porque es un string con un 0, el tercero false porque es un 0 y no un 1, y luego el cuarto porque es true porque has reservado memorria, porque esta inicializado

console.log(+'2.11', -'3'); //Esto es un truco para convertir a number, con el+ a un numero positivo y con el - a un numero negativo

console.log(+'paco'); //Nos devuelve NaN

//En clase han preguntado de hacer un ++'2.11' pero realmente esto es un error, porque el ++ es un operador de incremento y hay que aplicarlo sobre una variable

console.log

//BUSCAR PANTALLITAS CON NAN
