import React from 'react';

/* Card from the brand kit: white on cream with a soft shadow when inactive, filled
   deep-moss with cream ink when active. Media sits centred at the top, footer pairs
   a bold meta value with one action. */
export function Card({
  title,
  description,
  media,
  meta,
  action,
  active = false,
  interactive = false,
  onClick,
  style,
  children,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const clickable = interactive || typeof onClick === 'function';

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--gap-stack)',
        padding: 'var(--pad-card)',
        borderRadius: 'var(--radius-md)',
        background: active ? 'var(--surface-card-active)' : 'var(--surface-card)',
        color: active ? 'var(--text-inverse)' : 'var(--text-body)',
        boxShadow: active ? 'none' : hover && clickable ? 'var(--shadow-card-hover)' : 'var(--shadow-card)',
        cursor: clickable ? 'pointer' : 'default',
        transition: 'background var(--dur) var(--ease-out), box-shadow var(--dur) var(--ease-out)',
        ...style,
      }}
      {...rest}
    >
      {media ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 'var(--space-2) 0 var(--space-4)' }}>{media}</div>
      ) : null}
      {title ? (
        <h3 style={{ margin: 0, fontWeight: 'var(--weight-black)', fontSize: 'var(--size-heading)', lineHeight: 'var(--lh-snug)', color: active ? 'var(--text-inverse)' : 'var(--text-accent)' }}>{title}</h3>
      ) : null}
      {description ? (
        <p style={{ margin: 0, fontSize: 'var(--size-body-lg)', lineHeight: 'var(--lh-body)', color: 'inherit', maxWidth: 'none' }}>{description}</p>
      ) : null}
      {children}
      {meta || action ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--gap-group)', marginTop: 'var(--space-2)' }}>
          <span className="ngd-numeric" style={{ fontSize: 'var(--size-body-lg)', color: active ? 'var(--text-inverse)' : 'var(--text-price)' }}>{meta}</span>
          {action}
        </div>
      ) : null}
    </div>
  );
}
