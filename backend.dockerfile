FROM php:7
RUN apt-get update -y && apt-get install -y openssl zip unzip git
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN docker-php-ext-install pdo mbstring
WORKDIR /app/src/backend
COPY ./src/backend/ShowManager ./
RUN composer install

RUN php artisan config:cache

CMD php artisan serve --host=0.0.0.0 --port=8000