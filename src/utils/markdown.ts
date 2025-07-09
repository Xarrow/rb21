import { marked } from 'marked';
import hljs from 'highlight.js';

// Configure marked options
marked.setOptions({
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value;
      } catch (err) {
        console.warn('Highlight.js error:', err);
      }
    }
    return hljs.highlightAuto(code).value;
  },
  breaks: true,
  gfm: true,
});

export function parseMarkdown(content: string): string {
  if (!content) return '';
  try {
    return marked(content);
  } catch (error) {
    console.error('Markdown parsing error:', error);
    return content;
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}