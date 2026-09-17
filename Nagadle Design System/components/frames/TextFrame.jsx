import React from 'react';

/* Pop-style text frames, Nagadle palette: cream/white plate, moss stroke, one accent
   offset. Every variant is built from geometry (borders, clip-path, gradients) —
   no imagery. `variant` picks the treatment; `accent` picks the offset colour. */

const ACCENTS = {
  lime: 'var(--lime-500)',
  red: 'var(--red-500)',
  yellow: 'var(--yellow-500)',
  moss: 'var(--moss-700)',
};

const PER_CHAR = ['diamonds', 'circles', 'separate', 'offset3d'];

export function TextFrame({
  children,
  variant = 'overlap',
  accent = 'lime',
  size = 20,
  ink = 'var(--moss-900)',
  style,
  ...rest
}) {
  const a = ACCENTS[accent] || ACCENTS.lime;
  const text = typeof children === 'string' ? children : '';
  const stroke = 3;
  const pad = `${Math.round(size * 0.5)}px ${Math.round(size * 1.05)}px`;

  const base = {
    position: 'relative',
    display: 'inline-block',
    fontFamily: 'var(--font-display)',
    fontWeight: 'var(--weight-black)',
    fontSize: size,
    lineHeight: 1.15,
    color: ink,
    letterSpacing: '0.01em',
    whiteSpace: 'nowrap',
  };

  /* ---- per-character variants ---- */
  if (PER_CHAR.includes(variant)) {
    const chars = [...text];
    if (variant === 'diamonds') {
      return (
        <span style={{ ...base, display: 'inline-flex', alignItems: 'center', ...style }} {...rest}>
          {chars.map((c, i) => (
            <span key={i} style={{
              width: size * 1.9, height: size * 1.9, marginLeft: i ? -size * 0.42 : 0,
              background: 'var(--white)', border: `${stroke}px solid ${ink}`, transform: 'rotate(45deg)',
              display: 'grid', placeItems: 'center', boxSizing: 'border-box',
            }}>
              <span style={{ transform: 'rotate(-45deg)' }}>{c}</span>
            </span>
          ))}
        </span>
      );
    }
    if (variant === 'circles') {
      return (
        <span style={{ ...base, display: 'inline-flex', alignItems: 'center', ...style }} {...rest}>
          {chars.map((c, i) => (
            <span key={i} style={{
              width: size * 2.1, height: size * 2.1, marginLeft: i ? -size * 0.3 : 0,
              background: 'var(--white)', border: `${stroke}px solid ${ink}`, borderRadius: '50%',
              display: 'grid', placeItems: 'center', boxSizing: 'border-box',
              boxShadow: `0 ${Math.round(size * 0.3)}px 0 ${a}`,
            }}>{c}</span>
          ))}
        </span>
      );
    }
    if (variant === 'separate') {
      return (
        <span style={{ ...base, display: 'inline-flex', alignItems: 'center', gap: Math.round(size * 0.5), ...style }} {...rest}>
          {chars.map((c, i) => (
            <span key={i} style={{
              padding: `${Math.round(size * 0.35)}px ${Math.round(size * 0.45)}px`,
              background: 'var(--white)', border: `${stroke}px solid ${ink}`, borderRadius: 3,
              boxShadow: `${Math.round(size * 0.25)}px ${Math.round(size * 0.25)}px 0 ${a}, ${Math.round(size * 0.25)}px ${Math.round(size * 0.25)}px 0 ${stroke}px ${ink}`,
            }}>{c}</span>
          ))}
        </span>
      );
    }
    return (
      <span style={{ ...base, display: 'inline-flex', alignItems: 'center', ...style }} {...rest}>
        {chars.map((c, i) => {
          const filled = i % 3 === 2;
          return (
            <span key={i} style={{
              padding: `${Math.round(size * 0.4)}px ${Math.round(size * 0.55)}px`,
              marginLeft: i ? -stroke : 0,
              background: filled ? a : 'var(--white)',
              color: filled ? 'var(--white)' : ink,
              border: `${stroke}px solid ${ink}`,
              transform: `rotate(${(i % 2 ? 4 : -5) + (i % 3) * 1.5}deg) translateY(${i % 2 ? 3 : -2}px)`,
              boxShadow: `${Math.round(size * 0.2)}px ${Math.round(size * 0.2)}px 0 -1px var(--white), ${Math.round(size * 0.2)}px ${Math.round(size * 0.2)}px 0 ${stroke - 1}px ${ink}`,
            }}>{c}</span>
          );
        })}
      </span>
    );
  }

  /* ---- single-plate variants ---- */
  const off = Math.round(size * 0.42);
  let plate = { padding: pad, background: 'var(--white)', border: `${stroke}px solid ${ink}`, position: 'relative', zIndex: 1, display: 'block' };
  let behind = null;
  let front = null;

  const offsetLayer = (bg, extra = {}) => ({
    position: 'absolute', left: off, top: off, right: -off, bottom: -off,
    background: bg, ...extra,
  });

  switch (variant) {
    case 'overlap':
      plate = { ...plate, border: 'none' };
      behind = <span style={offsetLayer(a)} />;
      break;
    case 'stroke':
      behind = <span style={offsetLayer(a, { border: `${stroke}px solid ${ink}`, left: off, top: off })} />;
      break;
    case 'box':
      plate = { ...plate, boxShadow: `${off}px ${off}px 0 -1px var(--white), ${off}px ${off}px 0 ${stroke - 1}px ${ink}` };
      break;
    case 'strokeInside':
      plate = { ...plate, padding: `${Math.round(size * 0.7)}px ${Math.round(size * 1.3)}px`, boxShadow: `inset 0 0 0 ${Math.round(size * 0.22)}px var(--white), inset 0 0 0 ${Math.round(size * 0.22) + 2}px ${ink}` };
      break;
    case 'dotted':
      behind = <span style={offsetLayer('transparent', {
        backgroundImage: `radial-gradient(${a} 40%, transparent 42%)`, backgroundSize: '8px 8px',
      })} />;
      break;
    case 'striped':
      behind = <span style={offsetLayer('transparent', {
        backgroundImage: `repeating-linear-gradient(45deg, ${a} 0 5px, transparent 5px 10px)`,
      })} />;
      break;
    case 'sticky':
      plate = { ...plate, border: 'none', paddingLeft: Math.round(size * 2.4) };
      behind = (
        <React.Fragment>
          <span style={offsetLayer(a)} />
          <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: Math.round(size * 1.5), background: a, zIndex: 2 }} />
        </React.Fragment>
      );
      break;
    case 'rounded':
      plate = { ...plate, borderRadius: 'var(--radius-pill)', padding: `${Math.round(size * 0.55)}px ${Math.round(size * 1.4)}px`, boxShadow: `0 ${off}px 0 ${a}` };
      break;
    case 'tape': {
      const lightTape = accent === 'lime' || accent === 'yellow';
      const tapeBg = accent === 'moss' ? 'var(--moss-900)' : a;
      plate = { ...plate, border: 'none', color: lightTape ? 'var(--moss-950)' : 'var(--cream)', backgroundColor: tapeBg,
        backgroundImage: `repeating-linear-gradient(45deg, ${lightTape ? 'rgba(43,48,17,.16)' : 'rgba(255,255,255,.3)'} 0 8px, transparent 8px 16px)`,
        clipPath: 'polygon(0 4%, 100% 0, 99% 96%, 1% 100%)', padding: `${Math.round(size * 0.6)}px ${Math.round(size * 1.3)}px` };
      break;
    }
    case 'memo':
      behind = <span style={offsetLayer(a, { top: off, left: off })} />;
      front = (
        <span style={{ position: 'absolute', top: -Math.round(size * 0.62), left: Math.round(size * 0.6), right: Math.round(size * 0.6), display: 'flex', justifyContent: 'space-between', zIndex: 3 }}>
          {Array.from({ length: 7 }).map((_, i) => (
            <span key={i} style={{ width: Math.round(size * 0.34), height: Math.round(size * 0.85), border: `${stroke - 1}px solid ${ink}`, borderRadius: 'var(--radius-pill)', background: 'transparent' }} />
          ))}
        </span>
      );
      break;
    case 'fold':
      plate = { ...plate, clipPath: `polygon(0 0, calc(100% - ${size}px) 0, 100% ${size}px, 100% 100%, 0 100%)` };
      front = <span style={{ position: 'absolute', right: 0, top: 0, width: size, height: size, background: a, clipPath: 'polygon(0 0, 100% 100%, 0 100%)', zIndex: 2 }} />;
      behind = <span style={offsetLayer(a, { left: off, top: off, clipPath: `polygon(0 0, calc(100% - ${size}px) 0, 100% ${size}px, 100% 100%, 0 100%)` })} />;
      break;
    case 'ribbon':
      plate = { ...plate, clipPath: `polygon(0 0, 100% 0, calc(100% - ${size}px) 50%, 100% 100%, 0 100%, ${size}px 50%)`, padding: `${Math.round(size * 0.5)}px ${Math.round(size * 1.9)}px` };
      behind = <span style={offsetLayer(a, { left: off, top: off, clipPath: `polygon(0 0, 100% 0, calc(100% - ${size}px) 50%, 100% 100%, 0 100%, ${size}px 50%)` })} />;
      break;
    case 'flag':
      plate = { ...plate, clipPath: `polygon(0 0, 100% 0, calc(100% - ${size}px) 50%, 100% 100%, 0 100%)`, padding: `${Math.round(size * 0.5)}px ${Math.round(size * 1.9)}px ${Math.round(size * 0.5)}px ${Math.round(size * 1.05)}px` };
      front = <span style={{ position: 'absolute', left: stroke, top: '100%', width: stroke, height: Math.round(size * 1.6), background: ink, zIndex: 0 }} />;
      break;
    case 'browser':
      plate = { ...plate, padding: 0, background: 'var(--white)' };
      front = null;
      return (
        <span style={{ ...base, ...style }} {...rest}>
          <span style={plate}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4, padding: `${Math.round(size * 0.22)}px ${Math.round(size * 0.35)}px`, borderBottom: `${stroke}px solid ${ink}` }}>
              {[a, a, a].map((c, i) => <span key={i} style={{ width: Math.round(size * 0.3), height: Math.round(size * 0.3), borderRadius: '50%', background: c, border: `1px solid ${ink}` }} />)}
            </span>
            <span style={{ display: 'block', padding: `${Math.round(size * 0.45)}px ${Math.round(size * 1.05)}px`, background: 'var(--moss-900)', color: 'var(--cream)' }}>{children}</span>
          </span>
        </span>
      );
    case 'pixel': {
      const s = Math.max(4, Math.round(size * 0.22));
      const nub = (pos) => ({ position: 'absolute', width: s * 2, height: s * 2, background: ink, zIndex: 2, ...pos });
      behind = <span style={offsetLayer(a, { left: off, top: off })} />;
      front = (
        <React.Fragment>
          <span style={nub({ left: -s, top: -s })} />
          <span style={nub({ right: -s, top: -s })} />
          <span style={nub({ left: -s, bottom: -s })} />
          <span style={nub({ right: -s, bottom: -s })} />
        </React.Fragment>
      );
      break;
    }
    case 'pin':
      behind = <span style={offsetLayer(a, { left: off, top: off })} />;
      front = (
        <span style={{ position: 'absolute', left: -Math.round(size * 0.45), top: -Math.round(size * 0.5), width: Math.round(size * 1.5), height: Math.round(size * 1.5), borderRadius: '50%', background: a, border: `${stroke}px solid ${ink}`, zIndex: 3 }}>
          <span style={{ position: 'absolute', left: '22%', top: '18%', width: '32%', height: '32%', borderRadius: '50%', background: 'var(--white)' }} />
        </span>
      );
      break;
    case 'clip':
      behind = <span style={offsetLayer(a, { left: off, top: off })} />;
      front = (
        <span style={{ position: 'absolute', left: Math.round(size * 0.9), top: -Math.round(size * 1.1), width: Math.round(size * 0.72), height: Math.round(size * 2.1), border: `${stroke - 1}px solid ${ink}`, borderRadius: 'var(--radius-pill)', zIndex: 3, transform: 'rotate(-14deg)', background: 'transparent' }}>
          <span style={{ position: 'absolute', left: '26%', top: '18%', width: '48%', height: '64%', border: `${stroke - 1}px solid ${ink}`, borderRadius: 'var(--radius-pill)', borderBottomColor: 'transparent' }} />
        </span>
      );
      break;
    default:
      break;
  }

  return (
    <span style={{ ...base, ...style }} {...rest}>
      {behind}
      <span style={plate}>{children}</span>
      {front}
    </span>
  );
}
