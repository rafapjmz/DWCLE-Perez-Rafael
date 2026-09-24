/**
 * 04 - OPERADORES, CONDICIONALES Y BUCLES
 * 
 */

let x = 5;
const y = x++; // POST: primero usa el valor y=5, luego incrementa x=6
const z = x++; //PRE: primero incrementa x=7, luego usa el valor z=7
console.log({x,y,z});


//Consejo, escribirlo así, más clara para leer
let x2=5;
const y2 = x2 + 1;
x2 = x2 + 1;
const z2 = x2 + 1;

//Consejo: en código de equipo, x+=1 es más legible que x++ y evita estas trampas.
counter +=1;
counter -=2;
counter *=3;

console.log('--- 2 Operador ternario solo para elegir ')

//Los switch no los usamos

//Necesito un iterable para los for each que son lo mejor para los bucles modernos, los iterables son por ejemplo arrays, mapset.

// El for in cuidado usandolo, SE USA PARA RECORRER LAS LLAVES DE UN OBJETO, devuelve el nombre de la propiedad, se debe hacer con un for of sacando los valores, con object.values

//La funcion .forEach es más ineficiente para la maquina y encima no tienes control sobre el, no puedes pararlo ni nada, todo lo que haces con el forEach puedes hacerlo con el for of y tienes más control

//El continue salta arriba, sale, el break sale tambien pero continua por abajo, el break y continue no usarlo, porque va de arriba pa abajo

console.log([1,2,3]);
console.log(new Array(3,4)); //no se usa, porque es confuso lo spuedes hacer con [3,4]
console.log(new Array(8)); //no se usa, crea un array con 8 elemntos vacios
console.log(Array.of(3,4)); //equivalente al primero
console.log(Array.from('DAW'));//Convierte iterables en array
console.log(Array.from(new Set([1,2,3])));

console.log(Array.from({length:4},(_,i) => i* i)) //En donde esta el length es lo equivalente a que se haya creado un array de 4 posiciones, como si hubiera puesto [1,2,3,4]