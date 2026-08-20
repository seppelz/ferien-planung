import { GermanState } from '../types/GermanState';
import { PersonInfo } from '../types/person';
import { isAvailablePlanYear, PLAN_YEAR } from '../constants/planYear';
import { toDateString } from '../utils/dateUtils';

export interface SharedPlanPayload {
  v: 1;
  y: number;
  s: GermanState;
  vd: number;
  p1: [string, string][];
  p2?: {
    s: GermanState;
    vd: number;
    plans: [string, string][];
  };
}

function encodeBase64Url(value: string): string {
  const base64 =
    typeof btoa !== 'undefined'
      ? btoa(value)
      : Buffer.from(value, 'utf-8').toString('base64');
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function decodeBase64Url(value: string): string {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/');
  const pad = padded.length % 4 === 0 ? '' : '='.repeat(4 - (padded.length % 4));
  const base64 = padded + pad;
  if (typeof atob !== 'undefined') {
    return atob(base64);
  }
  return Buffer.from(base64, 'base64').toString('utf-8');
}

function planRanges(
  plans: PersonInfo['person1']['vacationPlans']
): [string, string][] {
  return (plans || [])
    .filter((plan) => plan.isVisible !== false)
    .map((plan) => {
      const start = toDateString(plan.start);
      const end = toDateString(plan.end);
      return start && end ? ([start, end] as [string, string]) : null;
    })
    .filter((entry): entry is [string, string] => entry !== null);
}

export function buildSharedPlanPayload(
  persons: PersonInfo,
  year: number = PLAN_YEAR
): SharedPlanPayload {
  const payload: SharedPlanPayload = {
    v: 1,
    y: year,
    s: persons.person1.selectedState,
    vd: persons.person1.availableVacationDays,
    p1: planRanges(persons.person1.vacationPlans),
  };

  if (persons.person2?.selectedState) {
    payload.p2 = {
      s: persons.person2.selectedState,
      vd: persons.person2.availableVacationDays,
      plans: planRanges(persons.person2.vacationPlans),
    };
  }

  return payload;
}

export function encodePlanToParam(persons: PersonInfo, year: number = PLAN_YEAR): string {
  return encodeBase64Url(JSON.stringify(buildSharedPlanPayload(persons, year)));
}

export function decodePlanFromParam(encoded: string): SharedPlanPayload | null {
  try {
    const parsed = JSON.parse(decodeBase64Url(encoded)) as SharedPlanPayload;
    if (parsed.v !== 1 || !isAvailablePlanYear(parsed.y) || !parsed.s) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function buildShareUrl(persons: PersonInfo, year: number = PLAN_YEAR): string {
  const param = encodePlanToParam(persons, year);
  const url = new URL(window.location.href);
  url.searchParams.set('plan', param);
  url.searchParams.set('year', String(year));
  url.hash = '';
  return url.toString();
}

export const PLAN_SHARE_QUERY_KEY = 'plan';
