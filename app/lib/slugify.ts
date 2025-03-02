import { randomBytes } from 'crypto';
import slugify from 'slugify';

export function uniqueSlugify(string: string) {
  const bytes = randomBytes(4);
  const uuid = bytes.toString('hex');
  const slug = slugify(string, {
    lower: true,
    remove: /[<>:"/\\|?*\.,;!@#%^&(){}\[\]~`'$=+]/g,
  });

  return `${slug}-${uuid}`;
}
