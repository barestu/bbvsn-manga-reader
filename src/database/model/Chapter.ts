import { Model } from '@nozbe/watermelondb';
import { relation, text } from '@nozbe/watermelondb/decorators';

export default class Chapter extends Model {
  static table = 'chapters';

  @text('slug') slug: any;
  @text('name') name: any;
  @text('type') type: any;
  @text('published_at') publishedAt: any;

  @relation('mangas', 'manga_id') manga: any;
}
