import { appSchema, tableSchema } from '@nozbe/watermelondb';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'sources',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'url', type: 'string' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'mangas',
      columns: [
        { name: 'title', type: 'string' },
        { name: 'title_slug', type: 'string' },
        { name: 'title_alt', type: 'string', isOptional: true },
        { name: 'cover_url', type: 'string', isOptional: true },
      ],
    }),
    tableSchema({
      name: 'chapters',
      columns: [
        { name: 'slug', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'type', type: 'string', isOptional: true },
        { name: 'manga_id', type: 'string' },
        { name: 'published_at', type: 'string', isOptional: true },
      ],
    }),
  ],
});
