#!/usr/bin/env sh
# Requisito de Elasticsearch (SonarQube) en Linux. Ejecutar UNA vez en el host con sudo:
#   sudo sh apps/sonarqube/init.sh
sysctl -w vm.max_map_count=262144
sysctl -w fs.file-max=131072
