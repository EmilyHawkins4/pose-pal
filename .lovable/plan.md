## Goal

Upgrade the Sanskrit Roots section from a flat dictionary into a study resource a yoga teacher trainee would actually use during YTT — depth on each root, navigability between roots and poses, pronunciation, and a few foundational concepts they'll be tested on.

## What's there today

- ~30 roots, one-line each (sanskrit, meaning, one example, category)
- Searchable list grouped by category
- Per-pose breakdown on PoseDetail linking back to `/roots`
- No pronunciation, no devanāgarī, no detail page, no cross-linking from a root to all poses that use it

## What YTT trainees need that's missing

1. **Pronunciation** — diacritic guide + simple phonetic ("ah-doh moo-kah")
2. **Devanāgarī script** — most YTT manuals show it; recognition matters
3. **Root → all poses** — "show me every pose that uses *parivṛtta*"
4. **More vocabulary** — anatomy (jānu, jaṭhara, pārśva), bandhas/breath, common modifiers (prasārita, upaviṣṭa, jānu, baddha, ūrdhva-mukha), deity/sage names that recur
5. **Foundational concepts** — a short primer: how compound asana names are built (modifier + body part + shape + āsana), the 5 pose-name patterns
6. **Study tools** — bookmark roots, "test me on this category," and the existing Roots quiz already exists but currently pulls from the same flat list

## Plan

### 1. Expand `src/data/sanskritRoots.ts`

Extend the `SanskritRoot` interface with:
- `devanagari: string` (e.g. "अधो")
- `pronunciation: string` (simple phonetic, e.g. "ah-doh")
- `notes?: string` (1-2 sentence teaching note: when/why a teacher would say it, common confusions — e.g. "Often confused with *ūrdhva* (upward).")
- `relatedRootIds?: string[]` (e.g. adho ↔ ūrdhva, baddha ↔ bandha)

Add a new category `"deity"` for Vīrabhadra, Hanumān/Añjaneya, Naṭarāja, Matsyendra, Vasiṣṭha, Garuḍa (already partially scattered under "core"/"shape").

Add ~20 new roots that recur in the catalog or in standard YTT vocabulary:
- **Modifiers**: prasārita (spread/wide), upaviṣṭa (seated/open), jānu (knee), jaṭhara (belly/abdomen)
- **Anatomy**: griva (neck), kaṭi (hip/waist), pṛṣṭha (back)
- **Shapes/objects already in poses**: vṛkṣa (tree), tāḍa (mountain), nāva (boat), hala (plow), uṣṭra (camel), matsya (fish), māla (garland), parigha (gate), phalaka (plank), kapota (pigeon), baka (crane)
- **Concepts**: prāṇa (life force), vinyāsa (sequence), dṛṣṭi (gaze), namas (bow/honor), sūrya (sun), namaskāra (salutation)
- **Qualities/actions**: uttāna (intense stretch — used everywhere), paścima (west/back-body), pūrva (east/front-body), rāja (king)

Update `poseBreakdowns` to link the previously-unmapped tokens (Tāḍa, Vṛkṣa, Matsyendra, Kapota, Rāja, Paścima, Uttāna, Hala, Uṣṭra, Matsya, Māla, Parigha, Phalaka, Vasiṣṭha, Naṭarāja, Garuḍa, Baka, Mārjarya, Bitila, Skanda, Bharmana, Karaṇī) to root IDs now that they exist.

### 2. New: root detail page `/roots/:id`

`src/pages/RootDetail.tsx`:
- Header: large devanāgarī, transliteration with diacritics, simple phonetic, meaning
- Teaching note section
- "Related roots" chips (linked)
- "Poses using this root" — derived from `poseBreakdowns`, rendered as small `PoseCard`s linking to `/pose/:id`
- Bookmark icon (reuse `useBookmarks` pattern with a separate `bookmarkedRoots` key, or extend the hook)

### 3. Update `src/pages/SanskritRoots.tsx`

- Each card becomes a `Link` to `/roots/:id`
- Show devanāgarī alongside transliteration on the card
- Add a count badge: "used in N poses"
- Add a small "How asana names work" callout at the top (collapsible) explaining the modifier + body + shape + āsana pattern with one worked example (Parivṛtta Pārśvakoṇāsana)

### 4. Update `src/pages/PoseDetail.tsx` Sanskrit Breakdown

- Each token with a `rootId` becomes a `Link` to `/roots/:rootId` (currently just static text)
- Add a small pronunciation hint under the Sanskrit name (pulled from the breakdown tokens or a new `pronunciation` field on poses — start with the simpler approach: derive from joined root pronunciations where available, otherwise omit)

### 5. Update `src/pages/Quiz.tsx`

Existing Root quizzes stay. Add one more mode:
- **Devanāgarī → Meaning** (recognition of script)

Optionally allow filtering root quizzes by category (Numbers only, Body parts only, etc.) — useful for trainees drilling one chapter.

### 6. Routing

Register `/roots/:id` in `src/App.tsx`.

## Files

**Created**
- `src/pages/RootDetail.tsx`

**Edited**
- `src/data/sanskritRoots.ts` — expanded interface, ~20 new roots, devanāgarī + pronunciation + notes + related, mapped breakdown tokens
- `src/pages/SanskritRoots.tsx` — link cards to detail, show devanāgarī + pose count, add "how names work" callout
- `src/pages/RootDetail.tsx` (new)
- `src/pages/PoseDetail.tsx` — make breakdown tokens link to root detail
- `src/pages/Quiz.tsx` — add Devanāgarī → Meaning mode, optional category filter for root quizzes
- `src/App.tsx` — register `/roots/:id` route

## Out of scope (call out, don't build)

- Audio pronunciation clips — would need recordings/TTS; can be added later
- Chant/mantra section (Gāyatrī, Patañjali invocation) — different content domain; can be a separate "Chants" feature
- Yoga Sūtra / philosophy vocabulary (yamas, niyamas, kleśas) — also a separate domain; happy to add as a follow-up if YTT scope should expand beyond asana naming
