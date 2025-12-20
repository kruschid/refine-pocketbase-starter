[![Discord](https://img.shields.io/badge/Chat%20on-Discord-%235865f2)](https://discord.gg/BCGmvSSJBk)

# Refine PocketBase Starter

Packages your full-stack tool/app/product in a single Docker image (`~33 MB`) and stores it in a centralized location (GitHub Container Registry by default), making it easily accessible for distribution across different environments.

## Why

- [**Refine**](https://refine.dev/) provides business logic for your UI elements, supporting CRUD functions, security, state management, and live updates.
- [**PocketBase**](https://pocketbase.io/) is a powerful combination of a database, real-time API, authentication with a dynamic authorization system, file storage, backup management, and an admin dashboard with robust user management.
- This template combines these two open-source tools, saving you days of setting up dependencies, build-scripts, pipelines, and distribution, allowing you to start shipping features right away.

## Features

- **Frontend**

  - [Refine](https://refine.dev/) (React meta-framework for CRUD-heavy web applications)
  - Refine providers for PocketBase using the [refine-pocketbase](https://github.com/kruschid/refine-pocketbase) library and the [PocketBase JS SDK](https://github.com/pocketbase/js-sdk)
  - Mantine UI components specifically tailored for Refine: [refine-mantine](https://github.com/kruschid/refine-mantine)
    - Alternatively: use any UI framework you like by using Refine hooks in headless mode
  - Real-time updates enabled
  - Built-in authentication features (login, registration flow, and auth providers)
  - Pre-installed [tabler icons](https://tabler.io/icons)
  - E2E tests with Playwright (optional)
  - Preconfigured TypeScript type generation from the database schema with [pocketbase-typegen](https://github.com/patmood/pocketbase-typegen) (optional)
  - Vite, TypeScript, Biome

- **Backend (Pocketbase)**

  - SQLite database and CRUD API
  - Admin dashboard
  - Authentication with passwords, OTP, OAuth2, MFA, and users impersonation
  - Authorization with custom roles and rules
  - File storage (local file system or S3 storage)
  - Pre-configured email testing with [Inbucket webmail server](https://github.com/inbucket/inbucket)
  - [Custom routes, middlewares and event hooks with JavaScript](https://pocketbase.io/docs/js-overview/)

- **Distribution**
  - Preconfigured GitHub Actions pipeline (build, test, container registry push)
  - Frontend & backend in a single Docker image
  - Stores Docker images in GitHub Container Registry by default
  - Easy self-hosting on VPS (Hetzner, Linode, Fly.io, etc.) or using your own hardware (e.g., Raspberry Pi)
  - Ready for cloud deployment via [Google Cloud Run](https://cloud.google.com/run?hl=en)

## Quickstart

To begin developing your features, you need to start PocketBase, Inbucket, and the frontend. Below are the commands to start the necessary services, along with their URLs and default credentials.

### Pocketbase

PocketBase serves as the backend and can be started using the following Docker Compose command:

```sh
cd pocketbase
docker compose up
```

### Admin Dashboard

The admin dashboard is part of PocketBase and can be accessed through a web browser using the following credentials:

- **URL:** [http://localhost:8090/\_](http://localhost:8090/_)
- **User:** admin@pocketbase.local
- **Password:** 1234567890

> [!IMPORTANT]
> The default credentials can be changed in the admin dashboard to maintain security.

### Inbucket

Inbucket is a local email service that can be used for testing purposes. For example, you can send password recovery emails or OTP codes from PocketBase to Inbucket. PocketBase is preconfigured to use Inbucket, so no additional setup is required. It starts automatically with PocketBase.

- **URL:** [http://localhost:9000](http://localhost:9000)

This setup allows you to easily test email functionalities without needing an external email service.

### Frontend

The frontend is a React application with basic dependencies such as Refine, ESLint, and Vite. You can start the development server with the following command:

```sh
cd app
npm run dev # starts dev server on port 8080
```

- **URL:** [http://localhost:8080](http://localhost:8080)
- **User:** user@pocketbase.local
- **Password:** 1234567890

This will launch the application, making it accessible in your browser at the specified URL. Ensure that all necessary dependencies are installed before running the development server.

> [!IMPORTANT]
> The default credentials can be changed in the admin dashboard to maintain security.

Now you are all set up to add more frontend dependencies and start turning your app ideas into code. If you're interested in learning how to deploy your application and make your features available to users, continue reading the distribution section.

```sh
cd app
npm run codegen           # updates generated database schema types
npx playwright test --ui  # runs playwright tests with gui
```

## Database Migrations

Database migrations are a way to manage versions of your database schema. They allow you to update your database schema in production while preserving existing data. Migrations are generated automatically whenever the database schema is modified using the PocketBase dashboard. However, you also have the option to create migrations manually. Since migrations are part of the distribution process, they must be included in your git commits to ensure they are part of the final Docker image.

> [!TIP]
> Remember to regularly commit and test migration changes to prevent issues during deployment.

## Distribution

The default distribution method is via GitHub Container Registry. Other container registries (Dockerhub, gcr.io, etc.) can also be used, but they require minor adjustments to the GitHub Action workflow file.

A GitHub workflow will build a single Docker image that can be deployed with a single command (`docker compose up -d`) on your server or using tools like Portainer and Docker, etc.

> **Note:**  
> If you prefer not to manage your own server, you can opt-out of the GitHub Actions workflow by deleting the `.github/workflows/build.yml` file and switching to Google Cloud Run or similar cloud hosting services.
>
> You can find [deployment instructions for Google Cloud Run here](https://github.com/rodydavis/pocketbase-cloudrun), and here is the corresponding [discussion thread](https://github.com/pocketbase/pocketbase/discussions/5054).

This approach allows for flexible distribution options depending on your infrastructure preferences and requirements.

### Publishing

You can build and push a new Docker image of a new version by creating a git tag following semver-like syntax:

```sh
git tag 1.0.0     # creates a tag for the latest commit
git push --tags   # pushes the created tag to github
```

Only tags that match the `[0-9]+.[0-9]+.[0-9]+` format will trigger the build workflow. However, if you want to support more complex version patterns, you can modify the format by editing the `.github/workflows/build.yml` file.

This flexibility allows you to adjust the versioning scheme to fit your project's needs.

> [!NOTE]
> All Docker images will be pushed to the GitHub Container Registry associated with your Git repository.
>
> This ensures that your images are stored in a centralized location, making them easily accessible for deployment across different environments.

Pushing a new tag will trigger a workflow that builds a Docker image, which is then pushed to the GitHub Container Registry by default.

The default architecture is `linux/amd64`. Modify the `.github/workflows/build.yml` file if you want to self-host the Docker image on a Raspberry Pi or deploy to a server with an ARM architecture.

Building multiple architectures (e.g., `linux/amd64,linux/arm64,linux/arm/v7`) simultaneously is also possible. Considerations for architecture and infrastructure are important for ensuring compatibility with your environment.

For deploying PocketBase on a Synology NAS, refer to this guide: [How to Install PocketBase on Your Synology NAS](https://rumjahn.com/how-to-install-pocketbase-on-your-synology-nas-step-by-step-guide/).

### Sample Docker Compose File

Deploying a Docker image on your server is straightforward. The fastest method is to create a `docker-compose.yaml` file on your server with the following content, describing your service:

```yaml
name: refine-pocketbase-starter

services:
  refine-pocketbase-starter:
    image: ghcr.io/kruschid/refine-pocketbase-starter:latest # replace with your image
    restart: always
    ports:
      - 8090:8090
    volumes:
      - ./volumes/pb_data:/pb/pb_data
```

After that, simply navigate to the file’s location in your terminal and enter:

```sh
docker compose up -d
```

This will start all services defined in the `docker-compose.yaml` file and keep them running in the background, even after you disconnect from your server. In this example there is only one service `refine-pocketbase-starter`.

Your GitHub repository might be private. In that case, you might see an unauthorized error in your terminal. Read the next section to learn how to generate a GitHub token to download from your private container registry.

#### Generate a Personal Access Token (required for private repositories)

The following steps are required to pull Docker images from a private GitHub container registry.

- Go to GitHub and log in to your account.
- Navigate to `Settings` > `Developer settings` > `Personal access tokens`.
- Click on `Generate new token`.
- Set a note for the token, like `GitHub Container Registry`.
- Set the expiration for the token as per your requirement.
- Under Select scopes, ensure you check `read:packages`.
- Click Generate token and copy the token somewhere safe, as you won't be able to view it again.

After completing these steps, connect to your server and type the following command in the terminal. You will be asked for a `Username` and `Password`. The `Username` is your GitHub username, and for the `Password`, you need to use the GitHub token you just created.

```sh
docker login ghcr.io/kruschid # replace with your namespace
Username: kruschid            # replace with your github username
Password: *****               # replace with your github token
```

### Pocketbase Settings

After the initial deployment, you will need to perform a few manual steps to improve security and prevent data loss.

1. Change the default admin credentials to a secure email/password combination.
2. Update the SMTP settings to use our production email server/service (AWS SES, etc.).
3. Enable scheduled backups in the admin dashboard by using a remote bucket (S3, Backblaze, etc.).

More details can be found on the pocketbase ["Going to production"](https://pocketbase.io/docs/going-to-production/) page

### Automatic HTTPS

You can extend your Docker Compose file with [caddy-docker-proxy](https://github.com/lucaslorentz/caddy-docker-proxy?tab=readme-ov-file) to serve your app over HTTPS with a certificate for your domain.

[Caddy](https://caddyserver.com/) is a web server that supports [automatic provisioning of TLS certificates](https://caddyserver.com/docs/automatic-https). By using caddy-docker-proxy, Caddy can be configured using labels. The `docker-compose.yaml` file below serves the app via the fictional domain `refine-pocketbase-starter.com`.

Make sure to replace the example domain with your actual domain and configure the necessary DNS settings to enable HTTPS for your application.

```yaml
name: refine-pocketbase-starter

services:
  refine-pocketbase-starter:
    image: ghcr.io/kruschid/refine-pocketbase-starter:latest # replace with your image
    restart: always
    networks:
      - caddy
    volumes:
      - ./volumes/pb_data:/pb/pb_data
    labels:
      caddy: refine-pocketbase-starter.com # replace with your domain
      caddy.reverse_proxy: "{{upstreams 8090}}"
    healthcheck: # optional but recommended
      test: wget --no-verbose --tries=1 --spider http://localhost:8090/api/health || exit 1
      interval: 5s
      timeout: 5s
      retries: 5

  caddy:
    image: lucaslorentz/caddy-docker-proxy:2.8-alpine
    ports:
      - 80:80
      - 443:443
    networks:
      - caddy
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./volumes/caddy:/data
    restart: unless-stopped
    environment:
      - CADDY_INGRESS_NETWORKS=caddy
```

## Playwrigt Reports

Playwright reports are uploaded in GitHub Actions using the [`actions/upload-artifact`](https://github.com/actions/upload-artifact) action. These reports include trace files with screenshots, which can be helpful for debugging failing tests. This is especially useful because tests running in the CI pipeline may behave differently than they do on a local machine. The Playwright report can be downloaded from GitHub by navigating to **Actions**, selecting the relevant workflow run, and then opening the **Artifacts** section.


## How to Contribute

- leave a star ⭐
- report a bug 🐞
- open a pull request 🏗️
- help others ❤️
- [buy me a coffee ☕](https://www.buymeacoffee.com/kruschid)

<a href="https://www.buymeacoffee.com/kruschid" target="_blank"><img width="200px" src="https://cdn.buymeacoffee.com/buttons/v2/default-orange.png" alt="Buy Me A Coffee" ></a>
