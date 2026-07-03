# Portfolio

A bilingual one-page portfolio for Wu Chen. Built with React + Vite.

The site is currently set up for a pre-portfolio stage: contact information and
social profiles are live, while project sections are labeled as works in
progress.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Content

Most day-to-day edits live in `src/content.js`:

- `EMAIL`: contact email.
- `RESUME_URL`: leave empty until a resume PDF is ready.
- `PROFILES_EN` / `PROFILES_ZH`: social profile labels and links.
- `featured`: three main work-in-progress project slots.
- `other`: smaller project or practice directions.

## Images

Project image slots currently show styled placeholders. When real artwork is
ready, add image files to `public/` and add a `cover` field to a project:

```js
{ id: "visual-systems", title: "Visual Design Archive", cover: "/covers/visual.jpg" }
```

`ImagePlaceholder` will render an image automatically when a `cover` value is
present.
