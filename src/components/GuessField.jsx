import React from 'react';
import { Input } from '@ds/components/forms/Input.jsx';

const MAX_SUGGESTIONS = 6;
const norm = (s) => s.trim().toLowerCase();

/** Names whose full text or any word starts with the query; full-name prefixes first. */
export function matchMembers(members, query) {
  const q = norm(query);
  if (!q) return [];
  const scored = [];
  for (const name of members) {
    const n = name.toLowerCase();
    if (n.startsWith(q)) scored.push([0, name]);
    else if (n.split(/\s+/).some((w) => w.startsWith(q))) scored.push([1, name]);
    else if (n.includes(q)) scored.push([2, name]);
  }
  return scored.sort((a, b) => a[0] - b[0] || a[1].localeCompare(b[1])).map(([, name]) => name).slice(0, MAX_SUGGESTIONS);
}

export const findMember = (members, value) => members.find((m) => m.toLowerCase() === norm(value)) ?? null;

/* Answer field: design-system Input plus a suggestion list and inline completion
   (Tab or ArrowRight accepts the greyed-out rest of the top name). */
export function GuessField({ members, value, onChange, onSubmit, error, disabled }) {
  const [open, setOpen] = React.useState(false);
  const [highlight, setHighlight] = React.useState(0);
  const listId = React.useId();
  const inputId = React.useId();

  const suggestions = React.useMemo(() => matchMembers(members, value), [members, value]);
  const exact = findMember(members, value);
  const showList = open && suggestions.length > 0 && !(suggestions.length === 1 && exact);
  const top = suggestions[0];
  const completion = value && top && top.toLowerCase().startsWith(value.toLowerCase()) && top.length > value.length
    ? top.slice(value.length)
    : '';

  function choose(name) {
    onChange(name);
    setOpen(false);
  }

  function handleKeyDown(e) {
    if (e.key === 'ArrowDown' && suggestions.length) {
      e.preventDefault();
      setOpen(true);
      setHighlight((h) => (h + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp' && suggestions.length) {
      e.preventDefault();
      setHighlight((h) => (h - 1 + suggestions.length) % suggestions.length);
    } else if ((e.key === 'Tab' || e.key === 'ArrowRight') && completion && e.currentTarget.selectionStart === value.length) {
      e.preventDefault();
      choose(top);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (showList && suggestions[highlight] && suggestions[highlight] !== exact) choose(suggestions[highlight]);
      else onSubmit();
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  return (
    <div
      style={{ position: 'relative' }}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false); }}
    >
      <label htmlFor={inputId} className="ngd-label" style={{ display: 'block', marginBottom: 'var(--space-2)', color: 'var(--text-muted)' }}>
        Who sent it?
      </label>
      <div style={{ position: 'relative' }}>
        <Input
          id={inputId}
          value={value}
          placeholder="Type a name"
          error={error}
          disabled={disabled}
          autoComplete="off"
          autoCapitalize="words"
          spellCheck={false}
          role="combobox"
          aria-expanded={showList}
          aria-controls={listId}
          aria-autocomplete="both"
          aria-activedescendant={showList ? `${listId}-${highlight}` : undefined}
          onChange={(e) => { onChange(e.target.value); setOpen(true); setHighlight(0); }}
          onKeyDown={handleKeyDown}
          onClick={() => setOpen(true)}
          inputStyle={{ fontWeight: 'var(--weight-extrabold)' }}
        />
        {completion && !disabled ? (
          <span
            aria-hidden="true"
            style={{
              position: 'absolute', left: 0, top: 0, height: 52, display: 'flex', alignItems: 'center',
              padding: '0 18px', pointerEvents: 'none', whiteSpace: 'pre',
              fontSize: 'var(--size-body-lg)', fontWeight: 'var(--weight-extrabold)',
            }}
          >
            <span style={{ visibility: 'hidden' }}>{value}</span>
            <span style={{ color: 'var(--text-muted)' }}>{completion}</span>
          </span>
        ) : null}
      </div>
      {showList ? (
        <ul
          id={listId}
          role="listbox"
          style={{
            position: 'absolute', zIndex: 3, left: 0, right: 0, top: 'calc(100% + var(--space-1))',
            margin: 0, padding: 'var(--space-1)', listStyle: 'none',
            background: 'var(--surface-card)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card-hover)',
          }}
        >
          {suggestions.map((name, i) => (
            <li
              key={name}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === highlight}
              onMouseDown={(e) => e.preventDefault()}
              onMouseEnter={() => setHighlight(i)}
              onClick={() => choose(name)}
              style={{
                padding: '10px 12px', borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                fontWeight: 'var(--weight-extrabold)', fontSize: 'var(--size-body-lg)',
                background: i === highlight ? 'var(--surface-tile)' : 'transparent',
                transition: 'background var(--dur-fast) var(--ease-out)',
              }}
            >
              {name}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
