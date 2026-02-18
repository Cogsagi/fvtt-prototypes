import { registerSettings } from './settings.js';

const MODULE_ID = 'fvtt-prototypes';

Hooks.once('init', () => {
  console.log(`${MODULE_ID} | Initializing`);
  registerSettings();
});

Hooks.once('ready', () => {
  console.log(`${MODULE_ID} | Ready`);
});
