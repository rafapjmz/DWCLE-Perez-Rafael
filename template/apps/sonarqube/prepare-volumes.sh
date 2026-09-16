#!/usr/bin/env sh
# Crea las carpetas que Docker montará como volúmenes (están en .gitignore)
mkdir -p ./docker/sonarqube/data ./docker/sonarqube/extensions ./docker/sonarqube/logs ./docker/postgresql/data
