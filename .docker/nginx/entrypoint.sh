#!/bin/bash
set -e

# Inserindo renovação automática na crontab
echo "0 0 * * 0 certbot renew --quiet --post-hook 'nginx -s reload' >> /var/log/certbot_renewal.log 2>&1" | crontab -

# Iniciar o nginx em primeiro plano
nginx -g 'daemon off;'

