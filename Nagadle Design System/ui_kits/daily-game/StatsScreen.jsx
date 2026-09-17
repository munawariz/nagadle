const { Button, Card, ArrowLink, WaveLine, Icon } = window.NagadleDesignSystem_bb132e;

function StatBlock({ value, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 72 }}>
      <span className="ngd-numeric" style={{ fontSize: 28, lineHeight: 1 }}>{value}</span>
      <span className="ngd-label" style={{ color: 'var(--text-muted)' }}>{label}</span>
    </div>
  );
}

function StatsScreen({ onHome }) {
  const s = window.NAGADLE_STATS;
  const max = Math.max(...s.distribution.map((d) => d.count));
  return (
    <React.Fragment>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <h1 style={{ fontSize: 'var(--size-display)' }}>Your record</h1>
        <WaveLine tone="done" width={180} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
        <StatBlock value={s.played} label="Played" />
        <StatBlock value={`${s.winRate}%`} label="Perfect" />
        <StatBlock value={s.streak} label="Streak" />
        <StatBlock value={s.best} label="Best" />
      </div>

      <Card title="Score spread" description="How today's five usually go for you.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
          {s.distribution.map((d, i) => (
            <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <span className="ngd-numeric" style={{ fontSize: 'var(--size-label)', width: 26, color: 'var(--text-muted)' }}>{d.label}</span>
              <div style={{ flex: 1, height: 18, background: 'var(--surface-sunken)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                <div style={{
                  width: `${Math.max(6, (d.count / max) * 100)}%`, height: '100%',
                  background: i === 0 ? 'var(--lime-500)' : 'var(--lime-400)',
                  borderRadius: 'var(--radius-sm)',
                }} />
              </div>
              <span className="ngd-numeric" style={{ fontSize: 'var(--size-label)', width: 22, textAlign: 'right' }}>{d.count}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card
        title="Streak watch"
        description="Nineteen more days to beat your best run."
        meta={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon name="flame" size={18} color="var(--red-500)" />12 / 31</span>}
        action={<Button size="sm" variant="danger" icon="x">Reset</Button>}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <Button fullWidth variant="moss" icon="calendar-days">Browse the archive</Button>
        <ArrowLink href="#home" onClick={(e) => { e.preventDefault(); onHome(); }}>Back to today</ArrowLink>
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { StatsScreen, StatBlock });
