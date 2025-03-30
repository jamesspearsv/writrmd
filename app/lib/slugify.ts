import { randomBytes } from 'crypto';
import slugify from 'slugify';

/**
 * A helper function to sanitize post titles and build unique post slugs
 * @param string A string to sanitize and slugify
 * @returns A unique slug based on the provided string
 */
export function uniqueSlugify(string: string) {
  const bytes = randomBytes(4);
  const uuid = bytes.toString('hex');
  const slug = slugify(string, {
    lower: true,
    remove: /[<>:"/\\|?*\.,;!@#%^&(){}\[\]~`'$=+]/g,
  });

  return `${slug}-${uuid}`;
}
