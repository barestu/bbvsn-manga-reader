import axios from 'axios';
import { Q } from '@nozbe/watermelondb';
import DOMParser from 'advanced-html-parser';
import log from '../utils/log';
import { database } from '../database';
import { extractString } from '../utils/common';

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
      throw new Error();
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
      throw new Error();
    }
  }

  async search(query: string) {
    try {
      return database
        .get('mangas')
        .query(
          Q.or(
            Q.where('title', Q.like(`%${Q.sanitizeLikeString(query)}%`)),
            Q.where('title_alt', Q.like(`%${Q.sanitizeLikeString(query)}%`))
          )
        )
        .fetch();
    } catch (err) {
      log(err);
      throw new Error();
    }
  }

  async parseChapterList(slug: string) {
    try {
      const response = await this.api.get(`/manga/${slug}`, {
        responseType: 'text',
      });

      const doc = DOMParser.parse(response.data, { onlyBody: true });
      const scriptElements =
        doc.documentElement.querySelectorAll('body script');
      let mainFnStr = '';

      scriptElements.forEach((el) => {
        if (el.innerHTML && el.innerHTML.includes('MainFunction')) {
          mainFnStr = el.innerHTML;
        }
      });

      const chapterListStr = extractString(mainFnStr, {
        afterKeyword: 'vm.Chapters = ',
        beforeKeyword: ';',
      });

      const chapterList = JSON.parse(chapterListStr);

      return chapterList || [];
    } catch (err) {
      log(err);
      throw new Error();
    }
  }

  async getChapterList(slug: string) {
    try {
      const chapterList = await this.parseChapterList(slug);
      log(chapterList);
      return chapterList;
    } catch (err) {
      log(err);
      throw new Error();
    }
  }
}

export const mangaSeeSource = new MangaSee();
