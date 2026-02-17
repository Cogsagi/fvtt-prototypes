# fvtt-prototypes — Substrate

## What Is This Project?

fvtt-prototypes is a Foundry Virtual Tabletop module for prototyping and experimenting with custom functionality. It is built with plain JavaScript (ES Modules) and loaded directly by Foundry VTT — no build step required.

## Navigation

| Document | Purpose |
|----------|---------|
| `.context/substrate.md` | You are here. Project overview and navigation. |
| `.context/architecture/overview.md` | Module architecture, lifecycle, and component design. |

## Key Concepts

- **Module Manifest** (`module.json`): Declares the module's identity, compatibility range, scripts, styles, and dependencies to Foundry VTT.
- **Hooks**: Foundry's event system. Modules use `Hooks.on()` and `Hooks.once()` to react to application lifecycle events (e.g., `init`, `ready`, `renderApplication`).
- **Documents & Data Models**: Foundry's data layer. Actors, Items, Scenes, and other entities are "Documents" backed by a schema-driven data model.
- **Applications (AppV2)**: Foundry's UI framework for rendering sheets, dialogs, and sidebars using Handlebars templates.

## Module Identity

- **Module ID**: `fvtt-prototypes`
- **Namespace prefix**: `fvtt-prototypes` (used for CSS classes, hooks, flags, and socket events)

## Compatibility

Target the Foundry VTT V12+ API unless otherwise specified.

## Conventions

- All module scripts use ES module syntax (`import`/`export`).
- CSS classes are prefixed with the module ID: `.fvtt-prototypes--element`.
- Flags stored on documents use the module ID as the scope: `document.getFlag('fvtt-prototypes', 'key')`.
- Socket events are namespaced: `module.fvtt-prototypes`.
