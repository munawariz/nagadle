import React from 'react';
import { Button } from '@ds/components/actions/Button.jsx';
import { ArrowLink } from '@ds/components/actions/ArrowLink.jsx';
import { Icon } from '@ds/components/icon/Icon.jsx';
import { Mascot } from '@ds/components/surfaces/Mascot.jsx';
import { StepDots } from '@ds/components/progress/StepDots.jsx';
import { WaveLine } from '@ds/components/progress/WaveLine.jsx';
import { mascotUrl } from '../components/AppShell.jsx';
import { PixelBubble } from '../components/PixelBubble.jsx';
import { GuessField, findMember } from '../components/GuessField.jsx';
import { checkAnswer } from '../lib/api.js';
import { formatSentAt } from '../lib/day.js';
import { MAX_TRIES } from '../lib/progress.js';

/* Step dots joined by the kit's wavy connector. */
function RoundRail({ total, current, answered }) {
  const items = [];
  for (let i = 0; i < total; i += 1) {
    const state = answered[i] ? 'done' : i === current ? 'current' : 'next';
    items.push(<StepDots key={`d${i}`} orientation="horizontal" size={16} steps={[{ state }]} />);
    if (i < total - 1) items.push(<WaveLine key={`w${i}`} tone={answered[i] ? 'done' : 'next'} width={44} />);
  }
  return <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>{items}</div>;
}

// Long messages get smaller type so the bubble stays readable.
function promptSize(text) {
  if (text.length <= 40) return 26;
  if (text.length <= 90) return 22;
  if (text.length <= 160) return 18;
  return 16;
}

const ORDINAL = ['first', 'second', 'third'];

/* Wrong guesses so far, plus how many tries are left. */
function TriesRow({ wrong }) {
  const left = MAX_TRIES - wrong.length;
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
        {wrong.map((name) => (
          <span
            key={name}
            className="ngd-enter"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)', padding: '4px 10px 4px 8px',
              borderRadius: 'var(--radius-pill)', background: 'var(--surface-card)', boxShadow: 'var(--shadow-card)',
              fontWeight: 'var(--weight-extrabold)', fontSize: 'var(--size-body)',
            }}
          >
            <Icon name="x" size={14} color="var(--text-error)" label="Wrong" />
            <s style={{ textDecorationThickness: 2 }}>{name}</s>
          </span>
        ))}
      </div>
      <span className="ngd-label ngd-numeric" style={{ color: left === 1 ? 'var(--text-error)' : 'var(--text-muted)', marginLeft: 'auto' }}>
        {left} {left === 1 ? 'try' : 'tries'} left
      </span>
    </div>
  );
}

// "<Media omitted>", "[location]", "This message was deleted" and the like read as notes, not text.
const isNote = (text) => !text || /^(<[^>]+>|\[[\w ]+\]|This message was deleted|You deleted this message|Waiting for this message)$/.test(text);

/* The chat messages that came right after the prompt, one more per wrong guess, in the
   prompt's pixel bubble. The prompt sender's own messages sit on the right like the prompt;
   someone else's sit on the left with a darker shadow. */
function NextInChat({ hints }) {
  if (!hints.length) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
      <span className="ngd-label" style={{ color: 'var(--text-muted)' }}>New Message</span>
      {hints.map((h) => (
        <PixelBubble
          key={h.sentAt + h.text}
          className="ngd-enter"
          accent={h.sameSender === false ? 'var(--moss-700)' : undefined}
          tailX={h.sameSender === false ? '20px' : 'calc(100% - 48px)'}
          tailFlip={h.sameSender !== false}
          padding="var(--space-3) var(--space-4)"
          style={{ alignSelf: h.sameSender === false ? 'flex-start' : 'flex-end', maxWidth: '85%', minWidth: 160 }}
        >
          <p
            style={{
              maxWidth: 'none', margin: 0, fontSize: 'var(--size-body)', lineHeight: 1.4, whiteSpace: 'pre-wrap', overflowWrap: 'anywhere',
              ...(isNote(h.text) ? { fontStyle: 'italic', color: 'var(--text-muted)' } : { fontWeight: 'var(--weight-extrabold)', color: 'var(--text-strong)' }),
            }}
          >
            {h.text || 'Empty message'}
          </p>
          <span className="ngd-numeric" style={{ display: 'block', marginTop: 'var(--space-1)', textAlign: 'right', fontSize: 'var(--size-label)', color: 'var(--text-muted)' }}>
            {formatSentAt(h.sentAt)}
          </span>
        </PixelBubble>
      ))}
    </div>
  );
}

