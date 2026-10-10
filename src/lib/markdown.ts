import { marked, type Tokens } from "marked";
import sanitizeHtml from "sanitize-html";
import { slugify } from "@/lib/utils";

marked.setOptions({ gfm: true, breaks: false });

// h2/h3 get stable slug ids so articles can be deep-linked and TOC'd.
const renderer = new marked.Renderer();
renderer.heading = function ({ tokens, depth }: Tokens.Heading) {
  const text = this.parser.parseInline(tokens);
  const plain = text.replace(/<[^>]+>/g, "");
  const id = slugify(plain);
  return depth === 2 || depth === 3
    ? `<h${depth} id="${id}">${text}</h${depth}>\n`
    : `<h${depth}>${text}</h${depth}>\n`;
};
marked.use({ renderer });

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
      h2: ["id"],
      h3: ["id"],
      th: ["align"],
      td: ["align"],
    },
    transformTags: {
      a: (tagName, attribs) => {
        const href = attribs.href ?? "";
        // Internal links stay same-tab; only external links open a new tab.
        const external = /^https?:\/\//.test(href);
        return {
          tagName: "a",
          attribs: external
            ? { ...attribs, rel: "noopener noreferrer", target: "_blank" }
            : attribs,
        };
      },
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: { a: ["http", "https", "mailto"] },
    allowProtocolRelative: false,
  });
}
