# Architecture Overview

## Module Lifecycle

Foundry VTT modules follow a hook-driven lifecycle:

```
┌─────────┐     ┌──────┐     ┌───────┐     ┌─────────────────┐
│  init   │────▶│setup │────▶│ ready │────▶│ renderApplication│
│         │     │      │     │       │     │   (per sheet)    │
└─────────┘     └──────┘     └───────┘     └─────────────────┘
```

- **`init`**: Register settings via `registerSettings()`. No world data yet.
- **`ready`**: Register roll hooks, socket listeners, chat commands, render tracker, expose API.
- **`canvasReady`**: Re-render the tracker on scene changes.

## Entry Point

```json
{
  "esmodules": ["scripts/main.js"]
}
```

`scripts/main.js` imports all subsystems and wires them into the hook lifecycle.

## Directory Layout

```
scripts/
├── main.js              # Entry point — hook registration and API exposure
├── constants.js         # Module ID, setting keys, socket name, thematic messages
├── settings.js          # Game settings (registerSetting calls)
├── misfortune-pool.js   # Pool CRUD: getPool, setPool, addMisfortune, spendMisfortune, resetPool
├── chat-commands.js     # /misfortune and /mf chat command handler
├── socket.js            # Socket listener for cross-client tracker sync
├── hooks/
│   └── roll-hooks.js    # WFRP4e roll test hook listeners (88 detection)
└── apps/
    ├── tracker.js       # Floating tracker widget (renderTracker, updateTrackerDisplay)
    └── log-viewer.js    # MisfortuneLogViewer Application class

styles/
└── module.css           # Grimdark-themed styles for tracker, chat messages, and log viewer

templates/
└── log-viewer.hbs       # Handlebars template for the event log

languages/
└── en.json              # English localization strings for settings
```

## Component Patterns

### Settings Registration

Register settings during the `init` hook:

```js
Hooks.once('init', () => {
  registerSettings();
});
```

Settings include the pool counter (hidden), event log (hidden), player visibility toggle, trigger value, and chat flavor toggle.

### Roll Hook Detection

Listen to all WFRP4e roll hooks. Only the GM client processes them to avoid duplicates:

```js
const WFRP_ROLL_HOOKS = [
  'wfrp4e:rollTest',
  'wfrp4e:rollWeaponTest',
  'wfrp4e:rollCastTest',
  'wfrp4e:rollChannelTest',
  'wfrp4e:rollPrayerTest',
  'wfrp4e:rollTraitTest',
  'wfrp4e:rollIncomeTest'
];
```

### Socket Communication

Real-time sync of the tracker across all connected clients:

```js
// Emitting (after pool change)
game.socket.emit('module.wfrp4e-misfortune', { action: 'updateTracker', pool });

// Receiving
game.socket.on('module.wfrp4e-misfortune', ({ action, pool }) => {
  if (action === 'updateTracker') updateTrackerDisplay(pool);
});
```

### Module API

Exposed at `game.modules.get("wfrp4e-misfortune").api`:

```js
api.getPool();                          // Returns current count
api.addMisfortune("Player Name", 88);   // Add 1 point
api.spendMisfortune();                  // Spend 1 point
api.resetPool();                        // Reset to 0
api.renderTracker();                    // Re-render the UI widget
```

## Foundry API References

- **Documents**: `game.actors`, `game.items`, `game.scenes`, `game.journal`
- **Canvas**: `canvas.tokens`, `canvas.tiles`, `canvas.drawings`
- **UI**: `ui.notifications`, `ui.sidebar`, `Dialog`, `Application`
- **Utilities**: `foundry.utils.mergeObject()`, `foundry.utils.duplicate()`
- **WFRP4e Hooks**: `wfrp4e:rollTest`, `wfrp4e:rollWeaponTest`, etc.
