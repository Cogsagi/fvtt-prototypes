# wfrp4e-misfortune — Substrate

## What Is This Project?

wfrp4e-misfortune is a Foundry Virtual Tabletop module that implements a homebrew metacurrency for Warhammer Fantasy Roleplay 4th Edition. When any non-GM player rolls an 88 on a d100 test, the GM accumulates a Misfortune point — a dark reflection of Fortune that can be spent to reroll any NPC test.

## Navigation

| Document | Purpose |
|----------|---------|
| `.context/substrate.md` | You are here. Project overview and navigation. |
| `.context/architecture/overview.md` | Module architecture, lifecycle, and component design. |

## Key Concepts

- **Misfortune Pool**: A persistent counter of points the GM can spend. Stored in world settings and synced across clients via sockets.
- **Trigger Value**: The d100 roll result (default 88) that causes a Misfortune point to be earned. Configurable in settings.
- **Roll Hooks**: The module listens to all WFRP4e roll test hooks (`wfrp4e:rollTest`, `wfrp4e:rollWeaponTest`, etc.) to detect the trigger value.
- **Tracker Widget**: A floating grimdark UI element that displays the current pool and provides GM controls (spend, add, reset).
- **Chat Commands**: `/misfortune` (or `/mf`) for quick status, spending, resetting, and help.
- **Module API**: Exposed at `game.modules.get("wfrp4e-misfortune").api` for macros and other modules.

## Module Identity

- **Module ID**: `wfrp4e-misfortune`
- **Namespace prefix**: `wfrp4e-misfortune` (used for CSS classes, hooks, flags, and socket events)

## Compatibility

- **Foundry VTT**: V13+
- **WFRP4e System**: v9.0.0+ (verified 9.3.2)

## Conventions

- All module scripts use ES module syntax (`import`/`export`).
- CSS classes are prefixed with the module ID: `.wfrp4e-misfortune--element`.
- Socket events are namespaced: `module.wfrp4e-misfortune`.
- Shared constants (module ID, setting keys, thematic messages) live in `scripts/constants.js`.
- Only the GM client processes roll hooks and writes to world settings, preventing duplicate triggers.
