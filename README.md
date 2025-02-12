# Writr.md

<p aligh="center">
  <div>
    <img src='./public/writrmd-logo.svg' alt='Writr.md logo' width='180' heigth='180'/>
  </div>
</p>

Self-hosted markdown blogging powered by Next.js and Docker

## Table of Contents

- [Writr.md](#writrmd)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
    - [Technologies](#technologies)
    - [Features](#features)
    - [Feature Roadmap](#feature-roadmap)
  - [Usage](#usage)
    - [Running locally](#running-locally)
    - [Running with Docker](#running-with-docker)
    - [Adding new posts](#adding-new-posts)
    - [Adding new pages](#adding-new-pages)

## Description

Writr.md is simple markdown blogging platform built on Next.js and using gray-matter, marked-react, open-props, and aria-kit. The project includes a basic Docker deployment method plus the option to fork and host your own version on Vercel and other platforms.

### Technologies

- [Next.js](https://nextjs.org/) - React framework for building high-quality web applications
- [Docker](https://www.docker.com/) - Containerized deployment tool
- [gray-matter](https://github.com/jonschlinkert/gray-matter) - Smarter YAML front-matter parser
- [react-marked](https://github.com/sibiraj-s/marked-react) - React library for rendering markdown as React components using marked
- [open-props](https://open-props.style/) - CSS design tokens for consistent design and styles
- [ariakit](https://ariakit.org/) - Open-source component library with unstyles, primitive components and a focus on web accessibility
- [clsx](https://github.com/lukeed/clsx) - A tiny (239B) utility for constructing `className` strings conditionally

### Features

- Dynamic post rendering and routing
- Post metadata parsing
- Post tagging
- Customizable standalone site pages
- Basic Docker deployment

### Feature Roadmap

The following features are planned and will be added in no particular order

- [x] Dark mode
- [ ] Filtering posts by included tags
- [ ] SEO optimization based on site and post metadata
- [ ] Customer theme options
- [ ] MDX support
- [ ] RSS feed generation
- [ ] Commenting system
- [ ] Admin panel to simplify drafting and publishing blog posts
- [ ] Improved Docker deployment and Docker Compose configuration

## Usage

> Writr.md uses pnpm for a package manager
> You should install pnpm globally before working with this project by running `npm install -g pnpm`
>
> Visit the [pnpm docs](https://pnpm.io/) for more information

With pnpm installed you can clone this repo to your local machine

```bash
git clone https://github.com/jamesspearsv/writrmd
cd writrmd
pnpm install
```

### Running locally

Run Writr.md locally using the Next.js dev server or production builds

Dev sever:

```bash
pnpm dev
```

Production build:

```bash
pnpm build
pnpm start
```

### Running with Docker

Run Writr.md using Docker by pulling and running the latest container image

```bash
docker pull ghcr.io/jamesspearsv/writrmd:latest
pn docker:run
```

You can build the image from source if you have cloned the repo to you machine

```bash
pn docker:build
pn docker:run
```

This will build the `writrmd` image from the project's `Dockerfile` and start a container running on `localhost:3000`

### Adding new posts

Publish new posts by adding markdown files to `/src/posts`

Filenames should not include additional `.` characters as this is reserved for parsing filenames and constructing url slugs

All posts should have YAML front-matter. Currently supported post front-matter tags include:

- `title` (required): Post title for page metadata and previews
- `date` (required): Publication date entered in YYYY-MM-DD format
- `author` (required): Post author
- `tags` (optional): An array of tag strings
- `excerpt` (optional): A brief excerpt from the post content used for previews

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

Add new standalone pages by adding markdown files to `/src/pages`

Filenames should not include additional `.` characters as this is reserved for parsing filenames and constructing url slugs

All pages should include YAML front-matter. Currently supported page front-matter include:

- `title` (required): Page title used for link labels

Example page with front-matter

```markdown
---
title: About
---

# About me

This is an example about me page.
```
