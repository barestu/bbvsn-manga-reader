import { Model } from '@nozbe/watermelondb';
import { date, readonly, text } from '@nozbe/watermelondb/decorators';

export default class Source extends Model {
  static table = 'sources';

  @text('name') name: any;
  @text('url') url: any;
  @readonly @date('updated_at') updatedAt: any;
}
