# @sbercloud/ft-tokens-builder

CLI tool for generating CSS, SCSS and TypeScript files from Figma tokens. Supports both Node.js CLI usage and browser API.

## Features

- 🎨 Generate CSS, SCSS, and TypeScript files from Figma tokens
- 🔄 Watch mode for automatic regeneration
- 🌐 Browser API support
- ✅ CSS/SCSS validation
- 🔍 Token property names validation against documentation
- 📦 Flexible token structure support
- ⚙️ Configurable via CLI arguments or config file

## Installation

```bash
pnpm add -D tokens-builder
# or
npm install -D tokens-builder
```

## Usage

### CLI

#### Basic usage

```bash
npx tokens-builder --input ./tokens
```

#### With options

```bash
npx tokens-builder \
  --input ./tokens \
  --output ./build \
  --formats css scss ts \
  --css-modules \
  --scss-modules \
  --css-class-prefix my-prefix \
  --validate warning
```

#### Watch mode

```bash
npx tokens-builder --input ./tokens --watch
```

#### With config file

```bash
npx tokens-builder --config ./tokens-builder.config.json
```

### Configuration File

Create a `tokens-builder.config.json` file:

```json
{
  "input": "./tokens",
  "output": "./build",
  "formats": ["css", "scss", "ts"],
  "cssModules": false,
  "scssModules": true,
  "cssClassPrefix": "sn",
  "validate": "warning",
  "watch": false,
  "logLevel": "info",
  "excludeGroups": [],
  "logFile": "./logs/build.log",
  "includeFallbackValues": true
}
```

### Configuration and CLI parameters

Parameters can be set in `tokens-builder.config.json` (camelCase) or via CLI arguments. CLI values override config file.

| Parameter | Config (JSON) | CLI | Type | Default | Description |
|-----------|----------------|-----|------|---------|-------------|
| **input** | `input` | `-i, --input <path>` | `string` | `./tokens` | Path to tokens directory |
| **output** | `output` | `-o, --output <path>` | `string` | `./build` | Path to output directory for generated files |
| **config** | — | `-c, --config <path>` | `string` | — | Path to config file (CLI only) |
| **formats** | `formats` | `--formats <formats...>` | `("css" \| "scss" \| "ts")[]` | `["css", "scss", "ts"]` | Output formats: `css`, `scss`, `ts` |
| **cssModules** | `cssModules` | `--css-modules` | `boolean` | `false` | Generate CSS modules |
| **scssModules** | `scssModules` | `--scss-modules` / `--no-scss-modules` | `boolean` | `true` | Generate SCSS modules |
| **cssClassPrefix** | `cssClassPrefix` | `--css-class-prefix <prefix>` | `string` | `sn` | CSS class prefix (e.g. `.sn-button`) |
| **validate** | `validate` | `--validate <mode>` | `"strict" \| "warning" \| "off"` | `warning` | Token property name validation mode |
| **watch** | `watch` | `-w, --watch` | `boolean` | `false` | Watch mode: rebuild on file changes |
| **logLevel** | `logLevel` | `--log-level <level>` | `"error" \| "warning" \| "info" \| "debug"` | `info` | Console log level |
| **logFile** | `logFile` | `--log-file <path>` | `string` | — | Path to file for additional log output |
| **excludeGroups** | `excludeGroups` | `--exclude-groups <groups...>` | `string[]` | `[]` | Token groups to exclude from build (e.g. `05_language`, `07_acrylicMode`) |
| **includeFallbackValues** | `includeFallbackValues` | — | `boolean` | `true` | Include computed fallback values in `var()` chains (config only) |

### Browser API

```typescript
import { buildTokens } from "tokens-builder/browser";

const result = await buildTokens({
  tokens: {
    "01_base/base": {
      /* tokens */
    },
    "button/button": {
      /* tokens */
    },
  },
  formats: ["css", "scss", "ts"],
  cssModules: false,
  scssModules: true,
  cssClassPrefix: "sn",
  validate: "warning",
});

// Access generated files
console.log(result.css["base/base.css"]);
console.log(result.scss["base/base.scss"]);
console.log(result.ts["styles.ts"]);
```

