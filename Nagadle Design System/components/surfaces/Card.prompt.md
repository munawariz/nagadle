Content card in two states, straight from the brand kit — white with a soft shadow, or filled deep moss when chosen.

```jsx
<Card title="Tokyo" description="Guess 2 of 5" meta="+120" action={<Button size="sm">Pick</Button>} />
<Card active title="Tokyo" description="Locked in" meta="+120" action={<Button size="sm" variant="warn" icon="x">Undo</Button>} />
```

Notes
- Answer choices in the game are Cards; `active` is the selected answer. Don't invent a separate tile component.
- Footer `meta` is ExtraBold tabular numerals — cherry red on white cards, cream on active ones.
- Radius is 10px and the shadow is soft and downward; never add a border.
