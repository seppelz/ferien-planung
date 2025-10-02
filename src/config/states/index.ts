import { StateInfo } from '../types/StateInfo';
import { badenWuerttemberg } from './baden-wuerttemberg';
import { bayern } from './bayern';
import { berlin } from './berlin';
import { brandenburg } from './brandenburg';
import { bremen } from './bremen';
import { hamburg } from './hamburg';
import { hessen } from './hessen';
import { mecklenburgVorpommern } from './mecklenburg-vorpommern';
import { niedersachsen } from './niedersachsen';
import { nordrheinWestfalen } from './nordrhein-westfalen';
import { rheinlandPfalz } from './rheinland-pfalz';
import { saarland } from './saarland';
import { sachsen } from './sachsen';
import { sachsenAnhalt } from './sachsen-anhalt';
import { schleswigHolstein } from './schleswig-holstein';
import { thueringen } from './thueringen';

export const states: Record<string, StateInfo> = {
  'BW': badenWuerttemberg,
  'BY': bayern,
  'BE': berlin,
  'BB': brandenburg,
  'HB': bremen,
  'HH': hamburg,
  'HE': hessen,
  'MV': mecklenburgVorpommern,
  'NI': niedersachsen,
  'NW': nordrheinWestfalen,
  'RP': rheinlandPfalz,
  'SL': saarland,
  'SN': sachsen,
  'ST': sachsenAnhalt,
  'SH': schleswigHolstein,
  'TH': thueringen
}; 