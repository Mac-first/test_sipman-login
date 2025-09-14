/**
 * Formatting utilities following Sipman UI spec.
 */

/** Format a number into THB currency string, without decimals. */
export function formatCurrencyTHB(value: number): string {
  const rounded = Math.round(value || 0);
  return new Intl.NumberFormat('en-TH', {
    style: 'currency',
    currency: 'THB',
    maximumFractionDigits: 0,
  }).format(rounded);
}

/** Format a percentage as integer with % sign (no decimals). */
export function formatPercentInt(value: number): string {
  const rounded = Math.round(value || 0);
  return `${rounded}%`;
}

/** Ensure cost% < 0 shows as red in UI via returning a flag. */
export function isLossPercent(costPercent: number): boolean {
  return costPercent < 0;
}

/** Clamp a cost price to be non-negative. */
export function sanitizeCostPrice(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.max(0, value);
}

