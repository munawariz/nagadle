/**
 * Step indicator dots — next / current / completed, from the kit's progress elements.
 * @dsAdherence Use for "question 3 of 5" style progress; never a plain bar or percentage.
 */
export interface StepDotsProps {
  /** One entry per step, in order. */
  steps: Array<{ state?: 'next' | 'current' | 'done'; label?: string }>;
  /** Dot diameter in px (18 default; 14 inside dense headers). */
  size?: number;
  /** vertical = labelled checklist (default) · horizontal = compact dot row. */
  orientation?: 'vertical' | 'horizontal';
  style?: React.CSSProperties;
}
