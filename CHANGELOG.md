# Writr.md Changelog

## v0.0.0

Initial prototype of Writr.md. Features included reading and rendering of post and standalone pages from server filesystem. Required user to create and edit post and pages using a text editor.

Included basic post tagging and filtering, landing page, markdown based standalone pages, dynamic metadata, and dark mode

## v0.1.0 -- March 1, 2025

Introduced an admin dashboard, basic authentication, and improved blog content management. Removed incomplete features to simplify the project.

### Added

- **Admin dashboard** with dedicated routes for managing content
- **Blog post editor** for creating and editing posts
- **Basic admin authentication** using Auth.js and environment variables

### Changed

- **Improved filename and URL slug generation** to ensure uniqueness
- **Updated Docker deployment** configuration and documentation for easier setup

### Removed

- **Standalone pages feature** (temporarily removed to simplify project scope)

## v0.1.1 -- March 3, 2025

Improved documentation in `README.md` and `/docker/README.md`. Bug fixes and improvements.

### Changed

- **Updated project README**
  - Removed outdated information covering adding new post and page content
  - Updated documentation for running locally using the Next.js dev server
  - Updated list of project technologies
  - Added new features to feature list
- **Updated Docker example README.md**
  - Centralized all relevant information on Docker deployments in `/docker/README.md`
  - Improved descriptive documentation for deploying using Docker

### Fixed

- **Admin dashboard** spacing page spacing issue
- **Post date** formatting issue that resulted in an incorrect publication date being rendered
- **LocalStorage reference error** thrown from the ThemeProvider component

## v0.2.0 -- March 5, 2025

Added new post editor functionality. Updated post editor UI, layout, and styles.

### Added

- **Editor control bar** with rich-text like editing capabilities by inserting appropriate Markdown syntax
- **Collapsible sidebar** to hide and show post front-matter inputs (author, tags, excerpt)

### Changed

- **Improved editor layout** to more efficiently use available screen space
- **Simplified styles** to match minimal design approach and reduce visual clutter
- **Simplified error feedback** by centralizing error messaging and removing technical error jargon
- **Simplified title and body** inputs to reduce visual clutter and improve writing experience

## v0.3.0 -- March 14, 2025

This version focuses on adding user configurable settings and implementing associated functionality

### Added

- **Default site settings** including site name, summary, and optional icon url
- **Settings portal** to provide user access to current site settings
- **Updating functionality** to view and change settings values
- **Promise-based worker** to manage setting operations and prevent race conditions during filesystem operations
- **Definition and schema** to define and validate blog setting values

### Changes

- **Updated landing page** to render with blog setting values
- **Updated navigation components** to render with blog setting values

## v0.3.1 -- March 17, 2025

Optimized markdown rendering and implemented markdown styling rules

### Added

- **Markdown wrapper component** around the Markdown component provided by `markdown-react`
- **Markdown styles** to apply consistent CSS to HTML rendered by `markdown-react`

### Changes

- **Migrated** to `markdown-react` from `marked-react`
- **Refactored** relevant components and pages to avoid using `markdown-react` directly
