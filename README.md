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
2. Set up the following environment variables (e.g. in a `env.local` file):
	```bash
	DIGITALOCEAN_SPACES_ENDPOINT=
	DIGITALOCEAN_SPACES_ID=
	DIGITALOCEAN_SPACES_SECRET=
	DIGITALOCEAN_SPACES_BUCKET=
	```
3. Start the project with Docker Composer
	```bash
	docker compose up
	```

## Data sources

This project indexes listings from the following sites:

- [x] [Chalets à Louer](https://www.chaletsalouer.com/)
- [x] [Le Vertendre](https://levertendre.com)
- [x] [WeChalet](https://wechalet.com/)
- [x] [Airbnb](https://airbnb.com/)
- [x] [MonsieurChalets](https://monsieurchalets.com/)
- [ ] [NatureNature](https://www.naturenature.ca/)

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
