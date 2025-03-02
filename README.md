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
  - [Adding Content](#adding-content)

## Description

Writr.md is markdown blogging platform built on Next.js and using gray-matter, marked-react. The project includes a basic Docker deployment method plus the option to fork and host your own version using your method of choice.

### Technologies

- [Next.js](https://nextjs.org/) - React framework for building high-quality web applications
- [Docker](https://www.docker.com/) - Containerized deployment tool
- [gray-matter](https://github.com/jonschlinkert/gray-matter) - Smarter YAML front-matter parser
- [react-marked](https://github.com/sibiraj-s/marked-react) - React library for rendering markdown as React components using marked
- [open-props](https://open-props.style/) - CSS design tokens for consistent design and styles
- [react-feather](https://github.com/feathericons/react-feather) - React component library for Feather icons
- [clsx](https://github.com/lukeed/clsx) - A tiny (239B) utility for constructing `className` strings conditionally
- [Auth.js](https://authjs.dev/) - Open source authentication library for the web
- [Zod](https://zod.dev/) - TypeScript-first schema validation library

### Features

- Dynamic post rendering
- File based routing
- Default dark and light mode themes
- YAML front-matter parsing
- Post tagging and filtering
- Included admin dashboard
- In-app blog post editor

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

Get started with local development by creating a `.env.local` file at the project root with the following variables

```env
ROOT_PATH=[...] # Absolute path to the Writr.md root
AUTH_SECRET=[...] # Secret key for Auth.js
ADMIN_USERNAME=[...] # Username for admin dashboard access
ADMIN_PASSWORD=[...] # Password for admin dashboard access
```

Then start the Next.js dev server

```bash
pnpm dev
```

### Running with Docker

Run Writr.md with Docker by using the latest Docker image by using the example `docker-compose.yaml` in the [docker example](https://github.com/jamesspearsv/writrmd/blob/main/docker). Read the provided `README.md` for more information on using Writr.md with Docker.

## Adding Content

Writr.md works by storing posts as markdown content in a flat file structure. All posts are stored in `/content/posts` and accessible by their filenames.

For example, a file in `/content/posts` called `this-is-my-super-awesome-post.md` will be available at the url `/blog/this-is-my-super-awesome-post`.

Writr.md includes a build-in post editor

Unique url slugs are generated at when new blog content is written to the filesystem and present in the resulting document filename.
