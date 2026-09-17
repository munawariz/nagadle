import React from 'react';
import { Button } from '@ds/components/actions/Button.jsx';
import { ArrowLink } from '@ds/components/actions/ArrowLink.jsx';
import { Card } from '@ds/components/surfaces/Card.jsx';
import { Icon } from '@ds/components/icon/Icon.jsx';
import { Mascot } from '@ds/components/surfaces/Mascot.jsx';
import { mascotUrl } from '../components/AppShell.jsx';
import { formatDay, msUntilNextDay, puzzleNumber } from '../lib/day.js';
import { MAX_TRIES } from '../lib/progress.js';
import { buildShareText } from '../lib/share.js';

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

/* One square per try: red miss, lime hit, faint ring for tries not needed. */
function TryPips({ answer }) {
  const used = answer.guesses.length;
  return (
    <span style={{ display: 'inline-flex', gap: 4 }} aria-label={answer.correct ? `Solved on try ${used}` : 'Missed'}>
      {Array.from({ length: MAX_TRIES }, (_, i) => {
        const state = i >= used ? 'unused' : answer.correct && i === used - 1 ? 'right' : 'wrong';
        return (
          <span
            key={i}
            style={{
              width: 14, height: 14, borderRadius: 3,
              background: state === 'right' ? 'var(--state-correct)' : state === 'wrong' ? 'var(--state-wrong)' : 'transparent',
              border: state === 'unused' ? 'var(--stroke-tile) solid var(--border-subtle)' : 'none',
            }}
          />
        );
      })}
    </span>
  );
}

function ShareCard({ text }) {
  const [status, setStatus] = React.useState('idle');
  const preRef = React.useRef(null);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus('copied');
    } catch {
      // Clipboard blocked: select the block so the player can copy it by hand.
      const range = document.createRange();
      range.selectNodeContents(preRef.current);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      setStatus('manual');
    }
  }

  return (
    <Card style={{ gap: 'var(--space-4)' }}>
      <span className="ngd-label" style={{ color: 'var(--text-muted)' }}>Your result</span>
      <pre
        ref={preRef}
        onClick={copy}
        style={{
          margin: 0, padding: 'var(--space-4)', background: 'var(--surface-tile)', borderRadius: 'var(--radius-field)',
          fontFamily: 'var(--font-core)', fontWeight: 'var(--weight-extrabold)', fontSize: 'var(--size-body-lg)',
          lineHeight: 1.5, whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', userSelect: 'all', cursor: 'copy',
        }}
      >
        {text}
      </pre>
      <Button fullWidth variant="warn" icon={status === 'copied' ? 'check' : 'copy'} onClick={copy}>
        {status === 'copied' ? 'Copied' : 'Copy result'}
      </Button>
      {status === 'manual' ? (
        <span style={{ fontSize: 'var(--size-label)', fontWeight: 'var(--weight-extrabold)', color: 'var(--text-muted)' }}>
          Clipboard blocked. The result is selected, copy it by hand.
        </span>
      ) : null}
    </Card>
  );
}

export function ResultScreen({ day, prompts, answers, streak, onStats, onHome }) {
  const total = prompts.length;
  const score = prompts.filter((p) => answers[p.slot]?.correct).length;
  const shareText = buildShareText({ day, prompts, answers, streak, url: window.location.origin });

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)' }}>
        <Mascot src={mascotUrl} size={120} alt="" className="ngd-pop" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
          <span className="ngd-label" style={{ color: 'var(--text-muted)' }}>
            #{puzzleNumber(day)} · {formatDay(day)}
          </span>
          <span className="ngd-numeric" style={{ fontSize: 64, lineHeight: 1, fontWeight: 'var(--weight-black)' }}>
            {score}
            <span style={{ color: 'var(--text-muted)', fontSize: 32 }}>/{total}</span>
          </span>
          <h1 style={{ fontSize: 'var(--size-heading)' }}>{verdictFor(score, total)}</h1>
        </div>
      </div>

      <ShareCard text={shareText} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <span className="ngd-label" style={{ color: 'var(--text-muted)' }}>Today's messages</span>
        {prompts.map((p, i) => {
          const a = answers[p.slot];
          return (
            <Card key={p.slot} className="ngd-enter" style={{ padding: 'var(--space-4) var(--space-5)', gap: 'var(--space-3)', animationDelay: `${i * 60}ms` }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
                <span className="ngd-label ngd-numeric" style={{ color: 'var(--text-muted)' }}>Message {i + 1}</span>
                <TryPips answer={a} />
              </div>
              <p style={{ maxWidth: 'none', fontSize: 'var(--size-body-lg)', overflowWrap: 'anywhere', whiteSpace: 'pre-line' }}>
                {p.text}
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                <Icon name={a.correct ? 'check' : 'x'} size={16} color={a.correct ? 'var(--moss-700)' : 'var(--text-error)'} style={{ alignSelf: 'center' }} />
                <span style={{ fontWeight: 'var(--weight-extrabold)', color: 'var(--text-accent)' }}>{a.answer}</span>
                {a.correct && a.guesses.length === 1 ? null : (
                  <span style={{ fontSize: 'var(--size-body)', color: 'var(--text-muted)' }}>
                    {a.correct ? 'after ' : 'you said '}
                    {(a.correct ? a.guesses.slice(0, -1) : a.guesses).join(', ')}
                  </span>
                )}
              </div>
            </Card>
          );
        })}
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
      />

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
