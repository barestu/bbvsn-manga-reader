import axios from 'axios';
import { Q } from '@nozbe/watermelondb';
import log from '../utils/log';
import { database } from '../database';

interface ISourceManga {
  i: string; // slug/identifier
  s: string; // original title
  a: string; // alternative titles
}

class MangaSee {
  private name = 'MangaSee';
  private url = 'https://mangasee123.com';
  private api = axios.create({ baseURL: this.url });

  async initSource() {
    try {
      const sourceCollections = database.get('sources');
      const exists = await sourceCollections
        .query(Q.where('name', Q.eq(this.name)))
        .fetch();

      if (!exists.length) {
        return await database.write(async () => {
          return sourceCollections.create((record: any) => {
            record.name = this.name;
            record.url = this.url;
          });
        });
      }

      return exists[0];
    } catch (err) {
      log(err);
      throw new Error('Init source failed');
    }
  }

  async syncSource() {
    try {
      await this.initSource();

      const response = await this.api.get<ISourceManga[]>('/_search.php');

      const mapped = response.data.map((item) => ({
        title: item.s,
        titleSlug: item.i,
        titleAlt: item.a,
      }));

      const mangaCollections = database.get('mangas');
      const result = await database.write(() => {
        const prepareBulk = mapped.map((item) => {
          return mangaCollections.prepareCreate((record: any) => {
            record.title = item.title;
            record.titleSlug = item.titleSlug;
            record.titleAlt = JSON.stringify(item.titleAlt);
          });
        });

        return database.batch(prepareBulk);
      });

      return result;
    } catch (err) {
      throw new Error('Sync source failed');
    }
  }

  async getMangaDetails(title: string) {
    this.api.get(`/manga/${title}`);
  }
}

export const mangaSeeSource = new MangaSee();
