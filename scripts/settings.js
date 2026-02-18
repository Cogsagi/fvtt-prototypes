const MODULE_ID = 'fvtt-prototypes';

export function registerSettings() {
  game.settings.register(MODULE_ID, 'enablePrototypes', {
    name: 'FVTT-PROTOTYPES.Settings.EnablePrototypes',
    hint: 'FVTT-PROTOTYPES.Settings.EnablePrototypesHint',
    scope: 'world',
    config: true,
    type: Boolean,
    default: true
  });
}
