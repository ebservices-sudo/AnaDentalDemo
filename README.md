# Ana Dental Care — demo website

One-page, bilingual (Albanian / English) demo site prepared by EB Services for a pitch to
[Ana Dental Care](https://www.instagram.com/anadentalcare/). Plain HTML, CSS and JavaScript:
no build step, no framework. It runs as-is on GitHub Pages or any static host.

> **Demo status.** The before/after photos and the hero photo are AI-generated illustrations,
> labelled "Imazhe ilustruese" under the slider. Replace them with the clinic's real patient
> cases (with written patient consent) before the site goes live. The page also carries
> `noindex` so the demo does not appear in search results; remove it at launch.

## Placeholders to fill in

All clinic details live in one place: the `SITE` object at the top of `assets/js/main.js`.
While a value is empty, the page shows the bracketed placeholder.

| Placeholder | Where | What to enter |
|---|---|---|
| `[WHATSAPP]` | `SITE.whatsapp` | WhatsApp number, digits only, international format (e.g. `383XXXXXXXX`). While it is empty, the buttons open WhatsApp with the message pre-filled and the user picks the contact. |
| `[TELEFONI]` | `SITE.phone`, `SITE.phoneDisplay` | Phone number for `tel:` links and as displayed |
| `[ADRESA]` | `SITE.address` | Street address and city |
| `[ORARI]` | `SITE.hours.sq`, `SITE.hours.en` | Opening hours in both languages |
| `[GOOGLE MAPS]` | `SITE.mapsQuery` | Exact clinic name + address as on Google Maps; the map embed appears automatically |
| Before/after cases | `assets/img/cases/` | Real patient photos: `<case>-para-900/1600.webp` and `<case>-pas-900/1600.webp` (3:2), same framing |
| Hero photo | `assets/img/hero-600.webp`, `hero-900.webp` | Real clinic/patient photo (4:5) |
| Reviews | not included | No reviews section was added: add real Google reviews only, word for word |
| Launch | `index.html` `<head>` | Remove the `robots noindex` line; update `canonical`, `og:url`, `og:image` and JSON-LD to the real domain |

Not invented anywhere on the site: doctor names, years of experience, patient numbers, prices,
awards or reviews.

## Brand

Colours were sampled from the pixels of the official logo:

| Role | Hex | Source |
|---|---|---|
| Primary (navy) | `#02315F` | "ana" wordmark |
| Accent (tooth blue) | `#0C609E` | brightest stroke of the tooth mark |
| Dark neutral (text) | `#192F3A` | "dental care" tagline |
| White / off-white | `#FFFFFF` / `#F5F8FB` | logo background / 3% navy tint |

Fonts (Google Fonts): **Cormorant Garamond** 500/600 for headlines (echoes the high-contrast
"ana" letterforms), **Manrope** 400–700 for body text and buttons.

The logo (`assets/brand/logo.png`) is the supplied file with only the white background removed
(colour-to-alpha against white, so it composites back to the identical pixels). The supplied
file is 150×150 px. Ask the clinic for the original vector (SVG/AI/PDF) so it stays sharp on
high-density screens.

## Structure

```
index.html              page (Albanian copy is in the HTML)
assets/css/styles.css   design tokens + layout (mobile-first)
assets/js/main.js       clinic details, EN translations, slider, menu, language switch
assets/img/             hero, before/after cases (WebP), OG image
assets/brand/           logo, favicons
```

Language: `SQ | EN` toggle in the header; also `?lang=en` in the URL. The choice is remembered.

## Local preview

```sh
python -m http.server 8765
# open http://127.0.0.1:8765/
```
