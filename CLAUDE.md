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

## Instructions for Claude Code

### Before Generating Code
1. Read any relevant existing source files before making changes.
2. Follow patterns already established in the codebase.
3. Respect Foundry VTT API conventions and lifecycle hooks.

### Do Not
- Generate code without reading relevant source files first.
- Create new architectural patterns without documenting them.
- Ignore Foundry VTT API conventions or module namespacing.
- Assume implementation details not documented in the codebase.

### When Making Changes
- Keep module ID prefixes consistent across CSS classes and hook namespaces.
- Ensure `module.json` stays in sync with any new scripts, styles, or dependencies.
- Test changes manually in a local Foundry VTT instance.

## Testing

No automated test framework is configured yet. Test manually by loading the module in a local Foundry VTT instance.

## Useful Links

- [Foundry VTT API Documentation](https://foundryvtt.com/api/)
- [Foundry VTT Module Development Guide](https://foundryvtt.wiki/en/development/guides/getting-started)
