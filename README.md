# Dinithi & Pasindu — Wedding Invitation

A one-page Sri Lankan Kandyan wedding invitation: ivory and maroon, fine gold
lines, your lotus artwork, hand-drawn vector ornaments, falling petals and
scroll animations. Plain **HTML + CSS + JavaScript** — no framework, no build step.

Open `index.html` in a browser to see it. For editing, a tiny local server is
nicer (photos and fonts behave exactly as they will online):

```bash
python -m http.server 8080
```

Then visit **http://127.0.0.1:8080/index.html**.

---

## Change these before you share it

| # | What | File | Line |
|---|------|------|------|
| 1 | WhatsApp number that receives RSVPs (country code, no `+`, no spaces) | `js/main.js` | **29** |
| 2 | RSVP deadline in the heading | `index.html` | **397** |
| 3 | Countdown target date/time | `js/main.js` | **25** |

The footer WhatsApp link and the RSVP button both read the number from
`js/main.js` line 29 — change it once there.

---

## Files

| Path | What it is |
|------|------------|
| `index.html` | All the page content and sections |
| `css/style.css` | Colours, layout, animations, responsive rules |
| `js/main.js` | Countdown, petals, reveals, gallery lightbox, RSVP |
| `assets/photos/` | The ten wedding photos used on the page |
| `assets/deco/` | Lotus artwork, vector ornaments, drummer illustration |
| `images/`, `decoration/`, `Example/` | Your untouched originals |

---

## 1. Wedding details

| What | Line in `index.html` |
|------|----------------------|
| Page description (link previews) | 7 |
| Browser tab title | 8 |
| Both names in the hero | **88** and **90** |
| Hero date line | 97 |
| Hero venue line | 98 |
| Hero "Poruwa ceremony at…" line | 99 |
| Big date — day / month / year | **130**, **135**, **140** |
| Blessing quote text | **168–172** |
| Quote attribution | 174 |
| Countdown heading | **188** |
| Couple photo | 232 |
| Bride's parents | **240–242** |
| Groom's parents | **255–257** |
| Venue name | 343 |
| Venue address | 345 |
| Date / Arrival / Poruwa / Dress code rows | **353–366** |
| "Open in Google Maps" link | 371 |
| Embedded map address | 378 |
| RSVP heading | 397 |
| RSVP form | 400–439 |
| Send button | 437 |
| Footer date + note | 452–453 |
| Footer WhatsApp link | 461 |

The timer is already set to **10 December 2026, 9.30 a.m. Sri Lanka time**.
The heading above it says *Until the Poruwa* — the ceremony, not "I do".

---

## 2. Photos

`assets/photos/photo-01.jpg` … `photo-10.jpg` are sized-down copies of the
files in `images/`. They are resized to a maximum of 1600 px and compressed so
each is roughly 130–420 KB (the originals are 4–9 MB each, which made the page
scroll badly).

- **Couple portrait** — `photo-01.jpg`, used in the arch at line 232.
- **Quote background** — `photo-02.jpg`, set in `css/style.css` line 765.
- **Gallery** — `photo-03.jpg` … `photo-10.jpg`, in order at lines **299–322**.

To swap a photo, overwrite the file with the same name. Keep portrait photos
portrait and landscape photos landscape, and keep the file around 1600 px /
under ~450 KB. If you paste in a huge original, the scroll lag will come back.

The lightbox enlarges the same files, so no second set is needed.

---

## 3. Decorations

Your four WhatsApp lotus images now run through the whole invitation, and the
smaller ornaments are vector files so they stay sharp at any size.

