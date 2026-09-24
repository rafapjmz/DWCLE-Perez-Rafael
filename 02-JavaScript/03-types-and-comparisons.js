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
console.log(parseInt('42px'), parseFloat('3.5kg'), parseInt('px42')); //el px hay que quitarlo porque en uno da error en el otro no, es nativo de javascript, los convierte a número

console.log(String(123), (123).toString(), `${123}`); //Nos devuelve el 123 en string, el toString es un metodo de los objetos y el ${} es una interpolacion de string, todos son string

console.log(Boolean(''), Boolean('0'), Boolean(0), Boolean([])); //Nos devuelve en el primero false porque es un string vacio, el segundo true porque es un string con un 0, el tercero false porque es un 0 y no un 1, y luego el cuarto porque es true porque has reservado memorria, porque esta inicializado

console.log(+'2.11', -'3'); //Esto es un truco para convertir a number, con el+ a un numero positivo y con el - a un numero negativo

console.log(+'paco'); //Nos devuelve NaN

//En clase han preguntado de hacer un ++'2.11' pero realmente esto es un error, porque el ++ es un operador de incremento y hay que aplicarlo sobre una variable

console.log('5' + 3, '5' - 3, '5' * '3'); //El primero devuelve 53 que es una cadena al ser un +, luego el otro nos devuelve 2 porque el - no es de concatenación es de resta, en el 5 * 3 los convierte a números

console.log(1+true, false + false, 'a' + null, [] + {}); //true se convierte a 1, por lo tanto el resultado es 2

//console.log([] === false, [] == false); //El primero es una comparacion estricta y el segundo es una comparación normal, por lo tanto el primero nos devuelve false y el segundo true, porque el [] se convierte a false.

console.log([] == false, [1] == 1, '1' == 1); //Esto es un poco raro, porque el [] se convierte a false y el [1] se convierte a 1, por lo tanto nos devuelve true en ambos casos, pero no sería correcto aplicarlo

//console.log([] == [], [] === []); //El primero nos devuelve false porque son dos arrays distintos, y el segundo también nos devuelve false porque son dos arrays distintos, aunque sean iguales, no son el mismo objeto, APUNTAN A DIFERENTES LUGARES DE MEMORIA, No son iguales.

//Solo hay 8 valores falsy: false, 0, -0, 0n, "", null, undefined, NaN. Todo lo demás es truthy.

const falsyValues = [false, 0, -0, 0n, "", null, undefined, NaN];
console.log(falsyValues.map(value => Boolean(value))); //Nos devuelve un nuevo array(un mapa), donde se le hace un casting a cada uno de los valores falsy
console.log(Boolean('0'), Boolean([]), Boolean({}), Boolean('false')); //Nos devuelve true todos, porque son truthy, aunque sean falsy, porque no son falsy, son truthy, porque no son ninguno de los 8 valores falsy

console.log('--- 8. Cortocircuito: && || ?? ---');
// && devuelve el primer falsy o el último valor; || devuelve el primer truthy o el último
console.log('hola' && 'adios' && 'ruido');
console.log(Boolean('hola' && 'adios' && 'ruido'));

console.log('hola' && false && 'ruido');
console.log(Boolean('hola' && false && 'ruido'));


console.log('hola' && '' && 'ruido');
console.log(null || 'por defecto');

console.log(0 || 'por defecto', 0 ?? 'por defecto');

/*
const isCheap = () => false; //Es una constante al que se le asigna una función lambda
const isExpensive = () => {
    
    for(let i =0; i<10000000000000000000000; i++){
        
    }

    return false;
    //throw new error ("no deberia ejecutarse");
};


console.log ('cortocircuito: ', isCheap() && isExpensive()); // hay que ponerlo por orden de consumo, primero las que consuman menos

console.log ('cortocircuito: ', isExpensive() && isCheap());

*/
console.log('--- 9 Encadenamiento opcional ?. (ES2020) y asignaciones lógicas (ES2021)');
const person = { name: 'Ana', address: null};
console.log(person.address?.city); //Nos permite entrar en una propieda d de un objeto o de una funcion para que el programa no falle si es nulo o undefined
console.log( person.greet?.()); //también funciona con funciones

const settings = {theme: null};

if(!settings.theme){
    settings.theme = 'ligth';
} //Esto no es equivalente

if(!settings.theme === null || settings.theme === undefined){
    settings.theme = 'ligth';
} //Esto si es equivalente

settings.theme??= 'light'; //Asigna solo si es null/undefined, esta también contiene los falsys
settings.language ||= 'es'; //Asignan solo si es falsy
console.log(settings);

// EJERCICIOS
//   a) Sin ejecutarlo, ¿qué devuelve cada uno?  '10' - '4' + '2'   |   '10' + 4 - 2   |   [] + []   |   null + 1   |   undefined + 1

//1. El primero devuelve 62, porque primero convierte, el 4 en -4, se lo resta al 10 y luego lo concatena al haber un + con el 2. Todo esto ocurre porque esta entre comillas
//2. El segundo devuelve devuelve 102, porque primero concatena el '10' + 4 y le resta al 104 - 2
//3. Devuelve una cadena vacia "", debido a que la operacion trata de convertir los arrays a primitivos, llamando al toString interno, devolveindo cadena vacia y sumando dos cadenas vacias.
//4. Devuelve 1 porque el null cuenta como 0.
//5. Devuelve NaN porque undefined no cuenta como numero, por lo que hace la conversion y es NaN.


//   b) ¿Cuándo preferirías || a ?? y al revés? Piensa en un formulario donde el usuario escribe 0.
// Usaríamos el ||, este nos sirve por si quieres que se asigne un valor por defecto usaríamos el ||, devuelve el valor a su derecha, porque ha detectado un valor falso (false, 0, "" cadena vacia, NaN, null o undefined) por ejemplo:
const introducido = 0;
const total = introducido || 2; //Devuelve 2 porque 0 es falso
console.log('Prueba1: ' +total);

//El ?? nos sirve para devolver el valor a la derecha unicamente si el valor introducido en el formulario e snull o undefined, respeta los ceros, las cadenas vacias, solo si falta el dato de forma estricta.
const introducido2 = 0;
const total2 = introducido2 ?? 2; //Devuelve 0 porque 0 no es null ni undefined
console.log('Prueba2: ' + total2);



//   c) Busca qué es un polyfill y escribe uno para Array.prototype.at si no existiera.
//El array.prototype.at permite acceder a un elemento de un array usando un índice, tantos positivos como negativos
//Los polyfills son fragmentos de código los cuales se usan para implementar funcionalidades modernas en navegadores antiguos que no soportan

if(!Array.prototype.at){ //Si no existe el .at en el navegador, lo creamos
    //lo volvemos una función que le entra un indice
    Array.prototype.at = function(index){

        //Si el indice es negativo s elo restamos a la longitud total
        if(index <0){
            index = this.length + index;
        }

        //Devolvemos el elemento en esa posicion
        return this[index];
    }
}