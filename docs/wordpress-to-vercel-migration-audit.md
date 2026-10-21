# Hawinet Coffee — WordPress → GitHub → Vercel Migration Audit

**Date:** 2026-10-21  
**Current site:** https://hawinetcoffee.com  
**Target source:** https://github.com/Mahiruni/HawinetCoffee  
**Target platform:** Vercel (Next.js)  
**Stage:** Discovery and plan; no DNS cutover or production release authorized.

## 1. Migration goal
Preserve Hawinet Coffee Export's existing brand, navigation, product detail, copy, photos/video, article archives, forms, domain, SEO and working user journeys, while transitioning frontend hosting from WordPress to Vercel. No live-site replacement until parity, QA, backup and rollback conditions are met.

## 2. Publicly observed WordPress inventory
The following URLs are linked from the public site. Some subpages intermittently timed out during independent audit and require full content exports/screenshots for verification.

| Existing URL | Public evidence | Target |
|---|---|---|
| / | Hero, navigation, coffee origin content, tour promotion, sister-company references | / |
| /about-us/ | Linked from homepage; content unverified | Same route |
| /products/ | Origin catalog, grade scale, video, quality content | Same route |
| /market-info/ | Linked from navigation; content unverified | Same route |
| /news-blogs/ | Six visible 2025 articles, newsletter and tour registration | Same route |
| /gallery/ | Gallery introduction, photos require asset inventory | Same route |
| /contact-us/ | Linked from news and products; form behavior unverified | Same route |
| /early-bird-invitation-1st-edition/ | Article linked from news | Same route |
| /2025-2026-production-will-be-ready-mid-december-for-export-market/ | Article linked from news | Same route |

The article archive must be enumerated from WordPress export and all historical post slugs retained. Also audit any archives, categories, attachments, legal pages, PDFs, language alternatives, search and pagination.

**News archive observed:** 2025/2026 Production Will Be Ready Mid-December for Export Market; Ethiopian Coffee Gains Strength in Global Markets; EARLY BIRD INVITATION! 1st Edition; Ethiopian Coffee Export Regulations: What You Need to Know; Investing in the Future of Ethiopian Coffee; Why Ethiopian Coffee is the World's Favorite.

**Coffee regions observed:** Sidamo, Yirgacheffe, Harrar, Limu, Arsi, Guji, Kafa, Nekemte, Wolayita, Djimma and Bonga. The current site displays grade scale, origin, altitude, processing method, flavor profiles, brewing notes and sustainability information.

**Forms observed / must verify:** tour registration asks for full name, company name, position, website, email, company location, country, phone, interest type, duration and additional notes; newsletter asks for email; contact request form on contact route requires testing.

## 3. Existing GitHub application audit
Existing repo on main:
- Next.js 16 App Router with React 19, src/app/page.jsx rendering src/App.jsx.
- Single homepage with interactive origin selector/map, responsive menu and email-draft sample-request modal.
- Local assets: Hawinet logo, Ethiopian origin map and panoramic image.
- src/app/layout.jsx has basic title/description only.
- News and gallery links point back to WordPress rather than Next.js routes.
- Current sample workflow creates a mailto URL; user must send in their mail client; no server-side submission or email delivery.
- README and vercel.json are configured for Vercel, but that does NOT establish a successful Vercel deployment.
- No additional App Router content pages, blog routes, sitemap or robots files visible in the inspected repo tree.

**Design divergence:** Existing app uses an editorial single-page layout, whereas WordPress exposes a multi-page corporate site. Treat the WordPress live appearance, approved company assets and written brand requirements as the parity baseline. Do not overwrite the prior prototype until design direction and page-by-page preservation have been verified.

## 4. Migration architecture
1. Keep current WordPress serving the live domain during development.
2. Extend the existing Next.js App Router app with real route files that preserve old URL pathnames and trailing-slash behavior.
3. Extract canonical content from a WordPress Tools > Export (all content) file and a separate media backup; REST API may supplement where accessible. WXR alone is not a complete media backup.
4. Use local media or a durable, configured image/media storage solution; do not hotlink to retired WordPress uploads.
5. For modest article volume, move posts to repository-managed MDX/data files; if nontechnical editors need frequent updates, select a headless CMS before migration. Confirm editorial needs before implementation.
6. Implement server-validated contact, tour and newsletter endpoints; use a verified email provider and optional protected lead storage, spam mitigation, rate limits, consent/privacy handling, and real success/error states. Do not commit keys.
7. Preserve metadata, canonical URLs, Open Graph, structured data when appropriate, sitemap, robots, original post dates, alt text and stable redirects.
8. Set up GitHub → Vercel automatic builds and isolated preview deployments. Use staging/preview for all QA.
9. Release only after parity tests, domain/DNS and rollback readiness are approved.

