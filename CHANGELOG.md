# Writr.md Changelog

Project changelog and roadmap. Version changes represent code merges into the main branch.

## Roadmap

Items here include minor tasks or fixes and larger feature goals

- [ ] Add draft post status
- [ ] Improve new post error details
- [ ] Add new post form error visual feedback
- [ ] Implement mobile layout
- [ ] Add admin authentication
- [ ] Update server actions documentation
- [ ] Improve sidebar navigation ui elements
- [ ] Improve ListInput usability by adding ability to add list items using keyboard
- [ ] Test and publish latest docker image

## v0.0.0

Initial version of Writr.md. Features included reading and rendering of post and standalone pages from server filesystem. Required user to create and edit post and pages using a text editor.

## v0.1.0 - _[DATE]_

Removes the requirement for users to interact with the app using a text editor and filesystem. Simplifies Docker deployment by removing required mounted volumes for posts and pages.

### Features

- Adds ability to draft and publish posts from admin dashboard by collecting user submitted post data and writing to the filesystem
- Add visual improvement to new post workflow including error messaging, visual UI feedback, and improved keyboard interactions

### Completed changes

- [x] Clean up form components and move component styling to css modules
- [x] Reduce accidental new post submissions by adding meta key submission (cmd + enter & ctrl + enter)
