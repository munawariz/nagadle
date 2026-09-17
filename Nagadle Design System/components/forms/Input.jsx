import React from 'react';
import { Icon } from '../icon/Icon.jsx';

/* Text field from the brand kit: ExtraBold label above, 2px-stroke rounded field,
   moss stroke on focus, cherry stroke plus a glyph + message on error. */
export function Input({
  label,
  value,
  defaultValue,
  placeholder,
  error,
  disabled = false,
  type = 'text',
  id,
  onChange,
  onKeyDown,
  inputStyle,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const autoId = React.useId();
  const fieldId = id || autoId;
  const stroke = error ? 'var(--border-error)' : focus ? 'var(--border-active)' : 'var(--border-subtle)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', ...style }}>
      {label ? (
        <label htmlFor={fieldId} style={{ fontWeight: 'var(--weight-extrabold)', fontSize: 'var(--size-body)', color: 'var(--text-strong)' }}>
          {label}
        </label>
      ) : null}
      <input
        id={fieldId}
        type={type}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        aria-invalid={error ? true : undefined}
        style={{
          width: '100%',
          padding: 'var(--pad-field)',
          background: disabled ? 'var(--surface-sunken)' : 'var(--white)',
          border: `var(--stroke-field) solid ${stroke}`,
          borderRadius: 'var(--radius-field)',
          fontFamily: 'var(--font-core)',
          fontWeight: 'var(--weight-medium)',
          fontSize: 'var(--size-body-lg)',
          color: 'var(--text-body)',
          outline: 'none',
          transition: 'border-color var(--dur) var(--ease-out)',
          ...inputStyle,
        }}
        {...rest}
      />
      {error ? (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)', color: 'var(--text-error)', fontSize: 'var(--size-label)', fontWeight: 'var(--weight-extrabold)' }}>
          <Icon name="circle-x" size={14} />
          {error}
        </span>
      ) : null}
    </div>
  );
}
