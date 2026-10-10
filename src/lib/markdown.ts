import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

marked.setOptions({ gfm: true, breaks: false });

export function renderMarkdown(md: string): string {
  const raw = marked.parse(md, { async: false }) as string;
  return sanitizeHtml(raw, {
    allowedTags: [
      "h1", "h2", "h3", "h4", "p", "a", "ul", "ol", "li", "strong", "em",
      "blockquote", "code", "pre", "hr", "table", "thead", "tbody", "tr",
      "th", "td", "img", "figure", "figcaption", "br",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "width", "height", "loading"],
      th: ["align"],
      td: ["align"],
    },
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", {
        rel: "noopener noreferrer",
        target: "_blank",
      }),
    },
    allowedSchemes: ["http", "https", "mailto"],
  });
}
