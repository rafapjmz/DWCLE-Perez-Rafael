import { greet } from './commons/greeting';

// Punto de entrada de la aplicación. Aquí solo se conecta el DOM con la lógica.
const app = document.querySelector<HTMLElement>('#app');

if (!app) {
  throw new Error('No existe el contenedor #app en index.html');
}

app.innerHTML = `
  <h1>${greet('DWCLE')}</h1>
  <p>Plantilla TypeScript + Vite lista. Edita <code>src/app.ts</code> para empezar.</p>
  <p><small>Modo: ${import.meta.env.MODE}</small></p>
`;
