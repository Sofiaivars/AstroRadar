#!/usr/bin/env bash
set -o errexit

cd "$(dirname "$0")"

pipenv install --deploy

export FLASK_APP=src/app.py

# Usa el directorio correcto de migraciones (src/migrate)
pipenv run flask db upgrade --directory src/migrate

cd src/front/
npm install
npm run build