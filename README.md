# Smart Table Block

A WordPress Gutenberg block set for building semantic, styleable tables with nested row and cell blocks. The plugin registers three coordinated blocks: a parent table block, row blocks, and cell blocks that can contain other blocks.

## Features

- Semantic table output with `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, and `td`
- Nested block content inside cells
- Table-level styling controls for color, spacing, border, dimensions, and typography
- Row-level styling controls with header, body, and footer row modes
- Cell-level styling controls with support for inner blocks
- Full typography controls on table, row, and cell blocks
- Table-specific settings for caption, layout, border collapse, striped rows, sticky headers, and responsive scrolling
- Default bordered table styling out of the box
- Server-side rendering for clean frontend markup

## Block Structure

The plugin registers these blocks:

| Block | Purpose |
|---|---|
| `smartlogix/smart-table` | The parent table block that controls overall structure and table-wide settings |
| `smartlogix/smart-table-row` | A nested row block used inside Smart Table |
| `smartlogix/smart-table-cell` | A nested cell block used inside Smart Table Row |

Rows can be configured as:

- Header rows
- Body rows
- Footer rows

Header rows render their cells as `th`; body and footer rows render their cells as `td`.

## Requirements

| Requirement | Minimum |
|---|---|
| WordPress | 6.5+ |
| PHP | 7.4+ |
| Node.js (development only) | 20+ |

## Installation

### Via Composer

```bash
composer require smartlogix/smart-table-block
```

If your project already loads Composer's autoloader, the blocks register automatically through `smart-table-block.php`.

### Manual installation

1. Download the latest release zip from the GitHub Releases page.
2. Extract it into your WordPress plugins directory or your project where you manage shared block libraries.
3. If using it as a library, require the bootstrap file:

```php
require_once __DIR__ . '/smart-table-block/smart-table-block.php';
```

If installed as a normal plugin, activate it from the WordPress admin.

## Usage

Search for `Smart Table` in the block inserter.

The default table inserts with starter header and body rows. From there you can:

- Add header, body, or footer rows
- Add more cells to any row
- Place paragraphs, images, buttons, groups, or other allowed blocks inside each cell
- Style the entire table and override styles per row or per cell

### Table settings

| Setting | Description |
|---|---|
| Caption | Adds a semantic table caption |
| Table Layout | `auto` or `fixed` |
| Border Collapse | `collapse` or `separate` |
| Striped Rows | Adds alternating background styling to body rows |
| Sticky Header | Keeps header cells fixed while scrolling |
| Responsive Horizontal Scroll | Wraps the table in a horizontal scroll container |

### Cell settings

| Setting | Description |
|---|---|
| Column Span | Sets `colspan` |
| Row Span | Sets `rowspan` |
| Width | Accepts any CSS width value |
| Vertical Align | `top`, `middle`, or `bottom` |
| Header Scope | Available on header cells for semantic `scope` control |

## Styling Support

All block levels expose WordPress block supports where appropriate.

### Table block

- Color
- Spacing
- Border
- Dimensions
- Typography
- Alignment

### Row block

- Color
- Spacing
- Border
- Dimensions
- Typography

### Cell block

- Color
- Spacing
- Border
- Dimensions
- Typography

Typography support includes options such as:

- Font family
- Font size
- Font style
- Font weight
- Line height
- Letter spacing
- Text alignment
- Text decoration
- Text transform
- Writing mode

## Development

```bash
git clone https://github.com/namithj/smart-table-block.git
cd smart-table-block
npm install
npm start
npm run build
npm run lint:js
npm run lint:css
```

## Build Output

Built assets are generated into `build/` and include:

- Shared editor and style bundles
- `build/smart-table/`
- `build/smart-table-row/`
- `build/smart-table-cell/`

## CI and Releases

This repository includes GitHub Actions workflows in `.github/workflows/`:

- `ci.yml` runs linting and build checks on pushes and pull requests
- `release.yml` verifies that `build/` is current and attaches an installable zip to a GitHub Release

Release checklist:

1. Update versions in `package.json`, `composer.json`, `smart-table-block.php`, and the relevant `block.json` files.
2. Run `npm run build`.
3. Commit the updated `build/` output.
4. Push to `main`.
5. Create a GitHub Release.

## License

GPL-2.0-or-later
