import React from 'react';
import { ArrowLink } from '@ds/components/actions/ArrowLink.jsx';
import { Card } from '@ds/components/surfaces/Card.jsx';
import { Icon } from '@ds/components/icon/Icon.jsx';
import { WaveLine } from '@ds/components/progress/WaveLine.jsx';

function StatBlock({ value, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 64 }}>
      <span className="ngd-numeric" style={{ fontSize: 28, lineHeight: 1 }}>{value}</span>
      <span className="ngd-label" style={{ color: 'var(--text-muted)' }}>{label}</span>
    </div>
  );
}

export function StatsScreen({ stats, onHome }) {
  const max = Math.max(1, ...stats.distribution.map((d) => d.count));
  const toBest = stats.best - stats.streak;

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <h1>Your record</h1>
        <WaveLine tone="done" width={180} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
        <StatBlock value={stats.played} label="Played" />
        <StatBlock value={`${stats.perfectRate}%`} label="Perfect" />
        <StatBlock value={stats.streak} label="Streak" />
        <StatBlock value={stats.best} label="Best" />
      </div>

      <Card title="Score spread" description={stats.played ? 'How your days usually go.' : 'Finish a day to start the chart.'}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
          {stats.distribution.map((d, i) => (
            <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <span className="ngd-numeric" style={{ fontSize: 'var(--size-label)', width: 26, color: 'var(--text-muted)' }}>{d.label}</span>
              <div style={{ flex: 1, height: 18, background: 'var(--surface-sunken)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                <div style={{
                  width: d.count ? `${Math.max(6, (d.count / max) * 100)}%` : 0, height: '100%',
                  background: i === 0 ? 'var(--lime-500)' : 'var(--lime-400)', borderRadius: 'var(--radius-sm)',
                  transition: 'width var(--dur-slow) var(--ease-out)',
                }} />
              </div>
              <span className="ngd-numeric" style={{ fontSize: 'var(--size-label)', width: 22, textAlign: 'right' }}>{d.count}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card
        title="Streak watch"
        description={
          stats.streak === 0 ? 'No streak running. Today is a good day to start one.'
            : toBest > 0 ? `${toBest} more ${toBest === 1 ? 'day' : 'days'} to beat your best run.`
              : 'This is your best run so far.'
        }
        meta={(
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Icon name="flame" size={18} color="var(--red-500)" />
            {stats.streak} / {stats.best}
          </span>
        )}
      />

      <p style={{ fontSize: 'var(--size-body)', color: 'var(--text-muted)' }}>
        Stats live in this browser only. Clearing site data resets them.
      </p>

      <ArrowLink href="#home" onClick={(e) => { e.preventDefault(); onHome(); }}>Back to today</ArrowLink>
    </>
  );
}
