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

## v0.3.2 -- March 23, 2025

Internal changes to refactored input components that increase component type safety and improve reusability

### Added

- **Rebuilt input components** including `Input`, `List`, and `TextArea`
- **New props types** for all rebuilt input components that improve ease-of-use, type safety, and reusability

### Removed

- **Deprecated input components** including `TextInput`, `ListInput`, and `TextAreaInput`
- **Deprecated prop types** related to all deprecated input components including `GenericInputProps` and `ValueUpdater`

### Changed

- **Minor styling updates** including new Input size and variant styles

### Fixed

- **List limit bug** that resulted in the limit prop being ignored

## v0.4.0 -- March 27, 2025

Implemented a post status system and the ability to save post drafts, unpublish posts, and edit existing posts

### Added

- **Custom toggle component** to read and update boolean values and display toggle UI status
- **Published status** to post definition that can track and update the published status of each post file
- **Admin Post Preview Component** to display post information in the admin dashboard
- **URL slug param to /editor/posts** route to start post updating workflow

### Removed

- **Deprecated type definitions** related to unused set up logic

### Changed

- **Post editor UI** to make optional post data more visible and accessible
- **Author field location** in the post editor to centrally locate all required editor fields
- **Post editor sidebar** to function more like a collapsible element rather than a pop-over element
- **Example posts** to include new front-matter properties

## v0.4.1 -- March 28, 2025

Patched Docker build to target multi-platform builds

### Changes

- **Updated `Dockerfile`** to fix casing issue
- **Updated `push-image.sh`** to use a multi-platform build command

## v0.4.2 -- March 30, 2025

General documentation updates and other minor changes.

### Added

- **Updated docs** for server actions in `actions.ts`
- **Updated docs** for the internal `TaskWorker` class
- **Updated docs** for `useScroll` hook
- **Updates docs** for `authActions.ts`
- **Updated docs** for `slugify.ts`

### Changes

- **ActionResult interface** to use string values by default

### Removed

- **Breadcrumb padding transition** to simplify component and remove visual distractions

## v0.4.3 -- March 31, 2025

### Fixed

- **Unescaped characters** in YAML post front-matter crashing the app

## v0.4.4 -- April 1, 2025

Fix bug that resulted in post publication dates being rewritten on each post update

### Added

- **Publication date logic** to `savePost` function that determines a correct date value based on publication status and previous publication date

### Changes

- **Updated post editor** to receive a date prop and send this prop to `savePost` server action
- **Added fallback UI** when a post publication date is empty
- **Updated post sorting** in `fetchPosts` server action to handle post without publication dates

## v0.4.5 -- April 2, 2025

Minor changes to the post layout, breadcrumb component, and text area component. Other minor changes to `savePost` server action

### Added

- **Transparency effect** to breadcrumb component
- **Scrollback component** to the post editor

#### Changes

- **Updated post layout** by placing front-matter above the post content
- **Updated savePost** to use validated data instead of user submitted data
- **Changed post body width** in the post editor to match the width of published posts

## v0.4.6 -- April 6, 2025

Minor changes and optimizations to page structures and bug fixes.

### Added

- **Header component** useful for building page headers with consistent margin and styling

### Fixed

- **Scrollback positioning** issue caused by using unit-less values

### Changes

- **Simplified admin layout** to make page padding, margin more intuitive

## v0.5.0 -- April 7, 2025

Add a basic mobile responsive layout and minor styling changes

### Added

- **Basic mobile layout** for public facing pages
- **Mobile specific scrollback** behavior to use mobile screens more efficiently

### Changes

- **Changed admin and public post previews** to improve visual consistency and CSS structure
- **Increased Markdown line height** to improve readability

### Fixed

- **Blockquote styling issue** that resulted in text overflowing the container on mobile

## v0.5.1 -- April 9, 2025

Patch custom css properties to improve usability and refactor navigation components to centralize structure and styles

### Changes

- **Updated CSS property schema** to standardize property naming
- **Minor styling changes** to fix inconsistencies in spacing, colors, etc
- **Updated vertical nav layout** to better divide nav items from actions & moved visit site link to buttons row
- **Updated navigation components** to move `props.children` within component definition

## v0.5.2 -- April 9, 2025

Implemented a result pattern in relevant server action functions

### Added

- **Result return value** to relevant server actions and refactored relevant uses throughout the codebase

### Changes

- **Renamed various server actions** to use more understandable naming schemes
  - `fetchPosts` was renamed to `fetchAllPosts`
  - `fetchPostBySlug` was renamed to `fetchPost`
- **Renamed ActionResult definition** to `Result` to use a more concise name

### Removed

- **Unused server actions** for deprecated features related to reading standalone page files

## v0.6.0 -- April 15, 2025

Add an improved landing page design and elements

### Added

- **Minimal post preview** to display recent posts on the blog landing page

### Changes

-**Updated `fetchAllPosts`** to use an option object with tag, limit, and publishedOnly options

## v0.6.1 -- April 16, 2025

Minor changes to caching and dynamic rendering

### Changes

- **Moved dynamic rendering config** from the root layout to route group layouts
- **Minor Dockerfile updates** including adding an example post to the base image

## v0.6.2 -- April 19, 2025

Add backwards compatibility support to blog settings

### Added

- **Basic settings validation** when updating the settings file

### Changes

- **Refactor settings page** using a settings editor to update all settings rather individual settings properties
- **Updated BlogSettingsSchema** to include accurate settings properties

## v0.6.3 -- April 22, 2025

Blockquote bug fix and minor UI changes

### Fixed

- **Font sizing bug** in blockquote post elements

### Changes

- **Changed site nav styles** to use sticky positioning and added a transparent blur effect
- **Updated breadcrumb element** to remove sticky positioning and blur effect

## v0.6.4 -- May 6, 2025

Minor fixes to UI inconsistencies and quirks. UI behavior fixes and improvements

### Added

- **Textarea keyboard shortcuts** for common syntax including bold, italic, and links
- **PostEditor shortcuts** for common actions including toggling the sidebar and saving posts

### Fixed

- **Textarea outlines** overflowing outside of the above editor controls
- **Disabled title field** in the post editor to help manage sync between titles and slugs

### Changes

- **Moved fields** for post author and title back to the front-matter sidebar

## v0.6.5 - May 19, 2025

Animation improvements and bug fixes

### Fixed

- **Post sorting** bug that resulted in an unexpected port order

### Changes

- **Set all animation speeds** to 200ms for UI consistency
- **Removed Breadcrumbs** component from post page
- **Moved new post link** to admin navigation menu

## v1.0.0 - June 1, 2025

Migrates Writr.md data storage to Postgres and deprecates file based approaches.

> [!IMPORTANT]
> v1.0.0 introduces breaking changes to previous post storage approaches, the base docker image, and docker compose deployment. Check the updated Docker deployment docs for specific changes and how to update your deployment environment. When you're ready to migrate your post files to Postgres go to `/migrate-pg` to start the process.

### Added

- **Drizzle schema and queries** to store, access, and manipulate blog posts
- **Migration route** to move file-based post content to a Postgres database

### Changes

- **Updates Docker Compose config** to connect to a Postgres container or remote connection string
- **Update Dockerfile** to apply runtime migrations using Drizzle and a migration entrypoint
- **Updates production environment** required and optional environment variables
