# Infrastructure plans

## PlanetScale database
See basic tutorial for Symfony: https://planetscale.com/docs/tutorials/connect-symfony-app

We'll need to prevent foreign key generation in Doctrine Migrations using an event listener, like so: https://stackoverflow.com/questions/57455725/how-to-disable-foreign-key-constraint-when-using-doctrine-generate-migration

We'll also want to enable safe-migrations in Planetscale, refer to the guides below:
- https://planetscale.com/docs/concepts/safe-migrations
- https://planetscale.com/docs/concepts/deploy-requests

The CI/CD pipelines will need to make use of the features in the guides above, and to deploy new version of the codebase once those deploy requests go through.

## Hosting

Probably going to go with the DO App Platform to get:
- automatic and seamless deploys for the core web app;
- cheap & easy scaling for crawling background workers (perhaps with a serverless function to scale them like in Koalati)

Overall, all containers/instances would run the same monolithic Symfony app, they would simply run different tasks within it:
- one runs the web app as a web server;
- the other runs `bin/console messenger:consume`

Both can share the same project-wide environment variables.

## File storage

I guess just DO Spaces with their built-in CDN?

## Secret management

Symfony secrets ✨

