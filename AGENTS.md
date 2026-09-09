# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## Runtime

The user requested a complete migration to Next.js for Vercel, removing the previous Vite and Sites Worker setup. Use Next.js App Router in `src/app`, with interactive UI in `src/App.jsx`. Run `npm run build` before pushing. `vercel.json` explicitly selects Next.js and `.next` output. Preserve the current content and interactions.

## Selected visual direction

- The user requested the OpenAI GPT-6 Astra page as the new frontend reference on September 9, 2026. This supersedes the Coffee Atlas mock.
- Use white editorial surfaces, centered large sans-serif hero typography, expansive landscape imagery, restrained navigation, and generous section spacing.
- Preserve Hawinet's real logo, all coffee-origin content, interactive map, sample-request workflow, and responsive single-page navigation.
- Preserve “Website made by HisabTech” linked to https://hisabtechnologies.com/.
