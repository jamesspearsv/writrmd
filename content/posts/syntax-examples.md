---
title: "Syntax Examples"
author: "James Spears, V"
date: "Thu Mar 27 2025 13:36:25 GMT-0400 (Eastern Daylight Time)"
tags: ["Markdown"]
excerpt: "A reference post of all markdown syntax and styling currently supported by Writr.md"
published: true
---
# Heading 1

## Heading 2

### Heading 3

#### Heading 4

This is a dummy paragraph. Architecto aeneus natus calco conventus magni admoneo, sed vere absconditus minus cupressus sollers. Ultra subvenio claro accusator voco, nihil succurro doloribus territo arguo spiculum. Peior absens curtus culpa venustas. Turbo amplitudo tergum commodo derelinquo volo, advoco magni tam aveho aufero, decretum confero admoveo uter cupio.

Adversus una ducimus umquam crepusculum vetus textor, uterque velut ter cado combibo astrum, anser correptius distinctio depereo traho tener blandior. Depraedor ars derideo cohaero viriliter. Desolo conculco victus impedit deprecator, auctor commodi officia amita depromo suscipio clam, nemo quasi sublime tabesco denuo cupiditas curia, cumque volaticus pauper cilicium repudiandae vaco.

- List item
- List item
- List item

1. List item 1
2. List item 2
3. List item 3

- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media

Inline code snippets `const hello='world'`

```tsx
export default function MarkdownWrapper(props: MarkdownWrapperProps) {
  return (
    <div className="markdown-wrapper">
      <Markdown remarkPlugins={[remarkGfm]}>{props.value}</Markdown>
    </div>
  );
}
```

> Adversus una ducimus umquam crepusculum vetus textor, uterque velut ter cado combibo astrum, anser correptius distinctio depereo traho tener blandior. Depraedor ars derideo cohaero viriliter.

### Below is a break

---

This is **bold**

This is _italic_

~The world is flat.~

[Link](#)

Here's a simple footnote[^1] and here's a longer one.[^2]

| Syntax    | Description |
| --------- | ----------- |
| Header    | Title       |
| Paragraph | Text        |

[^1]: This is the first footnote.
[^2]: Here's one with multiple paragraphs and code.










