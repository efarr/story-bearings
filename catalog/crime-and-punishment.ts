import type { Book, Person } from "./index";
import { divisions } from "./crime-and-punishment-places";

const PLACE_COUNT = divisions.reduce(
  (count, division) => count + division.chapters.length,
  0,
);

type Line = { aliases: string[]; role: string };

function placeIndex(divisionIndex: number, chapter: number): number {
  let index = chapter - 1;
  for (let i = 0; i < divisionIndex; i++) {
    index += divisions[i].chapters.length;
  }
  return index;
}

function linesFrom(
  firstKey: Person["firstKey"],
  changes: [number, Line][],
): Line[] {
  const start = placeIndex(firstKey.divisionIndex, firstKey.chapter);
  const remaining = PLACE_COUNT - start;
  const byPlace = new Map(changes);
  const out: Line[] = [];
  let current = changes[0][1];
  for (let i = 0; i < remaining; i++) {
    const at = start + i;
    const next = byPlace.get(at);
    if (next) {
      current = next;
    }
    out.push(current);
  }
  return out;
}

function person(
  canonicalName: string,
  firstKey: Person["firstKey"],
  finalRole: string,
  changes: [number, Line][],
  protagonist = false,
): Person {
  return {
    canonicalName,
    protagonist,
    firstKey,
    lines: linesFrom(firstKey, changes),
    finalRole,
  };
}

const raskolnikovKey = { divisionIndex: 0, chapter: 1 };
const marmeladovKey = { divisionIndex: 0, chapter: 2 };
const familyKey = { divisionIndex: 0, chapter: 3 };
const razumihinKey = { divisionIndex: 0, chapter: 4 };
const porfiryKey = { divisionIndex: 2, chapter: 2 };
const lebeziatnikovKey = { divisionIndex: 4, chapter: 1 };

