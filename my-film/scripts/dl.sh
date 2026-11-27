#!/bin/bash
# usage: dl.sh <dest> <url>   (télécharge un fichier généré par Higgsfield)
curl -sS --retry 3 -o "$1" "$2" && echo "ok $1"
