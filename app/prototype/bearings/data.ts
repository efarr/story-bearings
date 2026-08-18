// Three variants of the Bearings page, switchable via ?variant=,
// on throwaway route /prototype/bearings.

export const VARIANT_META = {
  A: "Essay column",
  B: "Split pane",
  C: "Roster index",
} as const;

export type VariantKey = keyof typeof VARIANT_META;

export type RosterLine = {
  name: string;
  aliases: string[];
  role: string;
};

export type BearingsSample = {
  bookTitle: string;
  author: string;
  divisionLabel: string;
  chapterLabel: string;
  placeLabel: string;
  previousLabel: string;
  nextLabel: string;
  orientation: string[];
  roster: RosterLine[];
};

export const sample: BearingsSample = {
  bookTitle: "Crime and Punishment",
  author: "Fyodor Dostoevsky",
  divisionLabel: "Part II",
  chapterLabel: "Chapter 4",
  placeLabel: "Part II, Chapter 4",
  previousLabel: "Part II, Chapter 3",
  nextLabel: "Part II, Chapter 5",
  orientation: [
    "Raskolnikov has been in his garret, ill, since the police office called him in over the rent. Razumikhin has taken charge: clothes, a doctor, and a stream of talk Raskolnikov cannot quite shut off.",
    "The talk keeps returning to the pawnbroker and her sister, found murdered. Zossimov is more interested in the state of his patient's mind than in the case. Nastasya comes and goes with news from the stairs.",
    "Luzhin — the man Dunya has accepted in the provinces — is expected in this room. Raskolnikov's mother wrote that the match would save them. He has not yet decided what he will say.",
  ],
  roster: [
    {
      name: "Rodion Romanovich Raskolnikov",
      aliases: ["Rodya", "Raskolnikov"],
      role: "A former student in Petersburg, lately ill in his garret after a summons over the rent.",
    },
    {
      name: "Pulcheria Alexandrovna Raskolnikov",
      aliases: [],
      role: "His mother in the provinces; her letter is why Luzhin is coming to this room.",
    },
    {
      name: "Avdotya Romanovna Raskolnikov",
      aliases: ["Dunya"],
      role: "His sister; she has accepted Luzhin, and the family is counting on the match.",
    },
    {
      name: "Pyotr Petrovich Luzhin",
      aliases: ["Luzhin"],
      role: "Dunya's intended, a man of means expected at the garret.",
    },
    {
      name: "Arkady Ivanovich Svidrigailov",
      aliases: ["Svidrigailov"],
      role: "The householder whose conduct toward Dunya drove her from that house; named in the letter, not yet seen.",
    },
    {
      name: "Dmitri Prokofich Razumikhin",
      aliases: ["Razumikhin"],
      role: "Raskolnikov's friend, nursing him and talking too freely about the pawnbroker's murder.",
    },
    {
      name: "Zossimov",
      aliases: [],
      role: "The doctor Razumikhin brought; more curious about the patient's mind than about the fever.",
    },
    {
      name: "Nastasya",
      aliases: [],
      role: "The servant who comes in and out of the garret with food, talk, and news from downstairs.",
    },
    {
      name: "Praskovya Pavlovna",
      aliases: ["the landlady"],
      role: "The landlady to whom the rent is owed; the police summons was about her complaint.",
    },
    {
      name: "Alyona Ivanovna",
      aliases: ["the pawnbroker"],
      role: "The old pawnbroker, found murdered with her sister.",
    },
    {
      name: "Lizaveta Ivanovna",
      aliases: ["Lizaveta"],
      role: "The pawnbroker's half-sister, killed the same evening.",
    },
    {
      name: "Semyon Zakharovich Marmeladov",
      aliases: ["Marmeladov"],
      role: "A drunken clerk Raskolnikov met in a tavern, who talked at length about his family.",
    },
    {
      name: "Katerina Ivanovna Marmeladov",
      aliases: ["Katerina Ivanovna"],
      role: "Marmeladov's wife, ill and proud, raising three children on almost nothing.",
    },
    {
      name: "Sofya Semyonovna Marmeladov",
      aliases: ["Sonya"],
      role: "Marmeladov's daughter, supporting the family; spoken of, not yet met in the room.",
    },
  ],
};
