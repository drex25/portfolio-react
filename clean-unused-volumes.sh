#!/bin/bash

echo "Buscando volúmenes que no sean 'caddy_data' ni 'caddy_config'..."

# Obtener lista de volúmenes excluyendo los de Caddy
VOLUMES_TO_DELETE=$(docker volume ls -q | grep -v -E '^caddy_data$|^caddy_config$')

if [ -z "$VOLUMES_TO_DELETE" ]; then
  echo "No hay volúmenes para eliminar."
else
  echo "Los siguientes volúmenes serán eliminados:"
  echo "$VOLUMES_TO_DELETE"
  echo
  read -p "¿Confirmás que querés eliminarlos? (y/n): " CONFIRM
  if [[ "$CONFIRM" == "y" || "$CONFIRM" == "Y" ]]; then
    echo "$VOLUMES_TO_DELETE" | xargs docker volume rm
    echo "Volúmenes eliminados correctamente."
  else
    echo "Operación cancelada."
  fi
fi
