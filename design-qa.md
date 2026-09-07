# Design QA — Hawinet Coffee Modernization

## Target and evidence

- Visual truth: the selected third direction, “Coffee Atlas,” in [`qa/source-selected-mock.png`](qa/source-selected-mock.png).
- Browser-rendered implementation: [`qa/implementation-desktop.png`](qa/implementation-desktop.png).
- Full-view side-by-side evidence: [`qa/design-comparison.png`](qa/design-comparison.png).
- Comparison state: home page, top of page, Yirgacheffe selected, sample dialog closed.
- Source design: 1536×1024 at 1× density, normalized to an 800×533 crop.
- Implementation: 1536×1024 CSS viewport at 1× density, normalized to an 800×533 crop.
- Responsive evidence: a 390×844 CSS viewport at 1× density was checked independently.
- Focused-region comparison was not required: the target covers only the header, hero, and opening origins section, and both full-size individual captures remained available for inspection of type, icons, imagery, and controls.

The normalization rule was used only for the QA capture and was removed before the production build.

## Required fidelity surfaces

- **Fonts and typography:** Bodoni Moda recreates the high-contrast editorial display voice; DM Sans preserves the compact navigation and body hierarchy. Final line breaks, weights, letter spacing, and optical scale follow the target without clipping.
- **Spacing and layout rhythm:** Header, split hero, atlas composition, origin rail, and two-column editorial opening match the target hierarchy. Section spacing remains stable across desktop and mobile.
- **Colors and visual tokens:** Warm ivory, Ethiopian green, muted gold, charcoal type, fine rules, and restrained shadows map consistently to the selected direction with readable contrast.
- **Image quality and asset fidelity:** The supplied Hawinet logo is preserved. The Ethiopia origin atlas and farm panorama are sharp, correctly cropped, locally bundled assets with no placeholders or hotlinks.
- **Copy and content:** Headings, coffee-origin data, buyer-oriented actions, process copy, company positioning, and destination links are coherent and specific to Hawinet Coffee Export.
- **Icons and interaction states:** One consistent Phosphor icon family is used. Hover, focus, selected, open, validation, and success states are present and visually aligned.

## Comparison history

### Pass 1

- **P1 · layout:** The origins content stacked beneath the section introduction, unlike the target's editorial two-column composition. Fixed by restoring the wide side-by-side grid and aligning the tab rail, story image, and description panel.
- **P2 · spacing:** The hero content sat too low and the map composition was under-emphasized. Fixed by tightening hero spacing and repositioning/scaling the map within its intended slot.

### Pass 2

- **P2 · typography:** The origins heading wrapped to three lines instead of two. Fixed by increasing the heading measure and calibrating the responsive display size.
- **P2 · typography/layout:** The hero display type was smaller than the target. Fixed with a larger fluid type scale while preserving mobile wrapping.

### Final pass

- No actionable P0, P1, or P2 fidelity issues remain in the post-fix comparison.
- **Accepted P3 · imagery:** The final Ethiopia contour treatment and farm photography vary slightly from the conceptual mock while preserving the subject, crop, palette, density, and hierarchy.
- **Accepted P3 · spacing:** Minor pixel-level differences remain in header icon spacing and the map background blend.

## Functionality, responsiveness, and accessibility

- All 11 origin tabs update region details and synchronize with map-marker selection.
- “Request samples” opens a labeled form with the active origin selected. Input, native validation, email-draft preparation, close, backdrop, and Escape behavior were exercised.
- “Explore the origins” scrolls to the correct section.
- Mobile navigation opens and exposes the primary links and CTA.
- Desktop and 390px mobile layouts were checked for overlap, clipping, awkward wrapping, horizontal overflow, and unusable controls; none remain.
- Semantic navigation, tabs, modal controls, labels, image alt text, keyboard focus styling, practical tap targets, and reduced-motion support are present.
- Browser console output was checked during the primary journey. No app-origin errors were present; browser-extension metadata errors were excluded from the application result.

## Implementation checklist

- [x] Selected visual direction implemented.
- [x] Real brand assets and coffee imagery integrated.
- [x] Primary browsing and sample-request journeys functional.
- [x] Desktop and mobile responsive checks completed.
- [x] Production build and hosting-worker checks passed.

final result: passed
