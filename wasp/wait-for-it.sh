#!/bin/sh
set -e

host="$1"
shift
cmd="$@"

until mysqladmin ping -h"$host" --silent; do
  echo "Esperando a que MySQL esté listo..."
  sleep 2
done

echo "MySQL está listo, ejecutando la aplicación"
exec $cmd