## Token Structure

The builder works with flexible token structures:

### System Layers

- Folders matching pattern `%d_{*}` (e.g., `01_base`, `02_primitive`, `03_platformMode`)
- Sorted by numeric prefix
- Used as base layers and modifiers

### Components

- Non-numeric folders (e.g., `button`, `alert`, `styles`)
- All folders that don't match the `%d_{*}` pattern

### Metadata Files

- `$metadata.json` (optional) - contains token order
- `$themes.json` (optional) - contains theme definitions

## Property Mapping

The builder automatically transforms token property names into correct CSS properties. For example:

- `cornerRadius` → `border-radius`
- `strokeWeight` → `border-width`
- `paddingHorizontal` → `padding-left` + `padding-right`
- `minWidth` → `min-width`

**📖 See [PROPERTY_MAPPING.md](./PROPERTY_MAPPING.md) for complete mapping documentation.**

## Token Names Validation

The builder includes automatic validation of token property names against the documentation. This validation step runs before the build process and helps identify:

### What is Validated

The validator checks that token property names match the standard naming conventions:

**Color properties:**
- `bgDefault`, `bgHovered`, `bgPressed`, `bgLoad`, `bgActivated`, `bgDisabled`
- `fgDefault`, `fgHovered`, `fgPressed`, `fgLoad`, `fgActivated`, `fgDisabled`
- `borderDefault`, `borderHovered`, `borderPressed`, `borderLoad`, `borderActivated`, `borderDisabled`

**Size properties:**
- `square`, `width`, `height`, `minWidth`, `maxWidth`, `minHeight`, `maxHeight`

**Padding properties:**
- `padding`, `paddingLeft`, `paddingRight`, `paddingTop`, `paddingBottom`, `paddingHorizontal`, `paddingVertical`

**Gap properties:**
- `gap`

**Corner Radius properties:**
- `cornerRadius`, `cornerRadiusLeft`, `cornerRadiusRight`, `cornerRadiusTop`, `cornerRadiusBottom`
- `cornerRadiusTopLeft`, `cornerRadiusTopRight`, `cornerRadiusBottomLeft`, `cornerRadiusBottomRight`

**Stroke properties:**
- `strokeWeight`, `strokeWeightHorizontal`, `strokeWeightVertical`
- `strokeWeightTop`, `strokeWeightRight`, `strokeWeightBottom`, `strokeWeightLeft`

### Common Issues Detected

The validation will catch:
- **Typos:** `strokeWeigth` → `strokeWeight`, `fgHoverd` → `fgHovered`
- **Wrong order:** `cornerRadiusRightTop` → `cornerRadiusTopRight`
- **Capitalization errors:** `PaddingHorizontal` → `paddingHorizontal`
- **Non-standard names:** Properties not matching the documented conventions

### Validation Output

When validation finds issues, it provides:
- File path where the issue occurs
- Full property path in the token structure
- The invalid property name
- Suggestion for the correct property name (when applicable)

Example output:
```
━━━ 📄 button/button (3 issues)

  ✗ "strokeWeigth"
    sn.button.anatomy.size.s.container.strokeWeigth → 💡 "strokeWeight"
  ✗ "strokeWeigth"
    sn.button.anatomy.size.m.container.strokeWeigth → 💡 "strokeWeight"
  ✗ "strokeWeigth"
    sn.button.anatomy.size.l.container.strokeWeigth → 💡 "strokeWeight"

━━━ 📄 calendar/calendar (1 issue)

  ✗ "fgHoverd"
    sn.calendar.color.itemCalendar.labelWrapper.default.marker.fgHoverd → 💡 "fgHovered"
```

### Validation Modes

Control validation behavior with the `--validate` option:
- `strict` - Build fails if validation errors are found
- `warning` - Shows warnings but continues the build (default)
- `off` - Disables validation

See the [Configuration and CLI parameters](#configuration-and-cli-parameters) table above for the full list.

## Requirements

- Node.js 20+ (for CLI)
- pnpm (recommended) or npm

## License

Apache-2.0
