import React from 'react';
import { Icon } from '../icon/Icon.jsx';

/* Pill button from the Nagadle brand kit: uppercase ExtraBold label, wide tracking,
   trailing glyph, flat fill. Hover lightens the fill and adds a coloured glow;
   press darkens it. No borders, no gradients, no scale transforms. */
const VARIANTS = {
  primary: { fill: 'var(--action-primary)', hover: 'var(--action-primary-hover)', press: 'var(--action-primary-press)', ink: 'var(--action-primary-ink)', glyph: 'var(--moss-900)', glow: 'rgba(188,209,71,0.55)' },
  danger: { fill: 'var(--action-danger)', hover: 'var(--action-danger-hover)', press: 'var(--action-danger-press)', ink: 'var(--action-danger-ink)', glyph: 'var(--yellow-500)', glow: 'rgba(255,78,66,0.45)' },
  warn: { fill: 'var(--action-warn)', hover: 'var(--action-warn-hover)', press: 'var(--action-warn-press)', ink: 'var(--action-warn-ink)', glyph: 'var(--red-500)', glow: 'rgba(255,192,36,0.5)' },
  moss: { fill: 'var(--moss-900)', hover: 'var(--moss-700)', press: 'var(--moss-950)', ink: 'var(--cream)', glyph: 'var(--lime-500)', glow: 'rgba(73,79,33,0.4)' },
};

const SIZES = {
  sm: { padding: '9px 16px', fontSize: 'var(--size-label)', gap: 'var(--space-3)', icon: 16 },
  md: { padding: 'var(--pad-button)', fontSize: 'var(--size-body)', gap: 'var(--space-5)', icon: 20 },
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon = 'arrow-right',
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const v = VARIANTS[variant] || VARIANTS.primary;
  const s = SIZES[size] || SIZES.md;
  const fill = disabled ? 'var(--stone-300)' : press ? v.press : hover ? v.hover : v.fill;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        display: fullWidth ? 'flex' : 'inline-flex',
        width: fullWidth ? '100%' : undefined,
        alignItems: 'center',
        justifyContent: icon ? 'space-between' : 'center',
        gap: s.gap,
        padding: s.padding,
        border: 'none',
        borderRadius: 'var(--radius-pill)',
        background: fill,
        color: disabled ? 'var(--text-muted)' : v.ink,
        fontFamily: 'var(--font-core)',
        fontWeight: 'var(--weight-extrabold)',
        fontSize: s.fontSize,
        lineHeight: 1,
        letterSpacing: 'var(--tracking-label)',
        textTransform: 'uppercase',
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: hover && !disabled && !press ? `0 6px 20px ${v.glow}` : 'none',
        transition: `background var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)`,
        ...style,
      }}
      {...rest}
    >
      <span>{children}</span>
      {icon ? <Icon name={icon} size={s.icon} color={disabled ? 'var(--text-muted)' : v.glyph} /> : null}
    </button>
  );
}
