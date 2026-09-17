/**
 * Single-line text field with the kit's label / focus / error treatments.
 * @dsAdherence Use for every text entry, including the guess field — never a bare <input>.
 */
export interface InputProps {
  /** ExtraBold label rendered above the field. Omit for unlabelled inline fields. */
  label?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  /** Error message. Presence switches the stroke to cherry red and shows the message with a glyph. */
  error?: string;
  disabled?: boolean;
  type?: 'text' | 'email' | 'search' | 'password';
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  /** Escape hatch for the inner <input> (e.g. centring the guess field). */
  inputStyle?: React.CSSProperties;
  style?: React.CSSProperties;
}
