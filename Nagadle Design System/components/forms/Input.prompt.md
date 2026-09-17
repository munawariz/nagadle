The system's text field — label above, 2px rounded stroke, moss on focus, cherry red plus message on error.

```jsx
<Input label="Your guess" placeholder="Type a name" value={v} onChange={e => setV(e.target.value)} />
<Input label="Your guess" value="Nagadl" error="Not a valid answer" />
```

Notes
- Error text is 12px ExtraBold cherry red with a `circle-x` glyph; keep it to one short clause.
- Placeholder copy is an example, not an instruction ("Type a name", not "Please enter a name").
