import React from 'react';
import { TextFrame } from '@ds/components/frames/TextFrame.jsx';
import { WavePattern } from '@ds/components/surfaces/WavePattern.jsx';
import { Mascot } from '@ds/components/surfaces/Mascot.jsx';
import { mascotUrl } from './AppShell.jsx';
import { Confetti } from './Confetti.jsx';

/* The birthday easter egg's payoff, shown on the result screen once the player has been
   through all five: on <name>'s birthday every message of the day was theirs. */

// The plate never wraps, so long names take a smaller size to stay inside the column.
const frameSize = (name) => (name.length > 7 ? 26 : name.length > 5 ? 30 : 34);

// What the group actually calls each other. The plate shows the name, the shout uses these.
const NICKNAMES = {
  Hariz: 'Riz',
  Shaddam: 'Dam',
  Aria: 'Ming',
  Rifki: 'Ki',
  Ganiya: 'Mew',
  Adrian: 'Dek',
  Dafa: 'Dub',
  Ilham: 'Ham',
  Aldy: 'Bal',
  Alsani: 'Al',
  Julianto: 'Jul',
  Septian: 'Ak',
  Hasbi: 'Bi',
  Dery: 'Der',
  Rey: 'Rey',
  Candra: 'Can',
};
// A member nobody has nicknamed yet falls back to the first syllable of their name.
const nickname = (name) => (NICKNAMES[name] ?? name.slice(0, 2)).toUpperCase();

export function BirthdayCheer({ name }) {
  const [burst, setBurst] = React.useState(0);

  return (
    <>
      <Confetti trigger={burst} />
      {/* The whole card throws more confetti; it is decorative, so it stays a plain region
          rather than a control, and the first burst fires on its own when the screen opens.
          ngd-pop sits on a wrapper: its fill-forwards transform would beat the hover one. */}
      <div className="ngd-pop">
        <section
          className="ngd-cheer"
          onClick={() => setBurst((n) => n + 1)}
          title="More confetti"
          style={{
            position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-lg)',
            background: 'var(--surface-card-active)', color: 'var(--text-inverse)', cursor: 'pointer',
          }}
        >
          <WavePattern tone="moss" height={120} style={{ position: 'absolute', inset: '0 0 auto 0', opacity: 0.4 }} />
          <div style={{
            position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 'var(--space-4)', padding: 'var(--space-8) var(--space-5) var(--space-6)', textAlign: 'center',
          }}>
            {/* The bob is an infinite animation on the image, so the lean goes on a wrapper. */}
            <span className="ngd-cheer-mascot" style={{ display: 'inline-block' }}>
              <Mascot src={mascotUrl} size={128} bob alt="" />
            </span>
            <h2 style={{ fontSize: 30, lineHeight: 'var(--lh-snug)', color: 'var(--text-inverse)' }}>Happy Birthday</h2>
            <span className="ngd-birthday-name">
              <TextFrame variant="overlap" accent="yellow" size={frameSize(name)}>{name}</TextFrame>
            </span>
            <p style={{
              color: 'var(--lime-200)', fontWeight: 'var(--weight-black)', fontSize: 'var(--size-heading)',
              letterSpacing: '0.02em',
            }}>
              EHHHHH {nickname(name)} HBD {nickname(name)}
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
