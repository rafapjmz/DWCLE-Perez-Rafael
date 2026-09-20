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

// EJERCICIOS
//   a) ¿Qué imprime este código y por qué?
// El setTimeout viene a ser una función que programa la ejecución de una función tras cierto tiempo, en este caso no le tenemos puesto tiempo pero se ejecutará una vez el bucle del for termine, es decir los console.log no saldrán hasta el final, Aquí ya entra el como varía segun es var o let, al ser var y tener ámbito de función no crea una variable en cada iteración, solo existe una compartida, una vez termina el bucle el valor de i es 3. Sin embargo, al ser let y tener ámbito de bloque, crea una variable diferente en cada iteración, por lo que una vez se ejecuta el settimeout, j tiene el valor que tenía en esa iteración.
for (var i = 0; i < 3; i++) setTimeout(() => console.log('var', i));
for (let j = 0; j < 3; j++) setTimeout(() => console.log('let', j));

//   b) ¿Cómo harías un "deep freeze" que congele también los objetos anidados?

//Junto a un poco de ayuda del claude
//Crearíamos una función que le entre por parámetros un objeto.
function deepFreeze(object){
  Object.freeze(object); //Aquí congelaría de primeras el objeto, pero claro, el interior de ese objeto aún se podría modificar, tendríamos que ir dentro de este objeto congelando cada uno de ellos

  //Por lo tanto, con el .keys obtenemos un array de texto de esas propiedades del objeto, si por ejemplo tenemos usuario con nombre,edad y ciudad, nos da un array de estas 3 ultimas.
  const propiedades = Object.keys(object);
  //Hacemos un for each pero de javascript 
  for(const propiedad of propiedades){
    //Metemos cada propiedad en una constante para ir checkeando cada una y ver si esta congelada
    const valor = object[propiedad];

    if(valor && typeof valor === 'object' && !Object.isFrozen(valor)){
      deepFreeze(valor); //Volvemos a llamar a la misma función y congelamos nuevamente, recursividad
    }
  }

  return Object.freeze(object); //Devolvemos el objeto congelado

}

/**
 * Otra manera:
 * const frozen = {name: 'Paco el chocolatero', address: {city: 'Córdoba', street: 'Calle Lorenzo'}};

function deepFreeze(object) { //para llevarlo a la práctica he tenido que hacer lluvia de ideas con Claudia.
    Object.freeze(object);
    const claves = Object.keys(object);
    for (let i = 0; i < claves.length; i++) {
        const clave = claves[i];
        const valor = object[clave];
        if (typeof valor === 'object' && valor !== null) {
            deepFreeze(valor);
        }
    }
    return object;
}
 */


//Creamos un usuario con freeze, el congelado no es profundo
const usuario = Object.freeze ({name: 'Luis', address: {city:'Malaga', street: {number:2, PC: 29670}}});

//Le cambiamos el nombre a la ciudad y veremos que si nos deja y sale cordoba
usuario.address.city = 'Cordoba';
console.log(usuario.address.city);

//Creamos un usuario con deepfreeze, no podría cambiar la ciudad o la calle..., ya que es profundo.
const usuarioFreeze = deepFreeze({name: 'Luis', address: {city:'Malaga', street: {number:2, PC: 29670}}});

//Tenemos que hacer un trycatch porque sino explota ya que hemos hecho que no nos deje
try {
  usuarioFreeze.address.city = 'Cordoba';
} catch (error) {
  console.log('ERROR has intentado hacer un cambio profundo', error.message);
}
console.log(usuarioFreeze.address.city); //Malaga