| File | Used for | Where it is styled |
|------|----------|--------------------|
| `assets/deco/lotus-large.jpg`, `lotus-mid.jpg` | Large medal­lions in the hero and quote | `css/style.css` 396, 444, 829 |
| `assets/deco/lotus-small.jpg`, `lotus-tiny.jpg` | Small hero medallion, arch crest, quote corner, drummer medallion | 519, 829, 1189 |
| `assets/deco/band.svg` | Gold lotus-petal band in the RSVP and footer | 1437, 1594 |
| `assets/deco/corner.svg` | Filigree corners — hero, date, quote, drummer strip, venue | 128 |
| `assets/deco/divider.svg` | Ornament under section headings | 142 |
| `assets/deco/bo-leaf.svg` | Spare botanical motif (class `.bo-deco`, not currently placed) | 125 |
| `assets/deco/drummer-1.png` | The drummer, used twice — the right one is mirrored | 270, 1133 |

The SVG ornaments are painted with `currentColor` through a CSS mask, so one
file can be maroon on ivory and gold on maroon. To recolour, edit the `color`
and `opacity` rule for that ornament — for example `.hero-medallion` at line
396, or `.drummer-medallion` at 1189. The mask classes (`.lotus-deco`,
`.band-deco`, …) are at line **121**, and the shared `.deco` behaviour at 109.

The old blurry `b4539552…` procession image is no longer used anywhere: the
hero and footer bands are now the vector petal band. Your originals in
`decoration/` are untouched.

---

## 4. Colours and fonts

The palette lives at the top of `css/style.css`, **lines 27–52**:

```css
--maroon:        #6E1B22;   /* main decoration red */
--maroon-deep:   #4A0F14;   /* dark bands, headings */
--maroon-soft:   #8C2A31;
--maroon-tint:   #F3E6E4;
--gold:          #C89B4A;
--gold-light:    #E6CD94;
--ivory:         #FCFAF7;
--white:         #FFFFFF;
--paper:         #F6F0E8;
--ink:           #241615;
```

Change those values and the whole invitation follows. Fonts are loaded in
`index.html` line 19 and assigned at `css/style.css` lines 45–48.

---

## 5. Animations

| Animation | Where |
|-----------|-------|
| Falling petals | `js/main.js` section 2 |
| Hero text entrance | `js/main.js` section 3 |
| Scroll reveals (`.reveal`) | `js/main.js` section 4 |
| Gallery stagger | `js/main.js` section 5 |
| Countdown number tick | `js/main.js` section 6 (Web Animations API) |
| Lotus medallion parallax | `js/main.js` section 9 |
| Reading progress line | `js/main.js` section 8 |

To calm it down, delete the `reveal` class from an element, or edit the
reduced-motion block at `css/style.css` line **1866**. Anyone whose device asks
for reduced motion already gets a still version.

---

## 6. Adding the couple video later

The space is prepared but nothing is shown yet.

1. Save the video as `assets/video/hero.mp4`.
2. On `index.html` line **34**, add `hero--video` to the hero's class list.
3. Uncomment the `<video>` tag on line **71** (inside the comment at 64–72).
4. Optional styling: `css/style.css` line 639 (`.hero-video`).

The arch card and text stay on top of the video, with an ivory veil so the
names remain readable.

---

## 7. Why it scrolls smoothly

The lag in the gallery and venue came from four things, all fixed:

1. **Giant photos.** Ten 40-megapixel JPEGs (≈60 MB) were being decoded while
   scrolling. They are now 1600 px / ≈2.7 MB in total.
2. **`background-attachment: fixed`** on the quote photo forced a full repaint
   every scroll frame. The photo now scrolls normally (`.quote-photo`, 765).
3. **CSS filters on the map and gallery images** — removed.
4. **A forced layout on every countdown tick** — replaced with the Web
   Animations API. The hero parallax also stops once the hero leaves the screen.

---

## 8. Before you send the link

- [ ] WhatsApp number changed (`js/main.js` line 29)
- [ ] RSVP deadline changed (`index.html` line 397)
- [ ] Couple photo, gallery photos and quote photo are the final ones
- [ ] Venue address, map and times checked
- [ ] Hero video added, or left out deliberately
- [ ] Opened on a phone once: tap a gallery photo, send a test RSVP
- [ ] Photos still under ~450 KB each
