# ✦ Velvet Night — Homecoming Invitation Template
### By Event Bloom · Deep Indigo & Champagne Gold

**Occasion:** Homecoming Celebration  
**Vibe:** Luxury soirée · Velvet night · Palace doors opening  
**Palette:** Deep indigo `#1C1B3A` · Champagne gold `#D4AF5A` · Cream `#FDFBF7`  
**Fonts:** Bodoni Moda · Cormorant · Raleway · Parisienne  
**Built with:** Bootstrap 5 · Vanilla JS · IntersectionObserver

---

## Files
```
/
├── index.html          ← Invitation page
├── homecoming.css      ← Full design system
├── homecoming.js       ← Countdown + animations + RSVP
├── README.md           ← This file
└── assets/
    ├── hero-bg.jpg     ← (optional) Hero background photo
    ├── couple.jpg      ← Couple section oval portrait
    └── quote-bg.jpg    ← Quote section full-bleed photo
```

---

## Quick Client Setup

### 1. Names
Find and replace throughout `index.html`:
- `Anuradha` → Bride name
- `Hasitha` → Groom name  
- Update footer `Anuradha & Hasitha`

### 2. Date & Time
- `index.html`: Change `18 May 2026`, `10:30 AM`, `18th May 2026`, etc.
- `homecoming.js` line ~73:
  ```js
  const WEDDING_DATE = new Date('2026-05-18T10:30:00');
  ```
- RSVP deadline: `Kindly Reply By 5th May 2026`

### 3. Venue
In the venue section update:
- Venue name, hall name, address
- Date/time/dress code in `.vc-details`
- Google Maps `<iframe src="...">` — get from Google Maps → Share → Embed a map
- "Open in Google Maps" link `href`

### 4. Parents' Names
Find `.cnr-parents` divs and update:
- `Mr. Hendahewa Nandana` / `Mrs. Sanjika Weerakoon` (bride's parents)
- `Mr. Wimal Karunathilaka` / `Mrs. Samantha Munasinghe` (groom's parents)

### 5. RSVP WhatsApp Number
In `homecoming.js`, find:
```js
window.open(`https://wa.me/94771234567?text=...`)
```
Replace `94771234567` with the couple's WhatsApp number (country code + number, no spaces).

---

## Adding Photos

### Couple Section Portrait
```html
<!-- Step 1: Delete this entire div: -->
<div class="couple-ph-placeholder"> ... </div>

<!-- Step 2: Uncomment this line: -->
<!-- <img class="couple-img" src="assets/couple.jpg" alt="Anuradha & Hasitha" /> -->
```
**Photo specs:** Portrait orientation · Min 700×900px · `assets/couple.jpg`

---

### Quote Section Background Photo
This section is deep indigo by default. To enable a background photo:

**Step 1:** Place your image at `assets/quote-bg.jpg`  
- Landscape orientation, minimum 1600×900px  
- Works best with romantic couple photos, garden shots, or soft-focus backgrounds

**Step 2:** Open `homecoming.css` and find `.quote-section`. Uncomment this line:
```css
/* background-image: url('assets/quote-bg.jpg'); */
```
Remove the `/*` and `*/` to activate it.

**Step 3 (optional):** Adjust how dark the overlay is. Find `.quote-overlay` in `homecoming.css`:
```css
.quote-overlay {
  background: rgba(12, 10, 30, 0.65);  ← change 0.65
}
```
- `0.40` = lighter, more photo visible  
- `0.65` = default, balanced  
- `0.80` = very dark, text pops more

---

### Hero Background Photo (optional)
The hero uses a pure indigo background with a glowing arch frame by default — it looks stunning without a photo. But if you want to add one:

**Step 1:** Place image at `assets/hero-bg.jpg` (min 1920×1080px, darker photo works better)

**Step 2:** In `homecoming.css` find `.hc-hero` and uncomment:
```css
/* background-image: url('assets/hero-bg.jpg'); */
/* background-size: cover; background-position: center; */
```

---

### Gallery Photos
Replace each `<div class="hc-gal-placeholder">` block with:
```html
<img class="hc-gal-img" src="assets/photo1.jpg" alt="" />
```

**Gallery tile layout classes:**
| Class | Effect |
|---|---|
| `.hc-gal-item` | Standard square tile |
| `.hc-gal-item.hc-tall` | Spans 2 rows — use for portrait photos |
| `.hc-gal-item.hc-wide` | Spans 2 columns — use for landscape photos |

---

## Colour Customisation
All colours are CSS variables in `homecoming.css` `:root`. To change the theme:

```css
:root {
  --clr-indigo-deep:   #1C1B3A;  /* page background */
  --clr-indigo-mid:    #252455;  /* gallery background */
  --clr-indigo-accent: #3D3B8E;  /* borders, accents */
  --clr-gold:          #D4AF5A;  /* primary accent */
  --clr-gold-light:    #EDD899;  /* highlight gold */
}
```

**Alternative palettes you can try:**
| Swap `indigo` with | Vibe |
|---|---|
| `#1A2E1A` (forest green) | Jungle luxury |
| `#2E1A1A` (deep burgundy) | Royal red |
| `#1A1A1A` (pure black) | Noir elegance |
| `#1C2A3A` (navy blue) | Maritime chic |

---

## Sections Overview

| Section | Background | Notes |
|---|---|---|
| Hero | Deep indigo + arch SVG | Ornate frame with animated gold particles |
| Date | Cream / off-white | Two-column split with vertical rule |
| Quote | Dark indigo + optional photo | Star-dot overlay, side ornament SVGs |
| Countdown | Deep indigo | Gold-top-edge cards with colon dividers |
| Couple | Soft indigo lavender | Single oval portrait, names row below |
| Timeline | Deep indigo | Alternating left/right cards with gold dots |
| Gallery | Indigo mid | Diamond watermark placeholders |
| Venue | Cream + white card | Map iframe + details |
| RSVP | Deep indigo | Gold input focus, WhatsApp submit |
| Footer | Near-black | Gold SVG ornament, script names |

---

## Animations
All animations use native `IntersectionObserver` — lightweight and reliable.
- Hero: staggered text entrance on load
- All sections: fade up as they scroll into view
- Timeline: left cards slide from left, right cards from right
- Gallery: tiles cascade in with 70ms stagger
- Countdown: blocks scale in with delay

To disable animation on any element, remove its animation class:
- Remove `hc-reveal` for fade-up sections
- Remove `hc-scale` for countdown blocks
- Remove `hc-gal-ani` for gallery items
- Remove `hc-tl-left` / `hc-tl-right` for timeline items

---

## How This Differs from the Wedding Template

| | Wedding Template | Velvet Night (Homecoming) |
|---|---|---|
| Occasion | Wedding | Homecoming celebration |
| Palette | Bronze + ivory (warm) | Indigo + gold (cool-luxury) |
| Hero | Full-bleed photo overlay | Ornate arch frame on dark bg |
| Section bg alternation | Ivory / warm-white | Indigo deep / indigo soft / cream |
| Timeline | Alternating left/right vertical | Same but with glowing gold dots |
| Gallery placeholders | Warm bronze floral | Deep indigo diamond pattern |
| Font personality | Romantic, script-heavy | Editorial, high-contrast serif |
| Particles | None | Floating gold ambient dots in hero |
