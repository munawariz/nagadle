/**
 * Underlined navigation link with a leading arrow — the brand kit's "Links" pair.
 */
export interface ArrowLinkProps {
  children: React.ReactNode;
  href?: string;
  /** plain = underlined text on cream · chip = same link in a filled moss pill, for photo/pattern surfaces. */
  variant?: 'plain' | 'chip';
  /** Arrow side and direction. back = leading ← (default) · forward = trailing →. */
  direction?: 'back' | 'forward';
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  style?: React.CSSProperties;
}
