import { GermanState } from '../types/GermanState';

const SLUG_TO_STATE: Record<string, GermanState> = {
  berlin: GermanState.BE,
  be: GermanState.BE,
  bayern: GermanState.BY,
  by: GermanState.BY,
  'baden-wuerttemberg': GermanState.BW,
  bw: GermanState.BW,
  brandenburg: GermanState.BB,
  bb: GermanState.BB,
  bremen: GermanState.HB,
  hb: GermanState.HB,
  hamburg: GermanState.HH,
  hh: GermanState.HH,
  hessen: GermanState.HE,
  he: GermanState.HE,
  'mecklenburg-vorpommern': GermanState.MV,
  mv: GermanState.MV,
  niedersachsen: GermanState.NI,
  ni: GermanState.NI,
  'nordrhein-westfalen': GermanState.NW,
  nw: GermanState.NW,
  'rheinland-pfalz': GermanState.RP,
  rp: GermanState.RP,
  saarland: GermanState.SL,
  sl: GermanState.SL,
  sachsen: GermanState.SN,
  sn: GermanState.SN,
  'sachsen-anhalt': GermanState.ST,
  st: GermanState.ST,
  'schleswig-holstein': GermanState.SH,
  sh: GermanState.SH,
  thueringen: GermanState.TH,
  th: GermanState.TH,
};

export function parseStateParam(value: string | null | undefined): GermanState | null {
  if (!value) return null;
  return SLUG_TO_STATE[value.trim().toLowerCase()] ?? null;
}

export function parseStateQuery(search: string): GermanState | null {
  const query = search.startsWith('?') ? search.slice(1) : search;
  return parseStateParam(new URLSearchParams(query).get('state'));
}
