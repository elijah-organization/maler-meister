import { formatISO } from 'date-fns';

export const DEFAULT_HOURS = 8;

/**
 * must be negative
 */
export const ALLOWED_DAYS_TO_RENOVE = import.meta.env.DEV ? -1000 : -10;

export const INITIAL_DAILY_ENTRY = {
  date: formatISO(new Date(), { representation: 'date' }),
  type: 'Arbeit',
} as DailyEntry;
