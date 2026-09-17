import React from 'react';
import { Icon } from '../icon/Icon.jsx';

/* The brand kit's two link treatments: an underlined text link with a leading
   arrow, and the same link inside a filled pill for use over busy surfaces. */
export function ArrowLink({
  children,
  href = '#',
  variant = 'plain',
  direction = 'back',
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const chip = variant === 'chip';
  const glyph = direction === 'back' ? 'arrow-left' : 'arrow-right';

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--gap-inline)',
        flexDirection: direction === 'back' ? 'row' : 'row-reverse',
        padding: chip ? '6px 14px' : 0,
        borderRadius: chip ? 'var(--radius-pill)' : 0,
        background: chip ? (hover ? 'var(--moss-700)' : 'var(--moss-900)') : 'transparent',
        color: chip ? 'var(--cream)' : hover ? 'var(--text-link-hover)' : 'var(--text-link)',
        fontWeight: 'var(--weight-extrabold)',
        fontSize: 'var(--size-body)',
        lineHeight: 1.2,
        textDecoration: 'none',
        transition: 'background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)',
        ...style,
      }}
      {...rest}
    >
      <Icon name={glyph} size={16} />
      <span style={{ textDecoration: 'underline', textDecorationThickness: 2, textUnderlineOffset: 3 }}>{children}</span>
    </a>
  );
}
