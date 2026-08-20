/**
 * Verifies website bridge-day math against the planner's calculateBridgeDays for sample cases.
 * Run: npx ts-node --project scripts/tsconfig.json scripts/verify-bridge-math.ts
 */
import { berlin } from '../src/config/states/berlin';
import { getBridgeOpportunities, getNextBridgeOpportunity } from '../src/utils/bridgeDays';
import { PLAN_YEAR } from '../src/constants/planYear';

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

function parseIso(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

/** Minimal mirror of planner calculateBridgeDays totalDaysOff for one candidate day. */
function plannerStyleTotalDaysOff(
  bridgeDateIso: string,
  publicHolidayIsos: Set<string>
): number {
  const isFree = (iso: string): boolean => {
    const d = parseIso(iso);
    const day = d.getDay();
    return day === 0 || day === 6 || publicHolidayIsos.has(iso);
  };
  const toIso = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  let count = 1;
  let cursor = parseIso(bridgeDateIso);
  cursor.setDate(cursor.getDate() - 1);
  while (isFree(toIso(cursor))) {
    count++;
    cursor.setDate(cursor.getDate() - 1);
  }
  cursor = parseIso(bridgeDateIso);
  cursor.setDate(cursor.getDate() + 1);
  while (isFree(toIso(cursor))) {
    count++;
    cursor.setDate(cursor.getDate() + 1);
  }
  return count;
}

const publicHolidays = berlin.holidays.filter(
  (h) => h.type === 'public' && (h.start || '').startsWith(String(PLAN_YEAR))
);
const publicIso = new Set(
  publicHolidays.map((h) => (h.start || ('date' in h ? String(h.date) : '')).slice(0, 10)).filter(Boolean)
);

const opportunities = getBridgeOpportunities(publicHolidays);

assert(opportunities.length > 0, `Berlin ${PLAN_YEAR} should have bridge opportunities`);

for (const opp of opportunities) {
  const plannerTotal = plannerStyleTotalDaysOff(opp.vacationDate, publicIso);
  assert(
    opp.totalDaysOff === plannerTotal,
    `Mismatch for ${opp.vacationDate}: website=${opp.totalDaysOff}, planner-style=${plannerTotal}`
  );
}

const nextFromJan = getNextBridgeOpportunity(publicHolidays, new Date(2027, 0, 15));
assert(nextFromJan !== null, 'Should find a next bridge from mid-January 2027');
assert(
  nextFromJan!.vacationDate >= '2027-01-15',
  'Next bridge vacation date must not be in the past relative to reference date'
);

console.log(`Bridge math OK: ${opportunities.length} Berlin opportunities verified.`);
