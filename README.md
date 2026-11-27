# Visionary Events — website prototype

Static, dependency-free site (HTML + CSS + vanilla JS). Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Structure
- `index.html` — single-page site: Hero slider · About · Services · Technical production · Selected events · Vision/Mission/Values · Founder · Gallery · Contact
- `assets/css/style.css` — all styles (brand colours in `:root`)
- `assets/js/main.js` — preloader, hero slider, scroll reveals, parallax, horizontal work scroller, gallery + lightbox, contact form
- `assets/img/gallery/{corporate,wedding,social,audiovisual}/` — 194 photos pulled from visionaryevents.in
- `scrape/` — raw HTML/JS captured from the current live site (reference only, not used by the page)

## Still needed from the client
1. **Founder name, photo and bio.** Search `index.html` for `[Founder Name]` and `REPLACE`.
2. **Form delivery.** "Send enquiry" currently opens the visitor's email app (mailto). For production, connect a form service (Formspree, Web3Forms, or the hosting provider's forms) in `main.js` → `CONTACT FORM`.
3. Optional: event videos (the current site has none). A hero video can replace any `.hero__slide` background.

## Dev helper
`index.html?static&at=gallery&slide=1` skips the preloader, shows every animation in its end state, and jumps to a section and hero slide. Used for screenshots.
