# Refine PocketBase Starter

Your full stack SaaS/Tool/App/Product in one single Docker image.

## Why Refine PocketBase Starter

-

## Features

- frontend
  - vite, typescript, eslint
  - Refine (React meta-framework for CRUD-heavy web applications)
  - headless, use any UI-Framework you like
  - real-time updates enabled
  - typescript types generation from database schema
  - typesafe routes
  - e2e tests with playwright
- backend
  - pocketbase Open Source backend
  - sqlite database and crud api
  - admin dashboard
  - authentication supports passwords, otp, and oauth providers
  - authorization with custom roles and rules
  - file storage
- deployment
  - preconfigured github actions pipeline (build, test, container registry push)
  - frontend & backend in one single docker image
  - stores docker images in github container registry by default
  - easy self-hosting on VPS (hetzner, linode, fly.io, etc..) or using your own hardware (i.e. Raspberry Pi)
  - ready for cloud deployment via Goole [Cloud Run](https://cloud.google.com/run?hl=en)

## Development

```sh
cd pocketbase
docker compose up
```

### Admin Dashboard

Url: http://localhost:8090/\_
User: admin@pocketbase.local
Password: 1234567890

### Inbucket

Url: http://localhost:9000

### Frontend

```sh
cd app
npm run dev
```

Url: http://localhost:8080

### Database Migrations

- Migration are generated automatically whener the db schema is modified using pocketbase dashboard.
- However, creating migrations manually is possibl as well
- Migrations are part of the deployment and thus must be added to your git commits to be included in the final docker image.

## Deployment

Currently two options were tested and don't require any additional configuration: Self-hosting and Google Cloud Run.

### Self-hosting

For self-hosting you can build and push a docker image to github packages by creating a tag following semver-like syntax:

```sh
git tag 1.0.0
git push --tags
```

Only tags that have a `[0-9]+.[0-9]+.[0-9]+` format are suported by default. You can modify the format by editing `.github/workflows/build.yml`

- Pushing a new tag will trigger a docker build. The default architecture is `linux/amd64`.
- Please modify `.github/workflows/build.yml` if you want to self-host the docker image on your Raspberry Pi or deploy to a Server with ARM archtecture.
- Building multiple architectures (i.e. `linux/amd64,linux/arm64,linux/arm/v7`) at once is possible as well.

### Cloud Run

https://github.com/GoogleCloudPlatform/cloud-run-button

[![Run on Google Cloud](https://deploy.cloud.run/button.svg)](https://deploy.cloud.run)
