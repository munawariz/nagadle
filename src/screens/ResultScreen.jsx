import React from 'react';
import { Button } from '@ds/components/actions/Button.jsx';
import { ArrowLink } from '@ds/components/actions/ArrowLink.jsx';
import { Card } from '@ds/components/surfaces/Card.jsx';
import { Icon } from '@ds/components/icon/Icon.jsx';
import { Mascot } from '@ds/components/surfaces/Mascot.jsx';
import { WavePattern } from '@ds/components/surfaces/WavePattern.jsx';
import { mascotUrl } from '../components/AppShell.jsx';
import { msUntilNextDay, puzzleNumber } from '../lib/day.js';

function Countdown() {
  const [left, setLeft] = React.useState(() => msUntilNextDay());
  React.useEffect(() => {
    let prev = msUntilNextDay();
    const t = setInterval(() => {
      const ms = msUntilNextDay();
      // Wrapped past midnight: a new puzzle is out.
      if (ms > prev + 1000) window.location.reload();
      prev = ms;
      setLeft(ms);
    }, 1000);
    return () => clearInterval(t);
  }, []);
  const s = Math.floor(left / 1000);
  const pad = (n) => String(n).padStart(2, '0');
  return <span className="ngd-numeric">{pad(Math.floor(s / 3600))}:{pad(Math.floor((s % 3600) / 60))}:{pad(s % 60)}</span>;
}

function verdictFor(score, total) {
  if (score === total) return 'Clean sweep!';
  if (score === total - 1) return 'So close.';
  if (score >= 2) return 'Not bad.';
  return 'Rough one.';
}

export function ResultScreen({ day, prompts, answers, streak, onStats, onHome }) {
  const total = prompts.length;
  const score = prompts.filter((p) => answers[p.slot]?.correct).length;
  const number = puzzleNumber(day);
  const [copied, setCopied] = React.useState(false);

  async function share() {
    // Try number for a solved message, X for a miss.
    const marks = prompts.map((p) => (answers[p.slot]?.correct ? answers[p.slot].guesses.length : 'X')).join(' ');
    const text = `nagadle #${number} · ${score}/${total}\n${marks}\nstreak ${streak}\n${window.location.origin}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <>
      <WavePattern tone="moss" height={160} style={{ borderRadius: 'var(--radius-md)', display: 'grid', placeItems: 'center' }}>
        <Mascot src={mascotUrl} size={140} alt="" className="ngd-pop" />
      </WavePattern>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <h1>{verdictFor(score, total)}</h1>
        <p style={{ fontSize: 'var(--size-body-lg)' }}>
          You got <span className="ngd-numeric">{score}</span> of <span className="ngd-numeric">{total}</span> on puzzle <span className="ngd-numeric">#{number}</span>.
        </p>
      </div>

      <Card
        active
        title={streak > 1 ? 'Streak kept' : 'Streak started'}
        description="Come back tomorrow before midnight and it keeps going."
        meta={(
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Icon name="flame" size={18} color="var(--yellow-500)" />
            {streak} {streak === 1 ? 'day' : 'days'}
          </span>
        )}
        action={<Button size="sm" variant="warn" icon={copied ? 'check' : 'share-2'} onClick={share}>{copied ? 'Copied' : 'Share'}</Button>}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <span className="ngd-label" style={{ color: 'var(--text-muted)' }}>Today's messages</span>
        {prompts.map((p, i) => {
          const a = answers[p.slot];
          const note = a.correct
            ? (a.guesses.length > 1 ? ` · try ${a.guesses.length}` : null)
            : ` · you said ${a.guesses.join(', ')}`;
          return (
            <Card key={p.slot} className="ngd-enter" style={{ padding: 'var(--space-4) var(--space-5)', gap: 'var(--space-2)', animationDelay: `${i * 60}ms` }}>
              <p style={{
                maxWidth: 'none', fontSize: 'var(--size-body)', overflowWrap: 'anywhere', whiteSpace: 'pre-line',
                display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
              }}>
                {p.text}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
                <span style={{ fontWeight: 'var(--weight-extrabold)', color: 'var(--text-accent)' }}>
                  {a.answer}
                  {note ? <span style={{ fontWeight: 'var(--weight-medium)', color: 'var(--text-muted)' }}>{note}</span> : null}
                </span>
                <span style={{
                  display: 'grid', placeItems: 'center', width: 24, height: 24, flex: '0 0 auto', borderRadius: 'var(--radius-pill)',
                  background: a.correct ? 'var(--state-correct)' : 'var(--state-wrong)',
                  color: a.correct ? 'var(--state-correct-ink)' : 'var(--state-wrong-ink)',
                }}>
                  <Icon name={a.correct ? 'check' : 'x'} size={14} label={a.correct ? 'Correct' : 'Wrong'} />
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4)', background: 'var(--surface-tile)', borderRadius: 'var(--radius-md)' }}>
        <span className="ngd-label">Next puzzle</span>
        <Countdown />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <Button fullWidth icon="chart-column" onClick={onStats}>See your stats</Button>
        <ArrowLink href="#home" onClick={(e) => { e.preventDefault(); onHome(); }}>Back to today</ArrowLink>
      </div>
    </>
  );
}
