const { Button, Card, StepDots, WaveLine, ArrowLink, Icon, SpeechBubble, Mascot } = window.NagadleDesignSystem_bb132e;

/* Progress rail: step dots joined by the kit's wavy connector. */
function RoundRail({ total, index, results }) {
  const items = [];
  for (let i = 0; i < total; i += 1) {
    const state = results[i] != null ? 'done' : i === index ? 'current' : 'next';
    items.push(<StepDots key={`d${i}`} orientation="horizontal" size={16} steps={[{ state }]} />);
    if (i < total - 1) items.push(<WaveLine key={`w${i}`} tone={results[i] != null ? 'done' : 'next'} width={44} />);
  }
  return <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>{items}</div>;
}

function RoundScreen({ onFinish }) {
  const rounds = window.NAGADLE_PUZZLE.rounds;
  const [index, setIndex] = React.useState(0);
  const [picked, setPicked] = React.useState(null);
  const [locked, setLocked] = React.useState(false);
  const [results, setResults] = React.useState([]);
  const round = rounds[index];
  const correct = picked === round.answer;

  function submit() {
    if (locked) {
      const next = index + 1;
      const tally = [...results];
      tally[index] = correct;
      setResults(tally);
      setPicked(null);
      setLocked(false);
      if (next >= rounds.length) onFinish(tally.filter(Boolean).length);
      else setIndex(next);
      return;
    }
    setLocked(true);
    const tally = [...results];
    tally[index] = picked === round.answer;
    setResults(tally);
  }

  function optionStyle(i) {
    if (!locked) return null;
    if (i === round.answer) return { background: 'var(--state-correct)', color: 'var(--state-correct-ink)', boxShadow: 'none' };
    if (i === picked) return { background: 'var(--state-wrong)', color: 'var(--state-wrong-ink)', boxShadow: 'none' };
    return { opacity: 0.45 };
  }

  return (
    <React.Fragment>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <RoundRail total={rounds.length} index={index} results={results} />
        <span className="ngd-label" style={{ color: 'var(--text-muted)' }}>{index + 1} of {rounds.length}</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <SpeechBubble tail="bottom-left" tailOffset={36}>
          <h1 style={{ fontSize: 26, lineHeight: 1.2 }}>{round.q}</h1>
        </SpeechBubble>
        <Mascot src={window.MASCOT} size={88} style={{ marginTop: 18, marginLeft: 14 }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {round.options.map((opt, i) => (
          <Card
            key={opt}
            active={!locked && picked === i}
            onClick={locked ? undefined : () => setPicked(i)}
            style={{ padding: '16px 20px', gap: 0, ...(optionStyle(i) || {}) }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
              <span style={{ fontWeight: 'var(--weight-extrabold)', fontSize: 'var(--size-body-lg)' }}>{opt}</span>
              {locked && i === round.answer ? <Icon name="check" size={20} color="var(--moss-900)" /> : null}
              {locked && i === picked && i !== round.answer ? <Icon name="x" size={20} color="var(--white)" /> : null}
            </div>
          </Card>
        ))}
      </div>

      {locked ? (
        <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start', padding: 'var(--space-4)', background: 'var(--surface-tile)', borderRadius: 'var(--radius-md)' }}>
          <Icon name={correct ? 'check' : 'circle-help'} size={18} color="var(--moss-900)" />
          <p style={{ fontSize: 'var(--size-body)', margin: 0 }}>{round.fact}</p>
        </div>
      ) : null}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <Button fullWidth disabled={picked === null} onClick={submit}>
          {locked ? (index + 1 === rounds.length ? 'See result' : 'Next question') : 'Lock it in'}
        </Button>
        <ArrowLink href="#home" onClick={(e) => { e.preventDefault(); onFinish(results.filter(Boolean).length); }}>Give up for today</ArrowLink>
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { RoundScreen, RoundRail });
