import React from 'react';

/* Speech bubble for the mascot: white plate, 16px radius, soft moss shadow,
   flat triangular tail. Moss tone inverts it for the mascot's louder moments. */
export function SpeechBubble({
  children,
  tail = 'bottom-left',
  tone = 'white',
  tailOffset = 32,
  style,
  ...rest
}) {
  const bg = tone === 'moss' ? 'var(--surface-card-active)' : 'var(--surface-card)';
  const ink = tone === 'moss' ? 'var(--text-inverse)' : 'var(--text-body)';
  const size = 18;

  const tailBase = { position: 'absolute', width: 0, height: 0, borderStyle: 'solid' };
  const tails = {
    'bottom-left': { ...tailBase, left: tailOffset, top: '100%', borderWidth: `${size}px ${size}px 0 0`, borderColor: `${bg} transparent transparent transparent` },
    'bottom-center': { ...tailBase, left: '50%', marginLeft: -size / 2, top: '100%', borderWidth: `${size}px ${size / 2}px 0 ${size / 2}px`, borderColor: `${bg} transparent transparent transparent` },
    left: { ...tailBase, right: '100%', top: tailOffset, borderWidth: `0 ${size}px ${size}px 0`, borderColor: `transparent ${bg} transparent transparent` },
  };

  return (
    <div
      style={{
        position: 'relative',
        padding: 'var(--space-5) var(--space-6)',
        background: bg,
        color: ink,
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-card)',
        ...style,
      }}
      {...rest}
    >
      {children}
      <span style={tails[tail] || tails['bottom-left']} />
    </div>
  );
}
