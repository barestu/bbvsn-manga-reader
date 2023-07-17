import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import log from '../utils/log';
import schema from './schema';
// import migrations from './migrations';
import Manga from './model/Manga';
import Source from './model/Source';

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
  schema,
  // (You might want to comment it out for development purposes -- see Migrations documentation)
  // migrations,
  // (optional database name or file system path)
  dbName: 'bbvsn_manga',
  jsi: true,
  onSetUpError: (error) => {
    // Database failed to load -- offer the user to reload the app or log out
    log('DB error', error);
  },
});

// Then, make a Watermelon database from it!
export const database = new Database({
  adapter,
  modelClasses: [
    Manga, // ⬅️ You'll add Models to Watermelon here
    Source,
  ],
});
