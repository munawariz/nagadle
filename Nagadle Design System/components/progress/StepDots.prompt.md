Progress dots for a multi-step run — faint ring for upcoming, yellow ring for the step you're on, filled yellow check for done.

```jsx
<StepDots orientation="horizontal" steps={[{state:'done'},{state:'done'},{state:'current'},{state:'next'},{state:'next'}]} />
<StepDots steps={[{state:'done',label:'Warm-up'},{state:'current',label:'Round 2'},{state:'next',label:'Final'}]} />
```

Notes
- Yellow is the *progress* colour; lime stays reserved for actions and correct answers.
- Pair with `WaveLine` between dots when the steps form a journey across a screen.
