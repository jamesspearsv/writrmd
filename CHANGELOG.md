# Writr.md Changelog

## v0.0.0

Initial prototype of Writr.md. Features included reading and rendering of post and standalone pages from server filesystem. Required user to create and edit post and pages using a text editor.

Included basic post tagging and filtering, landing page, markdown based standalone pages, dynamic metadata, and dark mode

## v0.1.0

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
