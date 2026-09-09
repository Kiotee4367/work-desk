/**
 * Brand config. This is the ONE file to edit when adding a client brand.
 *
 * To add a brand:
 *   1. Copy one of the entries below and give it a new key (lowercase, hyphens).
 *   2. Fill in the name, colors and contact email.
 *   3. Drop a logo file in public/brands/ and point `logo` at it (or set logo to null
 *      to show the name as text).
 * Nothing else in the app needs to change. The brand shows up in Settings automatically.
 *
 * Colors are hex codes. `primary` is used for the header and main buttons, `accent` for
 * highlights and focus rings, `ink` for text, `paper` for the page background.
 *
 * NOTE: the values below were taken from the brands' existing sites and repos as a
 * stand-in. When prototype/WorkDashboard.jsx is added, copy its BRANDS values here.
 */

export interface Brand {
  key: string;
  name: string;
  shortName: string;
  tagline: string;
  primary: string;
  accent: string;
  ink: string;
  paper: string;
  headingFont: string;
  bodyFont: string;
  /** Path under /public, e.g. "/brands/acme.svg". Null shows the name as text. */
  logo: string | null;
  contactEmail: string;
}

const HEADING = "var(--font-dm-sans), system-ui, sans-serif";
const BODY = "var(--font-open-sans), system-ui, sans-serif";

export const BRANDS = {
  "strategic-emarketing": {
    key: "strategic-emarketing",
    name: "Strategic eMarketing",
    shortName: "Strategic eMarketing",
    tagline: "We build AI marketing systems that fill your pipeline",
    primary: "#2C3284",
    accent: "#96B33C",
    ink: "#1A1A1A",
    paper: "#FFFFFF",
    headingFont: HEADING,
    bodyFont: BODY,
    logo: "/brands/strategic-emarketing.gif",
    contactEmail: "hello@strategicemarketing.com",
  },
  "holaris-advisors": {
    key: "holaris-advisors",
    name: "Holaris Advisors",
    shortName: "Holaris",
    tagline: "Vendor-neutral AI advice for CEOs and owner-operators",
    primary: "#1F1D19",
    accent: "#F2C230",
    ink: "#0A0A0A",
    paper: "#FAF8F3",
    headingFont: HEADING,
    bodyFont: BODY,
    logo: "/brands/holaris-advisors.svg",
    contactEmail: "hello@holarisadvisors.ai",
  },
} as const satisfies Record<string, Brand>;

export type BrandKey = keyof typeof BRANDS;

export const DEFAULT_BRAND_KEY: BrandKey = "strategic-emarketing";

export const BRAND_LIST: Brand[] = Object.values(BRANDS);

export function isBrandKey(value: unknown): value is BrandKey {
  return typeof value === "string" && Object.prototype.hasOwnProperty.call(BRANDS, value);
}

export function getBrand(key: string | undefined | null): Brand {
  if (isBrandKey(key)) return BRANDS[key];
  return BRANDS[DEFAULT_BRAND_KEY];
}
