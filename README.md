# DWCLE-clase

Repositorio con el código enseñado en clase de **Desarrollo Web en Entorno Cliente**, curso 2026/27.

## Plantilla de proyecto

En [`template/`](template/) está el esqueleto **TypeScript + Vite** con el que arrancan todas las prácticas.
Incluye compilación con Vite, TypeScript en modo estricto, ESLint, Prettier, tests con Vitest, hooks de git con
commits convencionales, integración continua y una API falsa con json-server.

Su [README](template/README.md) es la guía completa: requisitos, cómo crear tu proyecto a partir de la
plantilla, estructura de carpetas, scripts, flujo de trabajo, tests, commits y problemas frecuentes. En
[`template/doc/uml/`](template/doc/uml/) está el diagrama de la aplicación que construiremos en clase.

Resumen para empezar:

```bash
npx degit politecnicoDAW-2026/DWCLE-clase/template mi-proyecto
cd mi-proyecto
git init && npm install
npm run dev
```
