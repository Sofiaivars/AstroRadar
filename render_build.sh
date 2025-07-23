#!/usr/bin/env bash
set -o errexit

cd "$(dirname "$0")"

pipenv install --deploy

export FLASK_APP=src/app.py

pipenv run flask db upgrade --directory src/migrations

cd src/front/
npm install
npm run build