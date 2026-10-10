# Kency Francois — Hybrid portfolio

Buildless GitHub Pages portfolio: static HTML, CSS, and JavaScript. No npm installation, third-party scripts, external fonts, analytics, or build pipeline required.

## Preview

From this directory run `python3 -m http.server 8000`, then open http://localhost:8000.

## Deploy to GitHub Pages

1. Commit `index.html`, `assets/`, `.nojekyll`, and this README to the `main` branch of `kfran127/kfran127.github.io`.
2. In GitHub → repository Settings → Pages, select **Deploy from a branch**, **main**, **/ (root)**, then Save.
3. Wait for the Pages build to complete under Actions. Visit https://kfran127.github.io/ and hard-refresh if the old placeholder is cached.

From an authenticated checkout:

```sh
git add index.html assets .nojekyll README.md
git commit -m "Build refined hybrid cybersecurity portfolio"
git push origin main
```

## Content and scope

Facts come from the user's supplied dates/statuses and the local profile reference. SecureBank details and the LinkedIn URL come from that reference. Exactly four projects are featured: SecureBank IAM Lab (Completed); AWS Password Spraying Detection Lab (In Development); AWS IAM Privilege Escalation Detection & Incident Response (Planned); AI-Powered SOC Investigation Assistant (Planned). SecureBank is the main feature and the only project with a repository link. The three new project architectures describe proposed designs, not implemented systems or validated outcomes. Toolkit entries distinguish internship tools from lab tools. No measurable outcomes, live security metrics, employment availability, or credentials are fabricated.

The globe is an abstract decorative network, not live telemetry or real geography. Motion is pausable, respects reduced-motion preferences, and stops when offscreen or the browser tab is hidden. Native details panels work without JavaScript; the globe is the only JS-dependent feature.

## Future content edits

Edit the HTML directly. Update the three developing projects only when implementation evidence is available. Add repository links after the actual repositories exist. Add an email or résumé link only when the owner supplies those details. Verify the LinkedIn and SecureBank links before publishing if they have changed.
