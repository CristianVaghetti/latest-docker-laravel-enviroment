FROM nginx:latest

# Copie o arquivo de configuração do Nginx com as configurações do proxy reverso
COPY .docker/nginx/nginx.conf /etc/nginx/nginx.conf

# Instale o Certbot e ferramentas necessárias
RUN apt update && apt install -y certbot python3-certbot-nginx curl cron vim iputils-ping

# Copie o script de entrada
COPY .docker/nginx/entrypoint.sh /entrypoint.sh

# Torne o script de entrada executável
RUN chmod +x /entrypoint.sh

EXPOSE 80

# Defina o script de entrada como o ponto de entrada do contêiner
ENTRYPOINT ["/entrypoint.sh"]

