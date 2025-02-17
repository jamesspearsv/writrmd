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
    - [Adding new posts](#adding-new-posts)
    - [Adding new pages](#adding-new-pages)

## Description

Writr.md is markdown blogging platform built on Next.js and using gray-matter, marked-react. The project includes a basic Docker deployment method plus the option to fork and host your own version using your method of choice.

### Technologies

- [Next.js](https://nextjs.org/) - React framework for building high-quality web applications
- [Docker](https://www.docker.com/) - Containerized deployment tool
- [gray-matter](https://github.com/jonschlinkert/gray-matter) - Smarter YAML front-matter parser
- [react-marked](https://github.com/sibiraj-s/marked-react) - React library for rendering markdown as React components using marked
- [open-props](https://open-props.style/) - CSS design tokens for consistent design and styles
- [ariakit](https://ariakit.org/) - Open-source component library with unstyles, primitive components and a focus on web accessibility
- [react-feather](https://github.com/feathericons/react-feather) - React component library for Feather icons
- [clsx](https://github.com/lukeed/clsx) - A tiny (239B) utility for constructing `className` strings conditionally

### Features

- Dynamic post rendering
- File based routing
- Default dark and light mode themes
- YAML front-matter parsing
- Post tagging and filtering
- Customizable standalone site pages
- Basic Docker deployment using Docker Compose

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

Run Writr.md locally using the Next.js dev server or a production build

Dev sever

```bash
pnpm dev
```

Production build

```bash
pnpm build
pnpm start
```

### Running with Docker

Run Writr.md with Docker by using the latest Docker image by using the [docker compose example](https://github.com/jamesspearsv/writrmd/blob/main/docker-example/docker-compose.yaml). Make sure you copy the example `Caddyfile` and create the required `posts` and `pages` directories.

Start the containers with Docker Compose

```bash
docker pull ghcr.io/jamesspearsv/writrmd:latest
docker compose up -d
```

You can build the image from source if you have cloned the repo to you machine

```bash
pn docker:build
pn docker:compose
```

This will build the `writrmd:dev` image from the project's `Dockerfile` and start a container running on `localhost:3000` using the `docker-compose.dev.yaml` at the project root

## Adding Content

Writr.md works by reading files from the filesystem both at build and run time.

Routing to posts and pages is determined by filenames and placement in the `/content` directory.

For example, a file in `/content/posts` called `this-is-my-super-awesome-post.md` will be available at the url `/blog/this-is-my-super-awesome-post`. Similarly, a file in `/content/pages` called `learn-more-about-me.md` will be available ar the url `/learn-more-about-me`.

For both posts and pages url slugs are build by removing the file extension (`.md`) and storing the filename as a `slug` property on the respective `Post` and `Page` object used internally. This makes urls more consistent and predictable. If you need to link to an internal page or post you can easily see what the resulting url will be based on the filename.

**Example:**

- All posts are accessible at `/blog/[slug]
- All pages are accessible at `/[slug]

> **Important!** Filenames should not include any whitespace or additional `.` characters. These interfere with filename parsing and will result in unexpected behavior and unpredictable url generation

Any new content in `/content/posts` and `/content/pages` should be available instantly without needing to rebuild the app source or image.

### Adding new posts

Publish new posts by adding markdown files to `/content/posts`

All posts should have YAML front-matter. Currently supported post front-matter tags include:

- `title` **(required)**: Post title for page metadata and previews
- `date` **(required)**: Publication date entered in `YYYY-MM-DD` format
- `author` **(required)**: Post author
- `tags` _(optional)_: An array of tag strings
- `excerpt` _(optional)_: A brief excerpt from the post content used for previews

Example post with required and optional front-matter tags

```markdown
---
title: 'Introduction to Markdown'
date: '2025-02-06'
author: 'John Doe'
tags: ['Markdown', 'Beginner', 'Writing']
excerpt: 'What is markdown and why should you use it?'
---

# Introduction to Markdown

Markdown is a lightweight markup language with plain-text formatting syntax. It was created by John Gruber in 2004 with the goal of making it as readable as possible while still allowing it to be converted to valid HTML.

## Why Use Markdown?

Markdown is great for writing blog posts, documentation, or any content that needs to be converted into HTML. Its syntax is simple and intuitive, which makes it a favorite among developers, writers, and content creators alike.
```

### Adding new pages

Add new standalone pages by adding markdown files to `/content/pages`

Filenames should not include any whitespace or additional `.` characters as this these prevent parsing filenames and constructing url slugs correctly. `about-me.md` is a good example

All pages should include YAML front-matter. Currently supported page front-matter include:

- `title` **(required)**: Page title used for link labels

Example page with front-matter

```markdown
---
title: Writr.md
---

# Local markdown blogging

Writr.md is a self-hosted markdown blogging platform powered by [Next.js](https://nextjs.org), [open-props](https://open-props.style/), [marked-react](https://github.com/sibiraj-s/marked-react), [gray-matter](https://github.com/jonschlinkert/gray-matter) and [ariakit](https://ariakit.org/). Edit `/src/pages/index.md` to make changes to this page or add your first markdown post to `/src/posts`.

You can find the docs and source code for this project on [Github](https://github.com/jamesspearsv/writrmd)

If you're ready to get started visit [/blog](/blog)
```
