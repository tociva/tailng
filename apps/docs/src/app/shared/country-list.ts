/** Minimal country type and list for docs/playground-style demos. */
export interface Country {
  code: string;
  name: string;
  iso: string;
}

export function toFlagEmoji(code: string): string {
  return code
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
}

/** Subset of countries for autocomplete docs examples. */
export const COUNTRY_LIST: Country[] = [
  { code: 'US', name: 'United States of America', iso: 'USA' },
  { code: 'CA', name: 'Canada', iso: 'CAN' },
  { code: 'GB', name: 'United Kingdom of Great Britain and Northern Ireland', iso: 'GBR' },
  { code: 'DE', name: 'Germany', iso: 'DEU' },
  { code: 'FR', name: 'France', iso: 'FRA' },
  { code: 'IN', name: 'India', iso: 'IND' },
  { code: 'AU', name: 'Australia', iso: 'AUS' },
  { code: 'JP', name: 'Japan', iso: 'JPN' },
  { code: 'BR', name: 'Brazil', iso: 'BRA' },
  { code: 'CN', name: 'China', iso: 'CHN' },
  { code: 'IT', name: 'Italy', iso: 'ITA' },
  { code: 'ES', name: 'Spain', iso: 'ESP' },
  { code: 'NL', name: 'Netherlands, Kingdom of the', iso: 'NLD' },
  { code: 'MX', name: 'Mexico', iso: 'MEX' },
  { code: 'KR', name: 'Korea, Republic of', iso: 'KOR' },
];
