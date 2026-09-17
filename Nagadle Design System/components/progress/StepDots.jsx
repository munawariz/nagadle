import React from 'react';
import { Icon } from '../icon/Icon.jsx';

/* "Progress Bar Elements" from the brand kit: faint ring (next), thick yellow ring
   (current), filled yellow with a check (completed). */
const RING = {
  next: { border: 'var(--stroke-tile) solid var(--border-subtle)', background: 'transparent' },
  current: { border: '3px solid var(--yellow-500)', background: 'transparent' },
  done: { border: '3px solid var(--yellow-500)', background: 'var(--yellow-500)' },
};

export function StepDots({ steps = [], size = 18, orientation = 'vertical', style, ...rest }) {
  const vertical = orientation === 'vertical';
  return (
    <ol
      style={{
        display: 'flex',
        flexDirection: vertical ? 'column' : 'row',
        alignItems: vertical ? 'flex-start' : 'center',
        gap: vertical ? 'var(--space-3)' : 'var(--space-2)',
        margin: 0,
        padding: 0,
        listStyle: 'none',
        ...style,
      }}
      {...rest}
    >
      {steps.map((step, i) => {
        const state = step.state || 'next';
        return (
          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <span
              aria-label={state}
              style={{
                width: size,
                height: size,
                borderRadius: 'var(--radius-pill)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: '0 0 auto',
                transition: 'background var(--dur) var(--ease-out), border-color var(--dur) var(--ease-out)',
                ...RING[state],
              }}
            >
              {state === 'done' ? <Icon name="check" size={Math.round(size * 0.6)} color="var(--white)" /> : null}
            </span>
            {step.label ? (
              <span style={{ fontSize: 'var(--size-body)', color: state === 'next' ? 'var(--text-muted)' : 'var(--text-body)' }}>{step.label}</span>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
