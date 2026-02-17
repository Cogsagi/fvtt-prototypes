# CLAUDE.md

## Project Overview

fvtt-prototypes is a Foundry Virtual Tabletop (VTT) module built with plain JavaScript using ES modules.

## Tech Stack

- **Language**: JavaScript (ES Modules)
- **Platform**: Foundry VTT (module)

## Project Structure

```
/
├── module.json          # Foundry VTT module manifest
├── scripts/             # JavaScript source files
├── styles/              # CSS stylesheets
├── templates/           # Handlebars/HTML templates
├── languages/           # Localization files
└── CLAUDE.md
```

## Development

### Foundry VTT Module Basics

- `module.json` is the module manifest — it declares the module ID, compatibility, scripts, styles, and dependencies.
- Scripts are loaded by Foundry via the manifest; no build step is required for plain JS.
- Use Foundry's Hook system (`Hooks.on`, `Hooks.once`) to integrate with the application lifecycle.

### Code Conventions

- Use ES module syntax (`import`/`export`).
- Follow Foundry VTT API patterns and naming conventions.
- Prefix CSS classes and hook namespaces with the module ID to avoid collisions.

## Testing

No automated test framework is configured yet. Test manually by loading the module in a local Foundry VTT instance.

## Useful Links

- [Foundry VTT API Documentation](https://foundryvtt.com/api/)
- [Foundry VTT Module Development Guide](https://foundryvtt.wiki/en/development/guides/getting-started)