const persons: Person[] = [
  person(
    "Rodion Romanovitch Raskolnikov",
    raskolnikovKey,
    "the former student who confessed to the murders and is serving a sentence in Siberia",
    [
      [0, { aliases: ["Raskolnikov"], role: "a former student in Petersburg, poor, in a garret, and in debt to his landlady" }],
      [2, { aliases: ["Raskolnikov", "Rodya"], role: "Pulcheria Alexandrovna's son, a former student in Petersburg" }],
      [9, { aliases: ["Raskolnikov", "Rodya"], role: "Pulcheria Alexandrovna's son, lately ill in his garret and being looked after by Razumihin" }],
      [13, { aliases: ["Raskolnikov", "Rodya"], role: "Pulcheria Alexandrovna's son; his mother and sister have reached Petersburg" }],
      [29, { aliases: ["Raskolnikov", "Rodya"], role: "Pulcheria Alexandrovna's son, a former student who has told Sonia what he did" }],
      [38, { aliases: ["Raskolnikov", "Rodya"], role: "Pulcheria Alexandrovna's son, a former student who has confessed at the police office" }],
      [39, { aliases: ["Raskolnikov", "Rodya"], role: "Pulcheria Alexandrovna's son, a convict in Siberia" }],
    ],
    true,
  ),
  person(
    "Alyona Ivanovna",
    raskolnikovKey,
    "the old pawnbroker, killed in her flat",
    [
      [0, { aliases: ["Alyona Ivanovna", "the pawnbroker"], role: "an old pawnbroker Raskolnikov visits in a nearby house" }],
      [6, { aliases: ["Alyona Ivanovna", "the pawnbroker"], role: "the old pawnbroker; she is dead in her flat" }],
    ],
  ),
  person(
    "Lizaveta Ivanovna",
    raskolnikovKey,
    "the pawnbroker's half-sister, killed the same evening",
    [
      [0, { aliases: ["Lizaveta"], role: "Alyona Ivanovna's sister, who lives with her and was not at home for the visit" }],
      [4, { aliases: ["Lizaveta"], role: "Alyona Ivanovna's sister; Raskolnikov has heard she will be out tomorrow evening" }],
      [6, { aliases: ["Lizaveta"], role: "Alyona Ivanovna's sister; she is dead in the same flat" }],
    ],
  ),
  person(
    "Semyon Zaharovitch Marmeladov",
    marmeladovKey,
    "a former clerk; he dies after being struck by a carriage",
    [
      [1, { aliases: ["Marmeladov"], role: "a drunken titular counsellor Raskolnikov met in a tavern, husband of Katerina Ivanovna and father of Sonia" }],
      [13, { aliases: ["Marmeladov"], role: "the clerk Raskolnikov met in a tavern; he has died after being run over" }],
    ],
  ),
  person(
    "Katerina Ivanovna",
    marmeladovKey,
    "Marmeladov's widow; she dies in the street after the funeral meal",
    [
      [1, { aliases: ["Katerina Ivanovna"], role: "Marmeladov's wife, consumptive and proud, raising three children in a passage room" }],
      [13, { aliases: ["Katerina Ivanovna"], role: "Marmeladov's widow, ill, with three children and Sonia" }],
      [30, { aliases: ["Katerina Ivanovna"], role: "Marmeladov's widow; she has died after taking the children into the street" }],
    ],
  ),
  person(
    "Sofya Semyonovna Marmeladov",
    marmeladovKey,
    "Marmeladov's daughter; she follows Raskolnikov to Siberia",
    [
      [1, { aliases: ["Sonia"], role: "Marmeladov's daughter, supporting the family on a yellow ticket; spoken of, not yet seen" }],
      [13, { aliases: ["Sonia"], role: "Marmeladov's daughter, who knelt by her father as he died" }],
      [17, { aliases: ["Sonia"], role: "Marmeladov's daughter; she has been to Raskolnikov's garret to invite him to the funeral" }],
      [23, { aliases: ["Sonia"], role: "Marmeladov's daughter; Raskolnikov has sat with her in her room and asked her to wait for him" }],
      [29, { aliases: ["Sonia"], role: "Marmeladov's daughter; Raskolnikov has told her what he did, and she will not leave him" }],
      [38, { aliases: ["Sonia"], role: "Marmeladov's daughter; she was in the yard when he went in to confess" }],
      [39, { aliases: ["Sonia"], role: "Marmeladov's daughter; she lives near the prison in Siberia and writes to Dounia" }],
    ],
  ),
  person(
    "Pulcheria Alexandrovna",
    familyKey,
    "Raskolnikov's mother; she dies without fully understanding his case",
    [
      [2, { aliases: ["Pulcheria Alexandrovna"], role: "Raskolnikov's mother in the provinces; her letter is in his room" }],
      [13, { aliases: ["Pulcheria Alexandrovna"], role: "Raskolnikov's mother, now in Petersburg with Dounia" }],
      [37, { aliases: ["Pulcheria Alexandrovna"], role: "Raskolnikov's mother; he has seen her without telling her what he means to do" }],
      [39, { aliases: ["Pulcheria Alexandrovna"], role: "Raskolnikov's mother; she has died" }],
    ],
  ),
  person(
    "Avdotya Romanovna Raskolnikov",
    familyKey,
    "Raskolnikov's sister; she marries Razumihin",
    [
      [2, { aliases: ["Dounia"], role: "Raskolnikov's sister; the letter says she has accepted Luzhin after leaving the Svidrigailovs' house" }],
      [13, { aliases: ["Dounia"], role: "Raskolnikov's sister, now in Petersburg with their mother" }],
      [21, { aliases: ["Dounia"], role: "Raskolnikov's sister; she has told Luzhin she will not marry him" }],
      [35, { aliases: ["Dounia"], role: "Raskolnikov's sister; she has been in Svidrigailov's rooms and left them" }],
      [37, { aliases: ["Dounia"], role: "Raskolnikov's sister; she knows he is going to the police" }],
      [38, { aliases: ["Dounia"], role: "Raskolnikov's sister; she knows he has gone to confess" }],
      [39, { aliases: ["Dounia"], role: "Raskolnikov's sister, married to Razumihin" }],
    ],
  ),
  person(
    "Arkady Ivanovitch Svidrigailov",
    familyKey,
    "the former householder from the provinces; he shoots himself in Petersburg",
    [
      [2, { aliases: ["Svidrigailov"], role: "the householder whose conduct toward Dounia drove her from that house; named in the letter, not yet seen" }],
      [20, { aliases: ["Svidrigailov", "Arkady Ivanovitch"], role: "the former householder from the provinces, now in Petersburg, talking of Dounia and of his late wife" }],
      [30, { aliases: ["Svidrigailov", "Arkady Ivanovitch"], role: "the former householder from the provinces; he heard Raskolnikov's confession to Sonia through the wall" }],
      [35, { aliases: ["Svidrigailov", "Arkady Ivanovitch"], role: "the former householder from the provinces; Dounia has been in his rooms and gone" }],
      [36, { aliases: ["Svidrigailov", "Arkady Ivanovitch"], role: "the former householder from the provinces; he has shot himself" }],
    ],
  ),
  person(
    "Marfa Petrovna",
    familyKey,
    "Svidrigailov's wife; she dies before he comes to Petersburg",
    [
      [2, { aliases: ["Marfa Petrovna"], role: "Svidrigailov's wife; she turned Dounia out and later cleared her name in the town" }],
      [20, { aliases: ["Marfa Petrovna"], role: "Svidrigailov's late wife; her death has been reported in Petersburg" }],
    ],
  ),
  person(
    "Pyotr Petrovitch Luzhin",
    familyKey,
    "the man of means Dounia once accepted and then dismissed",
    [
      [2, { aliases: ["Luzhin", "Pyotr Petrovitch"], role: "the man of means Dounia has accepted; he is coming to Petersburg and wants a wife who will be grateful" }],
      [10, { aliases: ["Luzhin", "Pyotr Petrovitch"], role: "Dounia's intended, expected at the garret" }],
      [11, { aliases: ["Luzhin", "Pyotr Petrovitch"], role: "Dounia's intended, a visitor already received in the garret" }],
      [21, { aliases: ["Luzhin", "Pyotr Petrovitch"], role: "the man Dounia has dismissed" }],
      [28, { aliases: ["Luzhin", "Pyotr Petrovitch"], role: "the man Dounia dismissed, now hostile to Sonia and her family" }],
    ],
  ),
  person(
    "Dmitri Prokofitch Razumihin",
    razumihinKey,
    "Raskolnikov's friend; he marries Dounia",
    [
      [3, { aliases: ["Razumihin"], role: "a former student friend Raskolnikov thinks of going to" }],
      [8, { aliases: ["Razumihin"], role: "Raskolnikov's friend, who offered him work in his lodging" }],
      [9, { aliases: ["Razumihin"], role: "Raskolnikov's friend, nursing him and spending the mother's money on clothes and food" }],
      [14, { aliases: ["Razumihin"], role: "Raskolnikov's friend, now also looking after Pulcheria Alexandrovna and Dounia" }],
      [21, { aliases: ["Razumihin"], role: "Raskolnikov's friend, plainly in love with Dounia" }],
      [39, { aliases: ["Razumihin"], role: "Raskolnikov's friend, married to Dounia" }],
    ],
  ),
  person(
    "Porfiry Petrovitch",
    porfiryKey,
    "the examining magistrate who pressed Raskolnikov to confess",
    [
      [15, { aliases: ["Porfiry Petrovitch"], role: "Razumihin's relation, the examining magistrate in charge of the pawnbroker's case" }],
      [18, { aliases: ["Porfiry Petrovitch"], role: "the examining magistrate who has already questioned Raskolnikov over the pledges and the article on crime" }],
      [25, { aliases: ["Porfiry Petrovitch"], role: "the examining magistrate; a painter has confessed in front of him" }],
      [32, { aliases: ["Porfiry Petrovitch"], role: "the examining magistrate who has told Raskolnikov he knows, and has left him free to come in" }],
      [39, { aliases: ["Porfiry Petrovitch"], role: "the examining magistrate who pressed Raskolnikov to confess" }],
    ],
  ),
  person(
    "Andrey Semyonovitch Lebeziatnikov",
    lebeziatnikovKey,
    "a lodger of progressive opinions who exposed Luzhin's trick against Sonia",
    [
      [26, { aliases: ["Lebeziatnikov"], role: "a young official of advanced opinions, Luzhin's roommate, once a lodger in the Marmeladovs' building" }],
      [28, { aliases: ["Lebeziatnikov"], role: "Luzhin's roommate, who spoke for Sonia when Luzhin accused her" }],
    ],
  ),
];

export const crimeAndPunishment: Book = {
  title: "Crime and Punishment",
  author: "Fyodor Dostoevsky",
  slug: "crime-and-punishment",
  landing:
    "A novel by Fyodor Dostoevsky. Set your Place to read Bearings for the chapter you have just finished.",
  divisions,
  persons,
};
