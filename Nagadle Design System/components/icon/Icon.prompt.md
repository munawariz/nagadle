Nagadle's only icon primitive — renders a Lucide glyph that inherits `currentColor`; use it for every arrow, X, check and stat glyph in the product.

```jsx
<Icon name="arrow-right" size={20} />
<Icon name="flame" size={24} color="var(--red-500)" label="Streak" />
```

Notes
- Names are Lucide slugs (`arrow-right`, `arrow-left`, `x`, `check`, `share-2`, `flame`, `calendar-days`, `chart-column`, `circle-help`, `clock`).
- Decorative by default; pass `label` only when the icon is the sole carrier of meaning.
- The brand kit's food illustrations are *not* icons — never substitute a Lucide glyph for brand art, and never mix emoji in.
