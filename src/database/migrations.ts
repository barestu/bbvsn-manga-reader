import {
  createTable,
  schemaMigrations,
} from '@nozbe/watermelondb/Schema/migrations';

export default schemaMigrations({
  migrations: [
    {
      toVersion: 2,
      steps: [
        createTable({
          name: 'sources',
          columns: [
            { name: 'name', type: 'string' },
            { name: 'url', type: 'string' },
            { name: 'updated_at', type: 'number' },
          ],
        }),
        createTable({
          name: 'mangas',
          columns: [
            { name: 'title', type: 'string' },
            { name: 'title_slug', type: 'string' },
            { name: 'title_alt', type: 'string', isOptional: true },
            { name: 'cover_url', type: 'string', isOptional: true },
          ],
        }),
      ],
    },
  ],
});
