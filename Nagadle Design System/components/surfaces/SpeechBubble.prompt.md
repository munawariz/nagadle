The mascot's speech bubble — white plate, 16px radius, soft moss shadow, flat tail. Use it for anything the turtle "says": the question, verdicts, hints.

```jsx
<SpeechBubble tail="bottom-left" tailOffset={40}>
  <h1 style={{fontSize:26}}>A turtle lives how many years?</h1>
</SpeechBubble>
<Mascot src="../../assets/mascot-nagadle.png" size={84} />
```

Notes
- The tail always points at the mascot; put the mascot directly under (or beside) the offset.
- One bubble per screen. Body copy inside stays 14–16px; a question can go to 24–26px.
- `tone="moss"` for result lines only — never two bubbles in different tones at once.
