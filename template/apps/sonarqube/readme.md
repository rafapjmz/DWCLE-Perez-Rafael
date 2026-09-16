# SonarQube local con Docker

Análisis estático de calidad del proyecto en tu máquina. Es opcional y solo para desarrollo.

## Requisitos

- Docker y Docker Compose.
- En Linux, una sola vez: `sudo sh init.sh` (límites del kernel que necesita Elasticsearch).

## Arrancar y parar

```bash
cd apps/sonarqube
npm install        # instala sonar-scanner
npm run up         # levanta SonarQube + PostgreSQL en http://localhost:3300
npm run logs       # ver el arranque (tarda 1 o 2 minutos la primera vez)
npm run down       # parar
```

Usuario y contraseña iniciales: `admin` / `admin` (te pedirá cambiarla).

## Analizar el proyecto

1. En SonarQube crea un proyecto manual con clave `dwcle-template`.
2. Genera un token en **My Account > Security**.
3. Copia `example.sonar-project.properties` a `sonar-project.properties` y pega el token.
4. Genera la cobertura y lanza el análisis desde la raíz del proyecto:

```bash
npm run test:coverage
npm run sonar:scan
```

5. Recarga el panel de SonarQube: aparecerán bugs, code smells, duplicados y cobertura.

Los datos de SonarQube viven en `docker/` y el fichero con el token en `sonar-project.properties`; ambos están en `.gitignore`.
