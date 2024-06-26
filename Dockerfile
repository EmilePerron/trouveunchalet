#syntax=docker/dockerfile:1.4
# Adapted from https://github.com/dunglas/symfony-docker

ARG SUPERVISOR_BASE_STAGE=app_php


# STAGE app_php
# Prod image
FROM php:8.2-fpm-alpine AS app_php

ENV APP_ENV=prod

WORKDIR /srv/app

# php extensions installer: https://github.com/mlocati/docker-php-extension-installer
COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/

# persistent / runtime deps
RUN apk add --no-cache \
	acl \
	fcgi \
	file \
	gettext \
	git \
	;

RUN set -eux; \
	install-php-extensions \
	xsl \
	intl \
	zip \
	apcu \
	opcache \
	mysqli \
	pdo_mysql \
	excimer \
	;

RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"
COPY docker/php/conf.d/app.ini $PHP_INI_DIR/conf.d/
COPY docker/php/conf.d/app.prod.ini $PHP_INI_DIR/conf.d/

COPY docker/php/php-fpm.d/zz-docker.conf /usr/local/etc/php-fpm.d/zz-docker.conf
RUN mkdir -p /var/run/php

COPY docker/php/docker-healthcheck.sh /usr/local/bin/docker-healthcheck
RUN chmod +x /usr/local/bin/docker-healthcheck

HEALTHCHECK --interval=10s --timeout=3s --retries=3 CMD ["docker-healthcheck"]

COPY docker/php/docker-entrypoint.sh /usr/local/bin/docker-entrypoint
RUN chmod +x /usr/local/bin/docker-entrypoint

ENTRYPOINT ["docker-entrypoint"]
CMD ["php-fpm"]

# https://getcomposer.org/doc/03-cli.md#composer-allow-superuser
ENV COMPOSER_ALLOW_SUPERUSER=1
ENV PATH="${PATH}:/root/.composer/vendor/bin"

COPY --from=composer/composer:2-bin /composer /usr/bin/composer

# prevent the reinstallation of vendors at every changes in the source code
COPY composer.* symfony.* ./
RUN set -eux; \
	composer install --prefer-dist --no-dev --no-autoloader --no-scripts --no-progress; \
	composer clear-cache

# Install browser automation dependencies
RUN echo "http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories; \
	apk update; \
	apk add firefox; \
	vendor/bin/bdi detect drivers

# copy sources
COPY . .
RUN rm -Rf docker/

RUN set -eux; \
	mkdir -p var/cache var/log; \
	composer dump-autoload --classmap-authoritative --no-dev; \
	composer dump-env prod; \
	composer run-script --no-dev post-install-cmd; \
	chmod +x bin/console; \
	sync

# STAGE app_php_dev
# Dev image
FROM app_php AS app_php_dev

ENV APP_ENV=dev XDEBUG_MODE=off
VOLUME /srv/app/var/

RUN rm $PHP_INI_DIR/conf.d/app.prod.ini; \
	mv "$PHP_INI_DIR/php.ini" "$PHP_INI_DIR/php.ini-production"; \
	mv "$PHP_INI_DIR/php.ini-development" "$PHP_INI_DIR/php.ini"

COPY docker/php/conf.d/app.dev.ini $PHP_INI_DIR/conf.d/

RUN set -eux; \
	install-php-extensions xdebug

RUN rm -f .env.local.php


# STAGE app_supervisor
FROM ${SUPERVISOR_BASE_STAGE:-app_php} AS app_supervisor

RUN apk add --no-cache \
	curl \
	gnupg \
	supervisor \
	;

# Install Caddy
RUN curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /etc/apk/keys/caddy-stable.asc
RUN echo "https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt" >> /etc/apk/repositories
RUN apk add --no-cache caddy

# Copy Caddyfile
COPY docker/caddy/Caddyfile /etc/caddy/Caddyfile

# Use supervisord to run both PHP-FPM and Caddy
COPY docker/php/supervisord.conf /etc/supervisor/supervisord.conf
COPY docker/php/supervisord-messenger-only.conf /etc/supervisor/supervisord-messenger-only.conf

# Expose ports
EXPOSE 80
EXPOSE 443

ENTRYPOINT ["docker-entrypoint"]
CMD ["supervisord", "-c", "/etc/supervisor/supervisord.conf"]
