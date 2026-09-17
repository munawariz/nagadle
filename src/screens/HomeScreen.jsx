import React from 'react';
import { Button } from '@ds/components/actions/Button.jsx';
import { ArrowLink } from '@ds/components/actions/ArrowLink.jsx';
import { Icon } from '@ds/components/icon/Icon.jsx';
import { Mascot } from '@ds/components/surfaces/Mascot.jsx';
import { StepDots } from '@ds/components/progress/StepDots.jsx';
import { mascotUrl } from '../components/AppShell.jsx';
import { formatDay, puzzleNumber } from '../lib/day.js';
import { ROUNDS } from '../lib/progress.js';

export function HomeScreen({ day, answered, streak, onPlay, onStats }) {
  const cta = answered >= ROUNDS ? 'See result' : answered > 0 ? 'Keep going' : 'Play today';
  const steps = Array.from({ length: ROUNDS }, (_, i) => ({
    state: i < answered ? 'done' : i === answered ? 'current' : 'next',
  }));

  return (
    <>
      <Mascot src={mascotUrl} size={150} bob alt="" style={{ alignSelf: 'center' }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <h1>Who sent it?</h1>
        <p style={{ fontSize: 'var(--size-body-lg)' }}>
          Five real messages from the group. Name the sender of each one before midnight.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <Button fullWidth onClick={onPlay} disabled={!day}>{cta}</Button>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
          <span className="ngd-numeric" style={{ fontSize: 'var(--size-body)', color: 'var(--text-muted)' }}>
            {day ? `#${puzzleNumber(day)} · ${formatDay(day)}` : ' '}
          </span>
          <ArrowLink direction="forward" href="#stats" onClick={(e) => { e.preventDefault(); onStats(); }}>Your stats</ArrowLink>
        </div>
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)',
        padding: 'var(--space-4) var(--space-5)', background: 'var(--surface-tile)', borderRadius: 'var(--radius-md)',
      }}>
        <span className="ngd-numeric" style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--size-body-lg)' }}>
          <Icon name="flame" size={20} color="var(--red-500)" />
          Streak {streak}
        </span>
        <StepDots orientation="horizontal" size={14} steps={steps} aria-label={`${answered} of ${ROUNDS} answered today`} />
      </div>
    </>
  );
}
