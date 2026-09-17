/**
 * Nagadle's pill action button: uppercase ExtraBold label with a trailing glyph.
 * @dsAdherence Always use for primary/secondary actions — never a bare <button> or a square-cornered CTA.
 */
export interface ButtonProps {
  /** Button label. Written in UPPERCASE by the component — pass normal-case text. */
  children: React.ReactNode;
  /** primary = lime (default CTA) · danger = cherry red (destructive / wrong) · warn = yellow (used on dark surfaces) · moss = deep green (inverted contexts). */
  variant?: 'primary' | 'danger' | 'warn' | 'moss';
  /** md = 44px tall (default) · sm = 34px, for card footers and toolbars. */
  size?: 'sm' | 'md';
  /** Lucide slug for the trailing glyph; `null` centres the label with no glyph. Kit default is "arrow-right"; destructive actions use "x". */
  icon?: string | null;
  /** Stretch to the container width — the game column uses this for the main action. */
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}
