# Auditoría y actualización de la plantilla · septiembre 2026

Punto de partida: `DWCLE-Template` tal como quedó en 2024 y se reutilizó sin cambios en 2025.

## Problemas encontrados

| #   | Problema                                                                                                                                                                                            | Efecto                                                                            | Solución aplicada                                                                                     |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| 1   | El hook `pre-commit` ejecutaba `npm run lint`, script que no existía, y después `git add .`                                                                                                         | Todos los commits fallaban; el `git add .` colaba ficheros no revisados           | Hook reescrito con `lint-staged` (ESLint + Prettier solo sobre lo que se sube)                        |
| 2   | Husky 8 con la cabecera `_/husky.sh`, obsoleta                                                                                                                                                      | Deja de funcionar en Husky 10                                                     | Husky 9 con hooks planos y `prepare: husky`                                                           |
| 3   | Dependencias de 2023: Vite 4, TypeScript 4.9, Prettier 2, commitlint 17, `@types/node` 18, json-server 0.17                                                                                         | Avisos de seguridad en `npm install`, sin soporte para Node 22/24                 | Vite 8, TypeScript 5.9, Prettier 3, commitlint 21, `@types/node` 24, json-server 1                    |
| 4   | `tsconfig`: `strict: false`, `include: ["src/*.ts"]` sin subcarpetas, `moduleResolution: Node`                                                                                                      | Los ficheros en `src/models` etc. no se comprobaban; sin errores de tipo en clase | `strict: true`, `src/**/*.ts`, `moduleResolution: bundler`, tipos de Vite                             |
| 5   | `vite.config.ts` sin `defineConfig`, `assetInfo.name` (API retirada en Rollup 4), `input: "src/index.html"` con `root: "src"`                                                                       | Sin autocompletado; rompe con Rollup 4                                            | `defineConfig` tipado, `assetInfo.names`, entrada implícita por `root`                                |
| 6   | `start:dev` era `vite ./src` con `root: "src"` también en la config                                                                                                                                 | Raíz definida dos veces                                                           | `dev: vite`                                                                                           |
| 7   | `package.json` sin `"type": "module"`                                                                                                                                                               | Vite carga la configuración como CommonJS y avisa de deprecación                  | Añadido, junto con `engines` y `private`                                                              |
| 8   | `index.html`: `<script>` fuera de `<body>`, `lang="en"`, meta `X-UA-Compatible` obsoleta, título "Document"                                                                                         | HTML inválido y poco ejemplar para alumnos                                        | Reescrito                                                                                             |
| 9   | `.gitignore` solo con `node_modules`                                                                                                                                                                | `dist/`, `coverage/`, `.env` y volúmenes de SonarQube acababan en git             | Ampliado                                                                                              |
| 10  | Workflow de PlantUML con `actions/checkout@v2` (Node 12, retirado), acción de terceros sin mantener y sin `permissions: contents: write`                                                            | El flujo falla al hacer commit                                                    | Reescrito con Docker `plantuml/plantuml` y `git-auto-commit-action@v5`                                |
| 11  | Sin ESLint, sin configuración de Prettier, sin tests, sin CI                                                                                                                                        | Sin red de seguridad para el alumnado                                             | ESLint 10 flat config, `.prettierrc`, Vitest con jsdom y un test de ejemplo, workflow de CI           |
| 12  | `db.json` sin `id` y con una fecha malformada (`01/2/1949`)                                                                                                                                         | json-server 1 necesita `id` para rutas por elemento; fechas no parseables         | `id` añadido a cada registro y fechas en ISO 8601                                                     |
| 13  | `apps/sonarqube`: README con scripts que no existían (`sonar:up`), puerto 9000 en la doc y 3300 en compose, `sonar.login` retirado, `version` obsoleta en compose, scripts de lint sin dependencias | Guía inservible tal cual                                                          | Scripts `up`/`down`/`logs`, doc coherente, `sonar.token`, postgres fijado a 16, `sonarqube-scanner` 5 |
| 14  | Diagrama: `costructor`, `PatientNotfoundException`, `value: any` en un método genérico, `ForeignPatient<T>` sin sentido, `add(): patient`                                                           | Erratas que el alumnado copia                                                     | Corregido y PNG regenerado                                                                            |
| 15  | La carpeta traía su propio `.git` apuntando a `PolitecnicoDAW-2024/DWCLE-Template`                                                                                                                  | Dentro de DWCLE-clase se convertiría en un submódulo roto                         | `.git` anidado eliminado; el historial sigue en GitHub y en `anteriores/2024` y `anteriores/2025`     |

## Decisiones

- **TypeScript 5.9 y no 7**: typescript-eslint solo soporta TypeScript hasta la 6.0. TypeScript 7 es la
  reescritura nativa y aún no encaja con el resto de la cadena.
- **Node 22.12 como mínimo**: es lo que exigen Vite 8 y Vitest 5. Node 20 terminó su soporte en abril de 2026.
- **`bundle.js` sin hash**: se mantiene el nombre fijo del original para que el alumnado localice el resultado
  del build a simple vista. En un proyecto real se usaría `[name]-[hash].js` para la caché.
- **`erasableSyntaxOnly` desactivado**: prohibiría `enum` y las propiedades de constructor
  (`constructor(private x: T)`), que se usan en clase.
- **Un solo `tsconfig.json`**: la plantilla oficial de Vite separa la configuración de `vite.config.ts`
  en un segundo fichero; aquí se prioriza que el alumnado entienda un único fichero.

## Verificación realizada

- `npm install` limpio en Node 24.8 / npm 11.6, sin avisos.
- `npm run check` (lint, formato, tipos y 2 tests) y `npm run build` en verde; `dist/` con `index.html`,
  `bundle.js` y `assets/styles/index.css`.
- `npm run dev` y `npm run preview` sirven la página sin avisos en consola.
- `npm run api`: `GET /patients` y `GET /retired/2` responden.
- Hooks probados en un repositorio temporal: mensaje no convencional rechazado, mensaje correcto aceptado con
  lint-staged, y un fichero con `any` bloquea el commit.
- `npm run uml` regenera `example-hospital.png` con Docker.
