#!/bin/bash

set -e

if [ ! -d "/var/www/html/vendor" ]; then
    /bin/echo "<pre>" > /var/www/html/public/install.html

    composer self-update 2>> /var/www/html/public/install.html
    composer install -d /var/www/html  2>> /var/www/html/public/install.html 

    /bin/rm -f /var/www/html/public/install.html

fi

sleep 5

php -f /var/www/html/artisan optimize

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
source ~/.bashrc
nvm install --lts

supervisord -c /etc/supervisor/supervisord.conf
