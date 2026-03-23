FROM php:8.4-fpm

ENV TZ=America/Sao_Paulo
WORKDIR /var/www/html

# Sys dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    zip \
    curl \
    cron \
    supervisor \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    libonig-dev \
    libxml2-dev \
    libpq-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install \
        pdo \
        pdo_pgsql \
        mbstring \
        zip \
        exif \
        pcntl \
        bcmath \
        gd \
        opcache \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Redis (Horizon depende)
RUN pecl install redis \
    && docker-php-ext-enable redis

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Configs
COPY .docker/conf/supervisor/supervisord.conf /etc/supervisor/supervisord.conf
COPY .docker/conf/supervisor/horizon.conf /etc/supervisor/conf.d/horizon.conf
COPY .docker/conf/supervisor/scheduler.conf /etc/supervisor/conf.d/scheduler.conf
COPY .docker/conf/artisan.sh /usr/bin/artisan
COPY .docker/conf/quickstart.sh /usr/bin/quickstart

# Laravel standard permissions
RUN chown -R www-data:www-data /var/www \
    && chmod -R 775 /var/www \
    && chmod +x /usr/bin/artisan \
    && chmod +x /usr/bin/quickstart

EXPOSE 9000

CMD ["/bin/quickstart"]