## 5. Work phases and acceptance gates

### Phase A — Full extraction (blocked on owner-provided WordPress export/access)
- Back up WordPress database and wp-content/uploads, theme customization, plugins and form settings.
- Export all WordPress content; enumerate post IDs, URL paths, menu order, taxonomies and redirect rules.
- Capture desktop/mobile screenshots of every unique template and dynamic state.
- Export existing form notification workflows, newsletter data only with proper authorization and data-protection controls.
- Freeze inventory into a reconciliation spreadsheet.

**Exit:** every live route/media asset/form has an owner and destination mapping.

### Phase B — Page and asset parity
- Homepage with approved visual fidelity and functional navigation.
- /about-us/, /products/, /market-info/, /news-blogs/, /gallery/, /contact-us/.
- Individual article pages with preserved URL slugs, dates and content.
- Gallery image loading, optional lightbox, video, responsive nav, accessibility.
- Include Hamiya Investment Group attribution and corporate contact info.
- Fix duplicated rendering only with client approval; do not silently alter copy.

**Exit:** content count and route parity, no WordPress-domain dependencies except explicitly approved integrations.

### Phase C — Backend parity
- Validated contact, sample, coffee-tour signup, newsletter enrollment.
- Anti-spam controls, privacy/consent, protected API secrets.
- Delivery success based on actual service response, not a mailto draft.
- Verify admin receipts, acknowledgement emails, fallback for failed delivery and data retention.

**Exit:** end-to-end submissions verified in preview using non-production recipients.

### Phase D — SEO, performance and QA
- Crawl old and new site and compare status, titles, descriptions, canonicals, headings, images and internal links.
- Keep old URL slugs or map intentional changes using 301/308 redirects; sitemap.xml and robots.txt.
- QA on small phones, tablets and desktop; keyboard/screen reader; image/video optimization.
- Run production build, check preview deployment, link checker and form E2E tests.
- Validate site analytics, indexing and Search Console ownership.

**Exit:** approved parity report and no P0/P1 regressions.

### Phase E — Cutover and rollback
- Confirm DNS access, email MX/TXT record preservation, TTL and certificate readiness.
- Connect exact production domain after tests; observe DNS/HTTPS and forms.
- Retain a complete WordPress backup and documented revert-to-old-origin plan.
- Re-submit sitemap and monitor 404s, conversions, email errors and SEO after launch.

**Exit:** confirmed live Vercel deployment, domain routing, working forms, and rollback path.

## 6. Priority issues to resolve before public launch
1. Existing Next.js app is a homepage only, not a WordPress multi-page replacement.
2. News, Gallery and About still link to old WordPress origin.
3. Tour registration, newsletter and full contact workflow not implemented in Next.js.
4. Article media, exact content and source backups not yet extracted.
5. Existing WordPress public content appears to contain duplicate product/origin text and outdated or ambiguous tour dates; require editorial sign-off, not automatic rewrites.
6. Repo's basic metadata does not yet match a full multi-page SEO migration.
7. New website's production Vercel project and domain setup not yet confirmed.

## 7. Files or access needed from site owner
- WordPress Tools → Export → All content (.xml), uploaded here.
- Zip of wp-content/uploads (or host-provided full WordPress backup; avoid sharing passwords).
- Theme customization export / screenshots and list of plugins, menus, form integrations and any custom code.
- Existing redirects/sitemap and optional Search Console export.
- Editorial decision: retire WordPress entirely vs keep it privately as a headless CMS.
- Target Vercel team and confirmation of DNS/domain ownership when production stage begins.

**Security:** Never request WordPress administrator credentials or API tokens in chat. Use authorized file uploads and secure provider-side configuration.

## 8. Immediate next engineering move
Obtain content/media export; generate route-by-route parity map; implement internal routes and use Vercel preview without modifying DNS. Do not claim migration complete until WordPress content and interactions have been reconciled and user acceptance tests pass.

## References
- https://hawinetcoffee.com/
- https://hawinetcoffee.com/products/
- https://hawinetcoffee.com/news-blogs/
- https://github.com/Mahiruni/HawinetCoffee
- https://developer.wordpress.org/rest-api/
- https://vercel.com/docs/deployments
