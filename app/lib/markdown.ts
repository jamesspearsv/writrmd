import { marked } from 'marked';
import sanitizeHTML from 'sanitize-html';

/**
 * Parses a markdown string and returns sanitized html
 * @param {string} markdown
 * @returns {ReactNode}
 */
export async function sanitizeMarkdown(markdown: string) {
  const html = await marked.parse(markdown);
  return sanitizeHTML(html);
}
