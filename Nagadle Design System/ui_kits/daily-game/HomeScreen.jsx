const { Button, ArrowLink, Card, Mascot, WavePattern, StepDots } = window.NagadleDesignSystem_bb132e;

function HomeScreen({ onPlay, onStats }) {
  const p = window.NAGADLE_PUZZLE;
  return (
    <React.Fragment>
      <WavePattern height={150} style={{ borderRadius: 'var(--radius-md)', position: 'relative', display: 'grid', placeItems: 'center' }}>
        <Mascot src={window.MASCOT} size={150} bob style={{ marginTop: -18 }} />
      </WavePattern>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <h1 style={{ fontSize: 'var(--size-display)' }}>Five questions. One a day.</h1>
        <p style={{ fontSize: 'var(--size-body-lg)' }}>Answer today's five before midnight. Keep the streak, feed the turtle.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <Button fullWidth onClick={onPlay}>Play today</Button>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span className="ngd-numeric" style={{ fontSize: 'var(--size-body)', color: 'var(--text-muted)' }}>#{p.number} · {p.date}</span>
          <ArrowLink direction="forward" href="#stats" onClick={(e) => { e.preventDefault(); onStats(); }}>Your stats</ArrowLink>
        </div>
      </div>

      <Card
        title="How it works"
        description="One question at a time, four answers, no going back. Lime means you got it, red means you didn't — either way you move on."
        meta="Streak 12"
        action={<StepDots orientation="horizontal" size={14} steps={[{ state: 'done' }, { state: 'done' }, { state: 'current' }, { state: 'next' }, { state: 'next' }]} />}
      />
    </React.Fragment>
  );
}

Object.assign(window, { HomeScreen });
