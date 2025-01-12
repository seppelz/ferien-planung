import { badenWuerttemberg } from '../config/states/baden-wuerttemberg';
import { bayern } from '../config/states/bayern';
import { berlin } from '../config/states/berlin';
import { brandenburg } from '../config/states/brandenburg';
import { bremen } from '../config/states/bremen';
import { hamburg } from '../config/states/hamburg';
import { hessen } from '../config/states/hessen';
import { mecklenburgVorpommern } from '../config/states/mecklenburg-vorpommern';
import { niedersachsen } from '../config/states/niedersachsen';
import { nordrheinWestfalen } from '../config/states/nordrhein-westfalen';
import { rheinlandPfalz } from '../config/states/rheinland-pfalz';
import { saarland } from '../config/states/saarland';
import { sachsen } from '../config/states/sachsen';
import { sachsenAnhalt } from '../config/states/sachsen-anhalt';
import { schleswigHolstein } from '../config/states/schleswig-holstein';
import { thueringen } from '../config/states/thueringen';
import { GermanState } from '../types/GermanState';
import type { StateInfo } from '../types/StateInfo';

// Map of state slugs to their data
const STATE_DATA: Record<string, StateInfo> = {
  'berlin': berlin,
  'bayern': bayern,
  'baden-wuerttemberg': badenWuerttemberg,
  'brandenburg': brandenburg,
  'bremen': bremen,
  'hamburg': hamburg,
  'hessen': hessen,
  'mecklenburg-vorpommern': mecklenburgVorpommern,
  'niedersachsen': niedersachsen,
  'nordrhein-westfalen': nordrheinWestfalen,
  'rheinland-pfalz': rheinlandPfalz,
  'saarland': saarland,
  'sachsen': sachsen,
  'sachsen-anhalt': sachsenAnhalt,
  'schleswig-holstein': schleswigHolstein,
  'thueringen': thueringen
};

// Map of slugs to GermanState enum values
const SLUG_TO_STATE: Record<string, GermanState> = {
  'berlin': GermanState.BE,
  'bayern': GermanState.BY,
  'baden-wuerttemberg': GermanState.BW,
  'brandenburg': GermanState.BB,
  'bremen': GermanState.HB,
  'hamburg': GermanState.HH,
  'hessen': GermanState.HE,
  'mecklenburg-vorpommern': GermanState.MV,
  'niedersachsen': GermanState.NI,
  'nordrhein-westfalen': GermanState.NW,
  'rheinland-pfalz': GermanState.RP,
  'saarland': GermanState.SL,
  'sachsen': GermanState.SN,
  'sachsen-anhalt': GermanState.ST,
  'schleswig-holstein': GermanState.SH,
  'thueringen': GermanState.TH
};

/**
 * Convert a state slug to its corresponding GermanState enum value
 */
export function getStateEnum(stateSlug: string): GermanState | null {
  return SLUG_TO_STATE[stateSlug] || null;
}

/**
 * Get the state information including its unique holiday descriptions
 */
export function getStateInfo(stateSlug: string): StateInfo | null {
  return STATE_DATA[stateSlug] || null;
}

/**
 * Get list of available state slugs
 */
export function getStateIds(): string[] {
  return Object.keys(STATE_DATA);
} 