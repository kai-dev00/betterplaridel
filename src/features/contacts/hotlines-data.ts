// Hotlines, grouped. Raw copy: src/data/hotlines.json (emergency numbers are from the Municipality of Plaridel's
// official list). The Barangays group is built from src/data/barangays.json, so the barangay list lives in one place.
// TODO: verify — add the remaining official numbers. "TBA" entries are not callable.
import barangayData from "@/data/barangays.json";
import data from "@/data/hotlines.json";

// A plain number, or one with a short caption (e.g. "From Globe mobile").
// `dial` overrides what the phone dials, e.g. "0447940119,1009" for a trunkline + local.
export type PhoneNumber = string | { number: string; label: string; dial?: string };

export type Hotline = {
  name: string;
  number: PhoneNumber; // "TBA" until confirmed; not callable
  note?: string;
  otherNumbers?: readonly PhoneNumber[];
};

export type HotlineGroup = { id: string; title: string; description: string; contacts: Hotline[] };

export const officialEmail = data.officialEmail;

// Full list of national hotlines, linked under the agencies group.
export const moreHotlinesUrl = data.moreHotlinesUrl;

// Barangay hall numbers come from "hallPhones" in barangays.json; halls without one show "Number to follow".
// TODO: verify — add the remaining barangays' numbers.
const barangayHalls: Hotline[] = barangayData.barangays.map((b) => {
  const [first = "TBA", ...rest] = ("hallPhones" in b ? b.hallPhones : []) as string[];
  return { name: `Barangay ${b.name}`, number: first, otherNumbers: rest, note: "Barangay hall" };
});

export const hotlineGroups: HotlineGroup[] = data.groups.map(({ contactsFromBarangays, ...g }) => ({
  ...g,
  contacts: contactsFromBarangays ? barangayHalls : (g.contacts as Hotline[]),
}));

// The number itself, without its caption.
export const numberOf = (n: PhoneNumber) => (typeof n === "string" ? n : n.number);
