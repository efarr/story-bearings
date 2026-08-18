# Crime and Punishment chapter map (English editions)

Facts for [Crime and Punishment's chapter map](https://github.com/efarr/story-bearings/issues/3). Not a product choice.

## Question

How is *Crime and Punishment* divided in major English editions (parts, chapters, epilogue), and where do part/chapter numbers disagree enough that a reader of one edition would land on the wrong bearings page?

## Macro structure

The novel is a work in **six parts plus an epilogue**. That is the structure named on the 1914 Garnett first printing (“A Novel in Six Parts and an Epilogue”) and on the Pevear & Volokhonsky edition (“a novel in six parts with epilogue”).

- Garnett 1914 title: *Crime and Punishment: A Novel in Six Parts and an Epilogue*, London: Heinemann, 1914 (Niigata University OPAC: <http://opac.lib.niigata-u.ac.jp/en/node/654893>).
- Pevear & Volokhonsky: *Crime and punishment: a novel in six parts with epilogue* (Internet Archive record of the Vintage/Pevear–Volokhonsky edition: <https://archive.org/details/crimepunishmentn0000dost_t0l4>; Vintage Classics listing of the same six-part + epilogue contents: <https://ctlgs.org/c/books/edition/788/crime-and-punishment-a-novel-in-six-parts-with-epilogue/>).

The original Russian novel was published in 1866 (Project Gutenberg eBook 2554 bibliographic note: <https://www.gutenberg.org/ebooks/2554>).

## Per-part chapter counts (Garnett)

Verified against the Constance Garnett English text on Project Gutenberg (eBook 2554, translator Garnett: <https://www.gutenberg.org/ebooks/2554>; text: <https://www.gutenberg.org/files/2554/2554-h/2554-h.htm>) through Part VI, Chapter V, and against the complete table of contents of the same Garnett translation at the Christian Classics Ethereal Library (<https://ccel.org/ccel/dostoevsky/crimepunish/crimepunish.toc.html>).

| Division | Chapters | Numbering |
| --- | --- | --- |
| Part I / Part One | 7 | Chapter I–VII (or One–Seven) |
| Part II / Part Two | 7 | Chapter I–VII |
| Part III / Part Three | 6 | Chapter I–VI |
| Part IV / Part Four | 6 | Chapter I–VI |
| Part V / Part Five | 5 | Chapter I–V |
| Part VI / Part Six | 8 | Chapter I–VIII |
| Epilogue | 2 | Chapter I–II |

Total: **39 numbered chapters** inside the six parts, plus **2** epilogue chapters. Chapter numbers **restart in each part**. There is no single run of “Chapter 1” through “Chapter 39” in this text.

The Gutenberg HTML fetch used here ends during Part VI, Chapter V; Part VI’s chapter count (eight) and the two-chapter epilogue are taken from the complete CCEL Garnett TOC, which matches Gutenberg’s headings for every part/chapter the Gutenberg file contains.

## Other widely used translations

**Pevear & Volokhonsky (Knopf 1992 / Vintage).** The work’s own subtitle is “a novel in six parts with epilogue.” A Vintage Classics contents listing names Foreword, Translator's Note, Part One–Part Six, Epilogue, Notes — not a continuous 1–39 scheme (<https://ctlgs.org/c/books/edition/788/crime-and-punishment-a-novel-in-six-parts-with-epilogue/>). A chapter-by-chapter TOC counting chapters *inside* each part was not obtained from a Knopf/Vintage scan for this note.

**David McDuff (Viking 1991; Penguin Classics reprint).** First publication: Viking, Harmondsworth, 1991 (Open British National Bibliography: <https://obnb.uk/p11346992-crime-and-punishment>, ISBN 0670836400). Penguin’s current Classics page for ISBN 9780140449136 dates that paperback 30 January 2003 (<https://www.penguin.co.uk/books/35223/crime-and-punishment-by-dostoevsky-fyodor-trans-mcduff-david/9780140449136>). Penguin’s public page does not print a part/chapter TOC.

**Oliver Ready (Penguin Classics 2014).** Penguin lists imprint Penguin Classics, published 27 February 2014, ISBN 9780141192802 (<https://www.penguin.co.uk/books/181168/crime-and-punishment-by-dostoevsky-fyodor/9780141192802>). That page does not print a part/chapter TOC.

No primary TOC was found in this pass that splits the novel into a different number of parts, drops the epilogue, or uses a single continuous chapter index for McDuff, Ready, or Pevear & Volokhonsky.

## Where a reader would land on the wrong page

Even when every edition shares six parts + epilogue and the same per-part counts, **bare chapter numbers are not unique**. “Chapter 5” exists in Parts I, II, III, IV, V, and VI. A Reader who says “I’m on chapter 5” without the part will match six different places.

Other labeling mismatches that would send someone to the wrong bearings page:

1. **Part omitted.** Coordinates must be `(part, chapter)` or an epilogue pair, not `chapter` alone.
2. **Epilogue vs “Part 7.”** Garnett and Pevear & Volokhonsky name a separate Epilogue, not a seventh part. Treating epilogue chapters as Part VI chapters 9–10 (or as Part VII) would miss.
3. **“Part I” vs “Part One.”** Same division, different spelling; a naive string match could fail.
4. **Roman vs Arabic chapter numerals** (I vs 1). Same chapter, different token.
5. **Unverified editions.** Magarshack, Coulson, Katz, Slater, and others were not checked against a publisher TOC here. If a later ticket needs them, verify those books’ front matter rather than assuming the Garnett counts.

The product-relevant fact: **the stable key is part + chapter (and a distinct epilogue), not an integer chapter index.**
