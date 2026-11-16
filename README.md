# MySaaS App — Team Members Dashboard

**Live:** https://andreromanm.github.io/team-members/

## Overview

**MySaaS App** is a front-end project built to deepen my understanding of HTML, CSS, and web accessibility. As a UX/UI designer, my goal was to understand the relationship between design and development: how the concepts I use in Figma translate into code.

## What I Practiced

* **Semantic HTML & Naming Conventions:** I used real `<button>` elements instead of clickable `div`s so every action works with a keyboard and screen readers, structured the page with a single `h1` and `h2` sections, and built the members list as a `<table>` with `scope="col"` headers. In CSS, I named classes by *function* rather than *appearance* (for example, `badge--warning` instead of `yellow-badge`), which creates a shared language between designers and developers.

* **Flexbox:** I built the header, page header and card with Flexbox, which is very similar to Figma's Auto Layout. My biggest lesson: `align-items` on a parent changes every child, so to make just one button hug its content, I used `align-self` on that button.

* **Design Tokens:** I translated colors, spacing, font sizes and radius into CSS custom properties, such as `--blue-600: #0d6efd` and `--space-1: 0.25rem`. Components never use raw values or primitives directly: a button uses `var(--color-primary)`, not `#0d6efd` or `var(--blue-600)`.

* **Web Accessibility (WCAG):** I added a skip link, visible focus states for every button and link, and a `prefers-reduced-motion` media query. I also used screen-reader-only text (`sr-only`) where the visual context isn't enough: a "Resend invite" button includes hidden text "to Ben Carter," so screen reader users know who it's for. All text meets WCAG AA contrast (4.5:1), checked in Chrome DevTools.

## Key Decision: Three Layers of Design Tokens

I organized the tokens in three layers so the code is easy to read and maintain:

1. **Primitives:** raw values, like `--white: #ffffff`.
2. **Semantic tokens:** the purpose of a value, like `--color-background: var(--white)`.
3. **Component tokens:** values only one component uses, like `--color-badge-warning-bg: var(--amber-100)`.

Tokens are chosen by meaning, not by value: two tokens can share a color today and change independently later. Changing the brand color only requires editing the primary semantic tokens in one place.

## What's Next

Rendering the members table from JSON data with JavaScript, including search, filter tabs and live counts.