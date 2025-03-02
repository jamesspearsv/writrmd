# To-do

Running list of upcoming features and related tasks

## Upcoming Features

Planned upcoming features. These will be implemented.

- ~~Post tagging and filtering~~
- ~~Custom landing and standalone pages~~
- ~~Dark mode and theme toggle~~
- ~~Basic admin dashboard~~
- ~~Admin authorization~~
- Customizable site landing page elements
- Site search bar
- Post pagination

## Tasks

Tasks related to the current working feature

### High Priority

- [ ] Refactor standalone page rendering feature to specifically target the site landing page
- [ ] Update function and action documentation
  - [ ] database.ts
  - [ ] authActions.ts
  - [ ] actions.ts

### Bugs

- bug: Post publication date formatting error -- dates are rendered as one day previously
- bug: Unable to enter tab in post editor due to default tab behavior
- bug: Localstorage reference error thrown from ThemeProvider.tsx

### Next Steps

- [ ] Improve post adding UI
- [ ] Add ability to save posts as drafts
- [ ] Improve date formatting (localized and relative dates)
- [ ] Add general tooltip elements

## Future Ideas

A general list of future ideas or tasks. These may or may not be implemented.

- Implement mobile layout
- Improve post editor (Ghost and Wordpress like)
- Add authorization callback feature
- MDX support
- Update breadcrumb generation to use post titles instead of post slugs
- Custom theme options
- Navigation groups and subpages
- RSS feed generation
- Commenting system

## Completed Tasks

A list of completed tasks for historical reference

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
