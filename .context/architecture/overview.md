# Architecture Overview

## Module Lifecycle

Foundry VTT modules follow a hook-driven lifecycle:

```
┌─────────┐     ┌──────┐     ┌───────┐     ┌─────────────────┐
│  init   │────▶│setup │────▶│ ready │────▶│ renderApplication│
│         │     │      │     │       │     │   (per sheet)    │
└─────────┘     └──────┘     └───────┘     └─────────────────┘
```

- **`init`**: Register settings, configure module state. No world data is available yet.
- **`setup`**: World data is loaded. Register additional configuration that depends on system/world context.
- **`ready`**: Foundry is fully initialized. Safe to interact with the canvas, sidebar, and all documents.
- **`renderApplication`**: Fired when a UI application renders. Used to inject HTML or modify sheets.

## Entry Point

The module's main script is registered in `module.json` under `esmodules`. Foundry loads it as an ES module during the `init` phase.

```json
{
  "esmodules": ["scripts/main.js"]
}
```

`scripts/main.js` should register hooks and bootstrap module functionality.

## Directory Layout

```
scripts/
├── main.js              # Entry point — hook registration
├── settings.js          # Game settings (registerSetting calls)
├── hooks/               # Hook handler functions, grouped by lifecycle phase
└── apps/                # Application classes (sheets, dialogs)

styles/
└── module.css           # All module styles, prefixed with module ID

templates/
└── *.hbs                # Handlebars templates for Application classes

languages/
└── en.json              # English localization strings
```

## Component Patterns

### Settings Registration

Register settings during the `init` hook:

```js
Hooks.once('init', () => {
  game.settings.register('fvtt-prototypes', 'mySetting', {
    name: 'My Setting',
    hint: 'Description of what this does.',
    scope: 'world',
    config: true,
    type: Boolean,
    default: false
  });
});
```

### Sheet Injection

Inject content into existing sheets via `render` hooks:

```js
Hooks.on('renderActorSheet', (app, html, data) => {
  // Add module UI to the actor sheet
});
```

### Socket Communication

For multi-client features, use Foundry's socket system:

```js
// Emitting
game.socket.emit('module.fvtt-prototypes', { action: 'doThing', payload });

// Receiving
game.socket.on('module.fvtt-prototypes', ({ action, payload }) => {
  if (action === 'doThing') handleDoThing(payload);
});
```

## Foundry API References

- **Documents**: `game.actors`, `game.items`, `game.scenes`, `game.journal`
- **Canvas**: `canvas.tokens`, `canvas.tiles`, `canvas.drawings`
- **UI**: `ui.notifications`, `ui.sidebar`, `Dialog`, `Application`
- **Utilities**: `foundry.utils.mergeObject()`, `foundry.utils.duplicate()`
