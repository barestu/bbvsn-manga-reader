import { Model } from '@nozbe/watermelondb';
import { text } from '@nozbe/watermelondb/decorators';

export default class Manga extends Model {
  static table = 'mangas';

  @text('title') title: any;
  @text('title_slug') titleSlug: any;
  @text('title_alt') titleAlt: any;
  @text('cover_url') coverUrl: any;
}
