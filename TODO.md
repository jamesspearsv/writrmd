# To-do

Running list of upcoming features and related tasks

## Upcoming Features

Planned upcoming features. These will be implemented. Implemented features are indicated using a strike through. Implemented features are still subject to updates and additions

- ~~Post tagging and filtering~~
- ~~Custom landing and standalone pages~~
- ~~Dark mode and theme toggle~~
- ~~Basic admin dashboard~~
- ~~Admin authorization~~
- ~~Useful post editor (improved controls, styles, and UI)~~
- User configurable site settings
- Customizable site landing page elements
- Site search bar

## Tasks

Tasks, fixes, and changes that need completed, fixed, or added

### High Priority

### Bugs and Fixes

- bug: clean up shared input, textarea, and button styles
- bug: fix breadcrumb spacing and transition (current approach is distracting and unpleasant to watch)

### Next Steps

- [ ] Refactor page rendering feature to specifically target only the site landing page
- [ ] Update function and action documentation
  - [ ] database.ts
  - [ ] authActions.ts
  - [ ] actions.ts

## Future Ideas

A general list of future ideas or tasks. These may or may not be implemented.

- Ability to save posts as drafts
- Post editing capabilities
- Mobile layout
- Add authorization callback feature
- Update breadcrumb to use post titles instead of post slugs
- MDX support
- Improve date formatting (localized and relative dates)
- Custom theme options
- Navigation groups and subpages
- RSS feed generation
- Post pagination
- Commenting system

## Completed Tasks

A list of completed tasks for historical reference

- [x] Update post editor error feedback
- [x] Complete updated post editor UI
- [x] Make editor controls bar sticky
- [x] Add collapsing sidebar for front-matter inputs
- [x] Improve post editor UI
- [x] Extend post editor behavior (hybrid RTE and Markdown actions)
- [x] Update README.md
- [x] Test docker deployment
- [x] Improve auth credentials validation
- [x] Finish admin actions history table
- [x] Add initial set up workflow
- [x] Improve login UI
- [x] Improve logout button UI
- [x] Write login logic
- [x] Configure authorization credentials storage
- [x] Write unauthorized user logic
- [x] Add authorization provider
- [x] Configure auth library (Auth.js)
- [x] Improve sidebar navigation UI
- [x] Update server actions documentation
- [x] Uniquely identify post files with unique slug generation
- [x] Add visual error feedback to post and page editors
- [x] Refactor new page workflow using a'formless' approach with server actions and useActionState
- [x] Refactor new post workflow using 'formless' approach with server actions and useActionState
- [x] Refactor input components to lift up state. Input components should be controlled by default
- [x] Improve input component props generic typing
- [x] Add page adding workflow
- [x] Improve new post and page server action error details
- [x] Improve error feedback for page adding server action
