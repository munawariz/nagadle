const { Button, Card, Input, Mascot, WavePattern, StepDots, ArrowLink, Icon } = window.NagadleDesignSystem_bb132e;

function Countdown() {
  const [left, setLeft] = React.useState(() => 6 * 3600 + 11 * 60 + 9);
  React.useEffect(() => {
    const t = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const h = String(Math.floor(left / 3600)).padStart(2, '0');
  const m = String(Math.floor((left % 3600) / 60)).padStart(2, '0');
  const s = String(left % 60).padStart(2, '0');
  return <span className="ngd-numeric">{h}:{m}:{s}</span>;
}

function ResultScreen({ score, total, onStats, onHome }) {
  const [shared, setShared] = React.useState(false);
  const verdict = score === total ? 'Clean sweep.' : score >= total - 1 ? 'So close.' : score >= 2 ? 'Not bad.' : 'Rough one.';
  return (
    <React.Fragment>
      <WavePattern tone="moss" height={160} style={{ borderRadius: 'var(--radius-md)', display: 'grid', placeItems: 'center' }}>
        <Mascot src={window.MASCOT} size={140} />
      </WavePattern>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <h1 style={{ fontSize: 'var(--size-display)' }}>{verdict}</h1>
        <p style={{ fontSize: 'var(--size-body-lg)' }}>You got <span className="ngd-numeric">{score}</span> of <span className="ngd-numeric">{total}</span> on puzzle #{window.NAGADLE_PUZZLE.number}.</p>
      </div>

      <Card
        active
        title="Streak kept"
        description="Come back tomorrow before midnight and it keeps going."
        meta={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon name="flame" size={18} color="var(--yellow-500)" />12 days</span>}
        action={<Button size="sm" variant="warn" icon={shared ? 'check' : 'share-2'} onClick={() => setShared(true)}>{shared ? 'Copied' : 'Share'}</Button>}
      />

      {shared ? (
        <Input label="Copied to your clipboard" value={`Nagadle #${window.NAGADLE_PUZZLE.number} · ${score}/${total} · streak 12`} readOnly inputStyle={{ fontWeight: 'var(--weight-extrabold)' }} />
      ) : null}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <span className="ngd-label" style={{ color: 'var(--text-muted)' }}>Today's answers</span>
        <StepDots orientation="horizontal" size={18} steps={Array.from({ length: total }, (_, i) => ({ state: i < score ? 'done' : 'next' }))} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4)', background: 'var(--surface-tile)', borderRadius: 'var(--radius-md)' }}>
        <span className="ngd-label">Next puzzle</span>
        <Countdown />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <Button fullWidth icon="chart-column" onClick={onStats}>See your stats</Button>
        <ArrowLink href="#home" onClick={(e) => { e.preventDefault(); onHome(); }}>Back to today</ArrowLink>
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { ResultScreen, Countdown });
