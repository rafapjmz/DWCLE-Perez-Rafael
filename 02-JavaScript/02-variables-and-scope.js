/**
 * 02 · VARIABLES Y ÁMBITO (scope)
 *
 * Tres formas de declarar, de peor a mejor:
 *   (nada)  → variable global implícita. NUNCA. En modo estricto (módulos) es un error.
 *   var     → ámbito de FUNCIÓN, con hoisting. Solo en código antiguo. Lo ponemos al principio del scope si no hay función * del función
 *   let     → ámbito de BLOQUE, se puede reasignar.
 *   const   → ámbito de BLOQUE, no se puede reasignar. POR DEFECTO usa const.
 */

// 1. Global implícita: en un módulo salta ReferenceError. Lo capturamos para verlo.
try {
  name = 'Enrique'; // sin let/const/var
} catch (error) {
  console.log('1. sin declarar →', error.name, '→', error.message);
}

// 2. var: hoisting. La DECLARACIÓN sube al principio de la función, la asignación no.
function withVar() {
  console.log('2. var antes de asignar →', age); // undefined, no error
  var age = 30;
  if (true) {
    var age = 40; // ¡es la MISMA variable! var no entiende de bloques
  }
  console.log('2. var después del if →', age); // 40
}
withVar();
// El motor lo lee así:      var age;  console.log(age);  age = 30;  age = 40;

// 3. let y const: ámbito de bloque y "zona muerta temporal" (TDZ) antes de la declaración
function withLet() {
  try {
    console.log(x); // ReferenceError: Cannot access 'x' before initialization
  } catch (error) {
    console.log('3. let antes de declarar →', error.message);
  }
  let x = 10;
  x = 14; // reasignar está permitido con let
  if (true) {
    let x = 50; // OTRA variable, solo existe dentro del bloque (shadowing)
    console.log('3. x dentro del if →', x); // 50
  }
  console.log('3. x fuera del if →', x); // 14
}
withLet();

// 4. const impide REASIGNAR, no impide MODIFICAR el contenido de objetos y arrays
const numbers = [1, 2, 3]; //Arraylist 
numbers.push(4); // Permitido: modificar el contenido del array
numbers[10]=99;

try {
  numbers = [2]; // Error: Assignment to constant variable, esto es como poner un const x = new Array(); x[0]=2;
  } catch (error) {
  console.log('4. const reasignar →', error.message);
}

// Cuando ponemos corchetes es un constructor
console.log(numbers); // [1, 2, 3, 4]
console.log("numbers: ", numbers);

const person = { name: 'Javi', age: 23 };
person.age = 21; // Permitido: modificar el contenido del objeto

console.log(person);

//Javascript es estatico, para ahorrar, java no funciona asi
//Tengo una clase object que vuelvo a congelar, no puedo modificarla, pero si puedo modificar el contenido de la clase
const frozen = Object.freeze({ name: 'Javi', address: {city: 'Málaga'} });

try {
  frozen.name = 'Pepe'; // No hace nada, no lanza error
} catch (error) {
  console.log('4. const frozen →', error.message);
}

frozen.address.city = 'Sevilla'; // Permitido: modificar el contenido del objeto anidado
console.log('4, freeze es superficial ', frozen.address.city); 

const city = Object.freeze({ city: 'Badajoz' });
const frozenWithCity = Object.freeze({ name: 'Pepe', address: city });
console.log('4. freeze con objeto anidado →', frozenWithCity.address.city);