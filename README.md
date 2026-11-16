# MySaaS App — Team Members Dashboard

**https://andreromanm.github.io/team-members/**

## Overview

**MySaaS App** is a hands-on front-end project built to deepen my comprehension of HTML, CSS, and web accessibility. The primary goal was to bridge the gap between design and development by connecting my background in UX/UI and Figma directly to clean, production-ready code.

## What I Practiced

* **Semantic HTML & Naming Conventions:** I explored the benefits of using semantic markup and purpose-driven naming conventions across both design and engineering. Naming elements based on their *function* rather than their *appearance* (for example, using `warning` instead of `yellow`) helps create a shared language between UX designers and developers while preventing maintenance errors in the future.

* **CSS Flexbox:** I practiced aligning and distributing elements within responsive containers using Flexbox, applying mental models similar to Figma's Auto Layout to build clean, adaptable page structures.

* **Design Tokens:** Building on my familiarity with design tokens in Figma, I translated foundational design decisions—such as colors, typography, and spacing—into CSS custom properties. Structuring these into reusable layers allowed me to scale styles consistently across complex components and layouts.

* **Web Accessibility (WCAG):** I implemented accessible configurations directly in HTML and CSS—including skip links, screen-reader-only context (`sr-only`), accessible focus states, and `prefers-reduced-motion` media queries—to ensure the interface can be easily read, navigated, and adapted across different devices and assistive technologies.

## Key Architectural Decision: Semantic Design Tokens

One major decision I made during this project was enforcing a **semantic token architecture** so my codebase would be easy to read, scale, and maintain by other people.

In my mission to write self-documenting code, I separated raw primitive values (like specific hex codes) from semantic tokens that describe their exact purpose (such as `--color-badge-warning-bg` or `--color-text-muted`). Naming styles after their intended role ensures that both designers and developers stay on the exact same page when deciding which configuration to apply to a component.