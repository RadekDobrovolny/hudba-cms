import * as migration_20260222_152616 from './20260222_152616';
import * as migration_20260222_204219_add_author_and_display_name from './20260222_204219_add_author_and_display_name';

export const migrations = [
  {
    up: migration_20260222_152616.up,
    down: migration_20260222_152616.down,
    name: '20260222_152616',
  },
  {
    up: migration_20260222_204219_add_author_and_display_name.up,
    down: migration_20260222_204219_add_author_and_display_name.down,
    name: '20260222_204219_add_author_and_display_name'
  },
];
