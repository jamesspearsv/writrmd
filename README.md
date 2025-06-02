# Writr.md

<div align="center" style="display:flex;flex-direction:column;justify-content:center;align-items:center;">
    <img src='./public/writrmd-logo.svg' alt='Writr.md logo' width='180' height='180'/>
    </br>
    <p>Self-hosted markdown blogging powered by Next.js and Docker
    </p>
</div>

## Table of Contents

- [Writr.md](#writrmd)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
    - [Technologies](#technologies)
    - [Features](#features)
  - [Usage](#usage)
    - [Running locally](#running-locally)
    - [Running with Docker](#running-with-docker)

## Description

> Writr.md is a blogging platform powered by Markdown, Next.js, and Postgres!

### Technologies

- [Next.js](https://nextjs.org/) - React framework for building high-quality web applications
- [Docker](https://www.docker.com/) - Containerized deployment tool
- [react-markdown](https://github.com/remarkjs/react-markdown) - Markdown component for React
- [open-props](https://open-props.style/) - CSS design tokens for consistent design and styles
- [react-feather](https://github.com/feathericons/react-feather) - React component library for Feather icons
- [clsx](https://github.com/lukeed/clsx) - A tiny (239B) utility for constructing `className` strings conditionally
- [Auth.js](https://authjs.dev/) - Open source authentication library for the web
- [Zod](https://zod.dev/) - TypeScript-first schema validation library

### Features

- Default dark and light mode themes
- Post tagging and filtering
- Included admin dashboard
- In-app Markdown editor

## Usage

> Writr.md uses pnpm for a package manager
> You should install pnpm globally before working with this project by running `npm install -g pnpm`. Visit the [pnpm docs](https://pnpm.io/) for more information

With pnpm installed you can clone this repo to your local machine and install the project dependencies

```bash
git clone https://github.com/jamesspearsv/writrmd
cd writrmd
pnpm install
```

### Running locally

Run Writr.md locally using the Next.js dev server

Get started with local development by creating a `.env` file at the project root with the following variables

```env
### NEXTJS VARIABLES (REQUIRED) ###
ROOT_PATH=[...] # Absolute path to the Writr.md root
AUTH_SECRET=[...] # Secret key for Auth.js
ADMIN_USERNAME=[...] # Username for admin dashboard access
ADMIN_PASSWORD=[...] # Password for admin dashboard access
AUTH_TRUST_HOST=true # Required by AuthJS

### POSTGRES DOCKER CONTAINER CREDENTIALS (OPTIONAL) ###
POSTGRES_USER=[...]
POSTGRES_PASSWORD=[...]
POSTGRES_DB=[...]

### POSTGRES CONNECTION STRING (REQUIRED) ###
POSTGRES_URL=postgres://[...] ## Connection string for your container or Postgres server
```

Then start the Next.js dev server

```bash
pnpm dev
```

### Running with Docker

Run Writr.md with Docker by using the latest Docker image by using the example `docker-compose.yaml` in the [docker example](https://github.com/jamesspearsv/writrmd/blob/main/docker). Read the provided `README.md` for more information on using Writr.md with Docker.
