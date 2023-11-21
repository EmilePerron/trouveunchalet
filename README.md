# Vacation rental search engine

A project that aims to help people easily find vacation rentals of all types
(cottages, campsites, etc.) with little to no effort required.

The idea is simple: 
- We crawl thousands of websites and booking pages.
- Users tell us what they're looking for.
- We find matching locations with availabilities, and show them to the users.

We don't manage booking or any other parts of the process: we just help users
find available rentals that match their criteria and availabilities.

## Setting up the project

1. Clone the repository.
2. Install dependencies with Composer:
	```bash
	composer install
	```
3. Install the browser drivers:
	```bash
	vendor/bin/bdi detect drivers
	```

## Data sources

This project indexes listings from the following sites:

- [x] [Chalets à Louer](https://www.chaletsalouer.com/)
- [x] [Le Vertendre](https://levertendre.com)
- [x] [WeChalet](https://wechalet.com/)
- [ ] [NatureNature](https://www.naturenature.ca/)
- [ ] [Airbnb](https://airbnb.com/)

### Generic data source drivers

- [x] [Guesty](http://guesty.com/)

## Contributing

See [CONTRIBUTING.md](/CONTRIBUTING.md)

## Troubleshooting

### Trusting TLS certificate

On MacOS:

```sh
docker cp $(docker compose ps -q app):/root/.local/share/caddy/pki/authorities/local/root.crt /tmp/root.crt && sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain /tmp/root.crt
```
