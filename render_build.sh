#!/usr/bin/env bash
# exit on error
set -o errexit

pipenv install

cd src/
pipenv run upgrade

cd front/
npm install
npm run build
