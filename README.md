# Ana Dental Care, demo website

One-page bilingual (SQ/EN) site prepared by EB Services. Plain HTML, CSS and vanilla JS, no build step.

- Live: https://anadentaldemo.netlify.app (also https://ebservices-sudo.github.io/AnaDentalDemo/)
- Every push to `main` redeploys both.

## Sources

| Item | Source |
|---|---|
| Name, services, both addresses, phone/WhatsApp | Instagram bio, @anadentalcare |
| Dr. Arbnor Azemi | Clinic's Facebook post ("Për buzëqeshjen e Besit është përkujdesur Dr @arbnorazemi") and the watermark on the clinic's own Instagram result photos |
| Facebook page | facebook.com/p/Ana-Dental-Care-100032460324597 |
| Palette | Logo (navy #02315F, text #192F3A) and the clinic's own ads (berry #A3346F, blush #FAF5F8) |
| All photos | The clinic's own Instagram posts (folder supplied by EB Services + 6 before/after posts saved from @anadentalcare) |

Not found publicly, so left out: working hours, email, Google Maps listing / rating, other doctor names.
Note: Instagram and Facebook also list "Dëshmorët e Kombit Boulevard 115–143, Podujevë 11000" as the business address; the site uses the bio wording "Sheshi Zahir Pajaziti". Confirm with the clinic.

## Before/after photos

Real cases published by the clinic. Each pair was split from the original post, scaled and shifted so the mouth lines up, and cropped to the same 3:2 frame. No pixels were generated or retouched. Files: `assets/img/cases/c1..c5-{para,pas}-{700,1200}.webp`; the order and labels live in `CASES` in `assets/js/main.js`.

## Fonts

Cormorant Garamond (headlines) + Montserrat (body, buttons), Google Fonts.
