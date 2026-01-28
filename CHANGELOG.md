# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased] - 2026-01-28

### Refactor
- **Core:** Removed jQuery dependency to improve performance and reduce bundle size.
- **Scripts:** Rewrote `source/main.js` using native JavaScript (ES6+).
- **Scripts:** Refactored inline scripts in `index.html` and `work.html` to use native DOM events (`DOMContentLoaded`, `resize`) instead of jQuery wrappers.

### Integration
- **CSS:** Extracted all inline `<style>` blocks from HTML files into `source/style-new.css`.
- **Architecture:** Merged `work.html` into `index.html`. The page now dynamically loads content (home/work) based on the `?page=` URL parameter.
- **UX:** Added dynamic updates for document title and favicon based on the active page.

### Responsive Design
- **Layout:** Replaced fixed-width and absolute positioning with a responsive Flexbox-based system.
- **Mobile:** Added `@media` queries to optimize the search bar and link grids for tablets and mobile devices.
- **Styling:** Improved search bar flexibility and link block spacing to adapt to various screen sizes.
