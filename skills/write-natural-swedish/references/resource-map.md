# Swedish Reference Map

Use references selectively. Do not turn ordinary editing into research unless accuracy, source attribution, or uncertainty requires it.

## Lookup Order

1. Svenska Akademiens dictionaries via `svenska.se`
   - Use for spelling, inflection, meaning, usage examples, and older language.
   - SAOL is the spelling/inflection norm; SO is best for modern meaning and usage; SAOB is historical.
   - If an exact edition matters, verify live because SAOL 15 appeared in 2026.
   - Link: https://svenska.se/

2. Språkrådet / Isof
   - Use for Swedish writing rules, public Swedish, klarspråk, capitalization, punctuation, recommendations, and debated usage.
   - Start with Frågelådan for specific questions and Klarspråkshjälpen for plain-language revision.
   - Links:
     - https://frageladan.isof.se/
     - https://www.isof.se/svenska-spraket/klarsprak/klarsprakshjalpen
     - https://www.isof.se/svenska-spraket/klarsprak/lar-dig-mer-om-klarsprak/vad-ar-klarsprak

3. Språkbanken Text
   - Use Korp to compare real usage, collocations, genre, and register across large Swedish corpora.
   - Use Karp for lexical-resource lookup when dictionary-level data or word-list evidence matters.
   - Check concordance examples, not just counts; genre and time period can change the answer.
   - Links:
     - https://spraakbanken.gu.se/korp/
     - https://spraakbanken.gu.se/en/tools/korp
     - https://spraakbanken.gu.se/en/tools/karp

4. Tyda
   - Use as a quick bilingual dictionary and synonym finder.
   - Treat it as candidate generation, not final authority for idiom or register; verify important choices in Svenska.se, Isof, or Korp.
   - Link: https://tyda.se/

5. Contemporary and technical Swedish
   - Use Isof Nyordslistan to spot contemporary words and emerging tech terms, but treat it as usage evidence rather than a mandate to use the word.
   - Use Rikstermbanken for specialist terminology and definitions that general dictionaries do not cover.
   - Use Svenska datatermgruppen recommendations, now surfaced through Isof/Rikstermbanken, when IT terms need Swedish spelling, compounds, or equivalents.
   - Use TT-språket as a pragmatic public-writing reference for IT and social-media spellings.
   - Links:
     - https://www.isof.se/svenska-spraket/nyord/nyordslistan-2025
     - https://www.isof.se/svenska-spraket/facksprak-och-terminologi/rikstermbanken
     - https://www.isof.se/svenska-spraket/facksprak-och-terminologi/termgrupper-och-organisationer/svenska-datatermgruppen
     - https://tt-spraket.tt.se/it-termer-sociala-medier/

6. Tech-company documentation style
   - For developer documentation and product docs, adapt the broad tech-writing pattern: conversational but not slangy, direct, active, consistent, accessible, and global-audience friendly.
   - Use these as documentation-style influences, not Swedish-language authorities.
   - Links:
     - https://developers.google.com/style
     - https://developers.google.com/style/tone

7. Dialects and regional Swedish
   - Use Isof dialect pages, the dialect map, and recordings for source-backed regional flavor.
   - Treat written dialect as stylization; verify local traits when the user asks for a named place such as Linköping.
   - Start with `references/marquee-dialects.md` for safe writing patterns before browsing.
   - Links:
     - https://www.isof.se/dialekter/lar-dig-mer-om-svenska-dialekter/utforska-svenska-dialekter/sveamal/ostergotland
     - https://dialektkartan.isof.se/

8. Rivstart
   - Use as a learner-progression reference for Swedish as a foreign language, especially A1-C1 level calibration and communicative practice.
   - Do not quote textbook content unless the user provides the excerpt or asks to work with their material.
   - Link: https://www.nok.se/laromedel/serier/Rivstart/

9. Radio Sweden på lätt svenska
   - Use for contemporary clear Swedish with short news texts and audio, especially when the user asks for `lätt svenska` or learner-friendly style.
   - Link: https://www.sverigesradio.se/radio-sweden-pa-latt-svenska

10. SVT Språkplay / Språkkraft caveat
   - SVT Språkplay was useful historically for interactive subtitles but SVT says the app has been discontinued; use SVT Play for programs and Språkkraft tools for language-learning media support.
   - Links:
     - https://www.svt.se/kontakt/svt-sprakplay
     - https://sprakplay.svt.se/

11. Grammar references
   - Use `Swedish: An Essential Grammar` for compact structure checks and `Swedish: A Comprehensive Grammar` for deeper grammar decisions.
   - Do not reproduce copyrighted explanations; use them as references when available.

## Decision Table

| Need | First stop | Cross-check |
| --- | --- | --- |
| Spelling or inflection | Svenska.se / SAOL | Isof if disputed |
| Meaning and normal usage | Svenska.se / SO | Korp examples |
| Public-sector/plain language | Isof klarspråk | Svenska skrivregler if available |
| Collocation or idiom | Korp | SO examples, native-style judgment |
| English-Swedish candidate | Tyda | SO, Korp, context |
| Contemporary tech word | Isof Nyordslistan | Korp, target audience |
| Specialist tech term | Rikstermbanken | Datatermgruppen/TT where relevant |
| Dialect flavor | Isof dialect pages | Dialect map/recordings, local prompt context |
| Learner difficulty | Rivstart levels | Radio Sweden på lätt svenska |
