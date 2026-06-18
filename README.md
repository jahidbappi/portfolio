# Jahid — Personal Portfolio

Live portfolio for **Md. Jahidul Islam** — Full-Stack Developer and AI/ML enthusiast.

**Live site:** [jahidbappi.vercel.app](https://jahidbappi.vercel.app)

Built with HTML, CSS, and vanilla JavaScript. Projects and GitHub stats are loaded live from the [jahidbappi](https://github.com/jahidbappi) GitHub account.

## Features

- Dark theme with animations and responsive layout
- Live GitHub project grid with Web / AI / Mobile filters
- Featured live projects configured in `data.js`
- Animated GitHub stats counters
- Contact form via Web3Forms (or mailto fallback)

## Quick Start

Open `index.html` in a browser, or serve locally:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Customize Content

Edit [`data.js`](data.js) to update:

- Personal info, social links, and skills
- `featuredLiveProjects` — add live URLs for your full-stack apps
- `excludedRepos` — hide repos from the project grid
- `web3formsAccessKey` — get a free key at [web3forms.com](https://web3forms.com)

## Deploy to Vercel

1. Push this repo to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Framework preset: **Other**
4. No build command needed — static site

## Project Structure

```
├── index.html      # Main page
├── styles.css      # Styling and animations
├── script.js       # GitHub API, filters, form handling
├── data.js         # Personal content and featured projects
└── assets/         # Profile image and static assets
```

## License

MIT