function Reveal({ result }) {
  const { correct, answer, guesses, sentAt } = result;
  return (
    <div className="ngd-enter" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)',
        padding: 'var(--space-4) var(--space-5)', borderRadius: 'var(--radius-md)',
        background: correct ? 'var(--state-correct)' : 'var(--state-wrong)',
        color: correct ? 'var(--state-correct-ink)' : 'var(--state-wrong-ink)',
      }}>
        <h2>It was {answer}.</h2>
        <Icon name={correct ? 'check' : 'x'} size={24} />
      </div>
      <div style={{ padding: 'var(--space-4)', background: 'var(--surface-tile)', borderRadius: 'var(--radius-md)' }}>
        <p style={{ fontSize: 'var(--size-body)' }}>
          {correct ? `Got it on the ${ORDINAL[guesses.length - 1] ?? guesses.length} try. ` : `You said ${guesses.join(', ')}. `}
          Sent {formatSentAt(sentAt)}.
        </p>
      </div>
    </div>
  );
}

export function RoundScreen({ day, prompts, members, answers, tries, hints, onAnswer, onWrongTry, onFinish, onHome }) {
  const total = prompts.length;
  const firstOpen = prompts.findIndex((p) => !answers[p.slot]);
  // After a guess the same prompt stays up (with its reveal) until "Next".
  const [revealIndex, setRevealIndex] = React.useState(null);
  const index = revealIndex ?? (firstOpen === -1 ? total - 1 : firstOpen);
  const prompt = prompts[index];
  const result = revealIndex != null ? answers[prompt.slot] : null;
  const wrong = tries[prompt.slot] ?? [];
  const shownHints = hints[prompt.slot] ?? [];

  const [guess, setGuess] = React.useState('');
  const [error, setError] = React.useState('');
  const [checking, setChecking] = React.useState(false);

  async function submit() {
    if (result || checking) return;
    const member = findMember(members, guess);
    if (!member) {
      setError(guess.trim() ? 'Not a valid answer' : 'Type a name first');
      return;
    }
    if (wrong.includes(member)) {
      setError('Already guessed');
      return;
    }
    const guesses = [...wrong, member];
    const lastTry = guesses.length >= MAX_TRIES;
    setChecking(true);
    setError('');
    try {
      const { correct, answer, sentAt, next } = await checkAnswer(day, prompt.slot, member, shownHints.length, lastTry);
      if (correct || lastTry) {
        onAnswer(prompt.slot, { correct, answer, sentAt, guesses });
        setRevealIndex(index);
      } else {
        onWrongTry(prompt.slot, guesses, [...shownHints, ...next]);
        setGuess('');
        setError(`Not ${member}`);
      }
    } catch (e) {
      setError(e.message || 'Could not check that');
    } finally {
      setChecking(false);
    }
  }

  function next() {
    setRevealIndex(null);
    setGuess('');
    if (index + 1 >= total) onFinish();
  }

  const answeredFlags = prompts.map((p) => !!answers[p.slot]);
  const isLast = index + 1 >= total;

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
        <RoundRail total={total} current={index} answered={answeredFlags} />
        <span className="ngd-label ngd-numeric" style={{ color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{index + 1} of {total}</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
        <PixelBubble key={prompt.slot} className="ngd-enter" tailX="calc(100% - 150px)">
          <p
            style={{
              maxWidth: 'none', margin: 0, fontWeight: 'var(--weight-black)', fontSize: promptSize(prompt.text),
              lineHeight: 1.3, whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', color: 'var(--text-strong)',
            }}
          >
            {prompt.text}
          </p>
        </PixelBubble>
        <Mascot src={mascotUrl} size={150} bob alt="The turtle, reading the message" style={{ alignSelf: 'flex-end', marginTop: 'var(--space-2)' }} />
      </div>

      <NextInChat hints={shownHints} />

      {result ? (
        <Reveal result={result} />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <GuessField
            members={members}
            value={guess}
            onChange={(v) => { setGuess(v); setError(''); }}
            onSubmit={submit}
            error={error}
          />
          <TriesRow wrong={wrong} />
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {result ? (
          <Button fullWidth onClick={next}>{isLast ? 'See result' : 'Next message'}</Button>
        ) : (
          <Button fullWidth onClick={submit} disabled={checking || !guess.trim()} icon="check">
            {checking ? 'Checking' : 'Lock it in'}
          </Button>
        )}
        <ArrowLink href="#home" onClick={(e) => { e.preventDefault(); onHome(); }}>Back to today</ArrowLink>
      </div>
    </>
  );
}
