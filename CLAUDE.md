# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal startpage/navigation site hosted on GitHub Pages. It uses a JSON-driven architecture where all links and page configurations are centrally managed in `links.json`, and HTML pages dynamically load content via JavaScript.

**Key Design Principle**: Users should primarily modify `links.json` to manage links, not HTML files.

## Architecture

### Multi-Page System

The site supports multiple pages (currently "home" and "work"), each defined as a key in `links.json` under `pages`:

- **index.html** → loads `pages.home` configuration
- **work.html** → loads `pages.work` configuration
- New pages: Copy any HTML file, then add corresponding config to `links.json`

### Content Loading (Critical)

Pages use JavaScript to fetch `links.json` and dynamically render link blocks:

```javascript
// Page detection logic (lines 87-89 in index.html and work.html)
const currentPageName = window.location.pathname.endsWith('work.html') ? 'work' : 'home';

// Dynamic rendering (lines 92-128)
fetch('links.json')
  .then(response => response.json())
  .then(data => {
    const pageData = data.pages[currentPageName];
    pageData.blocks.forEach(block => { /* generates HTML */ });
  });
```

**Important**: The page detection uses URL pathname matching. When creating new pages, update this logic.

### links.json Structure

```json
{
  "title": "StartPage",
  "pages": {
    "home": {
      "blocks": [
        {
          "name": "1",
          "links": [
            {"name": "Site Name", "url": "https://example.com", "target": "_blank"}
          ]
        }
      ]
    }
  }
}
```

Each page has multiple blocks, each block contains up to 9 links. Use `{"name": "blank", "url": ""}` for placeholders.

## Common Commands

### Deploy Changes

```bash
# From project directory
./deploy.sh "commit message"

# From any directory
/root/startpage.github.io/deploy.sh "commit message"

# Uses default message if omitted
./deploy.sh
```

The `deploy.sh` script:
- Checks for changes with `git status --porcelain`
- Adds all changes with `git add .`
- Creates commit (default message: "更新导航页链接")
- Pushes to `origin main`

### Manual Git Workflow

If not using `deploy.sh`:
```bash
cd /root/startpage.github.io
git add .
git commit -m "message"
git push origin main
```

### Add New Page

```bash
# 1. Copy existing HTML file
cp index.html newpage.html

# 2. Update title and favicon in newpage.html

# 3. Add configuration to links.json under "pages": { "newpage": {...} }

# 4. Update page detection logic in newpage.html (line 89)
```

## Deployment

- **Platform**: GitHub Pages
- **Branch**: `main`
- **Update time**: 10-30 seconds after push
- **URLs**:
  - Home: https://grassark.github.io/startpage.github.io/
  - Work: https://startpage.github.io/work.html

## User Workflow Pattern

When users ask to add/modify/remove links:
1. Read `links.json` to understand current structure
2. Edit the appropriate block in `links.json`
3. Use `./deploy.sh` to commit and push
4. Confirm deployment success

Users rarely modify HTML files directly unless adding new pages.

## Important Files

- `links.json` - **Primary configuration file** - all link management happens here
- `index.html` - Home page template
- `work.html` - Work page template
- `deploy.sh` - Automated deployment script
- `source/` - Static assets (CSS, JS, favicons, background images)
- `README-USAGE.md` - User-facing documentation (refer for detailed usage examples)

## Privacy & Security Guidelines

**CRITICAL**: Git commit messages must NOT include specific details to prevent privacy leaks.

### What NOT to include in commit messages:
- Personal names or identifiers
- Specific account usernames or IDs
- Personalized URLs (e.g., links with user IDs)
- Sensitive service names that could reveal personal information
- Detailed descriptions of what was changed (e.g., "added NetEase CC link for user 361433")

### Acceptable commit message patterns:
- "更新导航页链接" (Update navigation links)
- "添加新网站" (Add new website)
- "优化页面配置" (Optimize page configuration)
- "更新链接配置" (Update link configuration)

### Principle:
Keep commit messages generic and focused on the action taken, not the specific content changed. The git history will be public on GitHub, so avoid committing anything that could reveal personal information.
