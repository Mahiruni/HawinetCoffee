import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ChatCircleDots,
  CheckCircle,
  CompassRose,
  GlobeHemisphereEast,
  Handshake,
  Leaf,
  List,
  Plant,
  ShieldCheck,
  X,
} from "@phosphor-icons/react";

const origins = [
  {
    id: "yirgacheffe",
    name: "Yirgacheffe",
    region: "Gedeo Zone",
    altitude: "1,700–2,200m",
    process: "Washed",
    notes: "Floral / Citrus / Honey",
    description:
      "A luminous, tea-like cup with jasmine aromatics, citrus clarity and a clean honeyed finish.",
  },
  {
    id: "sidama",
    name: "Sidama",
    region: "Southern Ethiopia",
    altitude: "1,600–2,000m",
    process: "Washed or natural",
    notes: "Berry / Cocoa / Citrus",
    description:
      "Balanced and expressive, with berry sweetness, soft cocoa depth and a refined citrus lift.",
  },
  {
    id: "guji",
    name: "Guji",
    region: "Oromia Region",
    altitude: "1,800–2,300m",
    process: "Natural or washed",
    notes: "Blueberry / Peach / Floral",
    description:
      "Silky and fruit-forward, prized for layered berry sweetness, stone fruit and floral honey.",
  },
  {
    id: "limu",
    name: "Limu",
    region: "Western Ethiopia",
    altitude: "1,400–1,900m",
    process: "Washed",
    notes: "Citrus / Caramel / Honey",
    description:
      "A smooth, clean profile with rounded sweetness, gentle citrus and a caramel-toned finish.",
  },
  {
    id: "harrar",
    name: "Harrar",
    region: "Eastern Ethiopia",
    altitude: "1,400–2,000m",
    process: "Natural",
    notes: "Blueberry / Chocolate / Spice",
    description:
      "A bold, wine-like cup with dark berry aromatics, chocolate richness and lingering spice.",
  },
  {
    id: "djimmah",
    name: "Djimmah",
    region: "Western Ethiopia",
    altitude: "1,400–2,100m",
    process: "Natural",
    notes: "Cocoa / Spice / Earth",
    description:
      "Full-bodied and comforting, with rich cocoa, warm spice and deep forest-grown character.",
  },
  {
    id: "lekempti",
    name: "Lekempti",
    region: "Wollega",
    altitude: "1,500–2,200m",
    process: "Natural",
    notes: "Berry / Wine / Cocoa",
    description:
      "Sweet and wine-like with a generous body, lively fruit complexity and an aromatic finish.",
  },
  {
    id: "bebeka",
    name: "Bebeka",
    region: "Bench Sheko",
    altitude: "1,000–1,600m",
    process: "Natural",
    notes: "Cocoa / Dried Fruit / Spice",
    description:
      "A mellow, full cup shaped by forest shade, with cocoa sweetness and subtle dried-fruit depth.",
  },
  {
    id: "west-arsi",
    name: "West Arsi",
    region: "Oromia Region",
    altitude: "1,700–2,200m",
    process: "Washed or natural",
    notes: "Jasmine / Lemon / Cane Sugar",
    description:
      "Bright and lively, combining floral aromatics, clean citrus and a smooth cane-sugar finish.",
  },
  {
    id: "kaffa",
    name: "Kaffa",
    region: "Kaffa Biosphere",
    altitude: "1,400–1,800m",
    process: "Natural",
    notes: "Chocolate / Nuts / Dried Fruit",
    description:
      "Coffee from its forest birthplace: deep, rounded and chocolate-rich with a creamy finish.",
  },
  {
    id: "tepi",
    name: "Tepi",
    region: "Southwest Ethiopia",
    altitude: "1,100–1,900m",
    process: "Natural",
    notes: "Spice / Cocoa / Tropical Fruit",
    description:
      "A distinctive western profile with warming spice, cocoa body and a subtle tropical-fruit edge.",
  },
];

const markerPositions = {
  yirgacheffe: { top: "52%", left: "48%" },
  sidama: { top: "67%", left: "51%" },
  guji: { top: "70%", left: "70%" },
};

const processSteps = [
  {
    number: "01",
    title: "Source with proximity",
    copy: "We work close to producers and washing stations across Ethiopia's most distinctive coffee regions.",
    icon: Handshake,
  },
  {
    number: "02",
    title: "Verify every lot",
    copy: "Samples, physical grading and cup evaluation connect each offer to clear origin and quality information.",
    icon: ShieldCheck,
  },
  {
    number: "03",
    title: "Prepare for export",
    copy: "Clean warehousing, careful documentation and export coordination protect quality through dispatch.",
    icon: GlobeHemisphereEast,
  },
];

function BrandLogo() {
  return (
    <a className="brand" href="#top" aria-label="Hawinet Coffee Export home">
      <img src="/assets/hawinet-logo.png" alt="Hawinet Coffee Export" />
    </a>
  );
}

function ButtonContent({ icon: Icon = ArrowRight, children }) {
  return (
    <>
      <span>{children}</span>
      <Icon aria-hidden="true" size={19} weight="regular" />
    </>
  );
}

function SampleModal({ open, onClose, initialOrigin }) {
  const [submitted, setSubmitted] = useState(false);
  const [draftHref, setDraftHref] = useState("");
  const dialogRef = useRef(null);
  const successHeadingRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    setSubmitted(false);
    setDraftHref("");
    const previouslyFocused = document.activeElement;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("no-scroll");
    requestAnimationFrame(() => dialogRef.current?.querySelector("input")?.focus());
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("no-scroll");
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open && submitted) successHeadingRef.current?.focus();
  }, [open, submitted]);

  if (!open) return null;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="sample-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sample-title"
        ref={dialogRef}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close sample request">
          <X size={22} />
        </button>

        {submitted ? (
          <div className="success-state" aria-live="polite">
            <CheckCircle size={46} weight="thin" />
            <p className="eyebrow">Request prepared</p>
            <h2 id="sample-title" ref={successHeadingRef} tabIndex="-1">Your coffee request is ready.</h2>
            <p>
              Open the prefilled email and send it to our export team. We&apos;ll follow up with suitable origins and current availability.
            </p>
            <div className="success-actions">
              <a className="button button-primary" href={draftHref}>Open email draft</a>
              <button className="text-link" type="button" onClick={onClose}>Close</button>
            </div>
          </div>
        ) : (
          <>
            <div className="modal-heading">
              <p className="eyebrow">Start a conversation</p>
              <h2 id="sample-title">Request coffee samples</h2>
              <p>Tell us what you are sourcing. We&apos;ll reply with suitable origins and current availability.</p>
            </div>
            <form
              className="sample-form"
              onSubmit={(event) => {
                event.preventDefault();
                const data = new FormData(event.currentTarget);
                const origin = origins.find((item) => item.id === data.get("origin"));
                const subject = `Coffee sample request — ${origin?.name ?? "Ethiopian origin"}`;
                const body = [
                  "Hello Hawinet Coffee Export,",
                  "",
                  "I would like to request coffee samples.",
                  "",
                  `Name: ${data.get("name")}`,
                  `Company: ${data.get("company")}`,
                  `Email: ${data.get("email")}`,
                  `Origin of interest: ${origin?.name ?? data.get("origin")}`,
                  `Requirements: ${data.get("message") || "Not specified"}`,
                ].join("\n");

                setDraftHref(
                  `mailto:info@hawinetcoffee.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
                );
                setSubmitted(true);
              }}
            >
              <label>
                <span>Name</span>
                <input name="name" autoComplete="name" required placeholder="Your full name" />
              </label>
              <label>
                <span>Work email</span>
                <input name="email" type="email" autoComplete="email" required placeholder="name@company.com" />
              </label>
              <label>
                <span>Company</span>
                <input name="company" autoComplete="organization" required placeholder="Roastery or importing company" />
              </label>
              <label>
                <span>Origin of interest</span>
                <select name="origin" defaultValue={initialOrigin}>
                  {origins.map((origin) => (
                    <option key={origin.id} value={origin.id}>
                      {origin.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="full-field">
                <span>What are you looking for?</span>
                <textarea
                  name="message"
                  rows="3"
                  placeholder="Processing preference, grade, quantity or target profile"
                />
              </label>
              <button className="button button-primary form-submit" type="submit">
                <ButtonContent>Prepare sample request</ButtonContent>
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}

export function App() {
  const [selectedId, setSelectedId] = useState("yirgacheffe");
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const selectedOrigin = useMemo(
    () => origins.find((origin) => origin.id === selectedId) ?? origins[0],
    [selectedId],
  );

  const openSamples = () => {
    setMenuOpen(false);
    setModalOpen(true);
  };

  const scrollToOrigins = () => {
    document.querySelector("#origins")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="site-shell" id="top">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <BrandLogo />
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#origins">Origins</a>
          <a href="#process">Our Process</a>
          <a href="#quality">Quality</a>
          <a href="#stories">Stories</a>
          <a href="#about">About</a>
        </nav>
        <button className="button button-primary header-cta" type="button" onClick={openSamples}>
          Request samples
        </button>
        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X size={25} /> : <List size={27} />}
        </button>
      </header>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">
          {[
            ["Origins", "#origins"],
            ["Our Process", "#process"],
            ["Quality", "#quality"],
            ["Stories", "#stories"],
            ["About", "#about"],
          ].map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <button className="button button-primary" type="button" onClick={openSamples}>
            Request samples
          </button>
        </nav>
      </div>

      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Hawinet Coffee Export · Ethiopia</p>
            <h1 id="hero-title">
              Discover
              <span>Ethiopia by cup.</span>
            </h1>
            <p className="hero-intro">Explore distinct coffees shaped by altitude, forest, craft and place.</p>
            <div className="hero-actions">
              <button className="button button-primary" type="button" onClick={scrollToOrigins}>
                <ButtonContent icon={Leaf}>Explore the origins</ButtonContent>
              </button>
              <button className="button button-outline" type="button" onClick={openSamples}>
                <ButtonContent icon={ChatCircleDots}>Talk to our export team</ButtonContent>
              </button>
            </div>

          </div>
          <figure className="hero-landscape">
            <img src="/assets/origin-farm-panorama.webp" alt="Coffee drying beds surrounded by Ethiopia’s green highlands" fetchPriority="high" />
            <figcaption><span>Rooted in Ethiopia.</span><span>Shared with the world.</span></figcaption>
          </figure>
        </section>

        <section className="origins-section" id="origins" aria-labelledby="origins-title">
          <div className="origins-layout">
            <div className="origins-intro">
              <h2 id="origins-title">Eleven origins. One trusted partner.</h2>
              <p>
                From misty forests to sunlit highlands, we work with communities to bring remarkable coffees to market with clarity and consistency.
              </p>
              <div className="hero-map" aria-label="Featured Ethiopian coffee origins">
                <img
                  src="/assets/ethiopia-origin-map.webp"
                  alt="Ethiopian coffee landscapes within a map of Ethiopia"
                  loading="lazy"
                />
                {Object.entries(markerPositions).map(([id, position]) => {
                  const origin = origins.find((item) => item.id === id);
                  return (
                    <button
                      className={`map-marker ${selectedId === id ? "is-active" : ""}`}
                      key={id}
                      type="button"
                      style={position}
                      onClick={() => setSelectedId(id)}
                      aria-pressed={selectedId === id}
                    >
                      <span className="marker-dot" />
                      <span>{origin?.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="origins-showcase">
              <div className="origin-selector" role="group" aria-label="Choose a coffee origin">
                {origins.map((origin) => (
                  <button
                    key={origin.id}
                    type="button"
                    aria-pressed={selectedId === origin.id}
                    className={selectedId === origin.id ? "is-selected" : ""}
                    onClick={() => setSelectedId(origin.id)}
                  >
                    {origin.name}
                  </button>
                ))}
              </div>

              <div className="origin-feature" aria-live="polite">
                <img
                  src="/assets/origin-farm-panorama.webp"
                  alt="Raised coffee drying beds in Ethiopia's forested highlands"
                  loading="lazy"
                />
                <div className="origin-panel">
                  <div>
                    <p className="eyebrow">{selectedOrigin.region}</p>
                    <h3>{selectedOrigin.name}</h3>
                    <p>{selectedOrigin.description}</p>
                  </div>
                  <dl>
                    <div>
                      <dt>Altitude</dt>
                      <dd>{selectedOrigin.altitude}</dd>
                    </div>
                    <div>
                      <dt>Process</dt>
                      <dd>{selectedOrigin.process}</dd>
                    </div>
                    <div>
                      <dt>Cup character</dt>
                      <dd>{selectedOrigin.notes}</dd>
                    </div>
                  </dl>
                  <button className="text-link" type="button" onClick={openSamples}>
                    Ask about this origin <ArrowRight size={17} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="process-section" id="process" aria-labelledby="process-title">
          <div className="section-heading">
            <p className="eyebrow">Clarity at every handoff</p>
            <h2 id="process-title">From origin to destination.</h2>
            <p>One disciplined path protects the character of every lot and gives buyers the information they need.</p>
          </div>
          <div className="process-grid">
            {processSteps.map(({ number, title, copy, icon: Icon }) => (
              <article className="process-step" key={number}>
                <div className="process-number">{number}</div>
                <Icon size={32} weight="thin" aria-hidden="true" />
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="quality-section" id="quality" aria-labelledby="quality-title">
          <div className="quality-graphic" aria-hidden="true">
            <CompassRose size={110} weight="thin" />
            <span>8° 58&apos; N</span>
            <span>38° 47&apos; E</span>
          </div>
          <div className="quality-copy">
            <p className="eyebrow">Quality with provenance</p>
            <h2 id="quality-title">The sample should tell the truth about the lot.</h2>
            <p>
              Our coffee is stored in a clean, secure warehouse and evaluated with disciplined quality control, so the sample in your hands represents the coffee you receive.
            </p>
            <ul>
              <li><CheckCircle size={19} /> Direct relationships with producers</li>
              <li><CheckCircle size={19} /> Traceable single-origin offers</li>
              <li><CheckCircle size={19} /> Careful storage and lot preparation</li>
            </ul>
          </div>
        </section>

        <section className="story-section" id="stories" aria-labelledby="story-title">
          <div className="story-kicker">
            <Plant size={29} weight="thin" />
            <span>Field note / Ethiopia</span>
          </div>
          <blockquote id="story-title">
            “Every origin has its own language. Our work is to preserve it—from the producer&apos;s hands to the buyer&apos;s cup.”
          </blockquote>
          <a className="text-link" href="https://hawinetcoffee.com/news-blogs/">
            Read coffee stories <ArrowRight size={17} />
          </a>
        </section>

        <section className="about-section" id="about" aria-labelledby="about-title">
          <div>
            <p className="eyebrow">Who we are</p>
            <h2 id="about-title">Close to origin. Ready for the world.</h2>
          </div>
          <div>
            <p>
              Hawinet Coffee Export connects international buyers with genuine Ethiopian coffee through direct sourcing, responsible partnerships and practical export expertise.
            </p>
            <p>
              We operate under Hamiya Investment Group and work to build durable value for producers, roasters and importers alike.
            </p>
            <a className="text-link" href="https://hawinetcoffee.com/about-us/">
              Learn more about Hawinet <ArrowRight size={17} />
            </a>
          </div>
        </section>

        <section className="final-cta" aria-labelledby="cta-title">
          <p className="eyebrow">Build your Ethiopian coffee program</p>
          <h2 id="cta-title">Start with a better sample conversation.</h2>
          <p>Tell us your target profile, processing preference and volume. We&apos;ll help narrow the right origins.</p>
          <button className="button button-light" type="button" onClick={openSamples}>
            <ButtonContent>Request coffee samples</ButtonContent>
          </button>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <BrandLogo />
          <p>Authentic Ethiopian coffee, sourced with clarity and prepared for global buyers.</p>
        </div>
        <div className="footer-links">
          <div>
            <span>Explore</span>
            <a href="#origins">Origins</a>
            <a href="#process">Our process</a>
            <a href="#quality">Quality</a>
          </div>
          <div>
            <span>Company</span>
            <a href="#about">About</a>
            <a href="https://hawinetcoffee.com/gallery/">Gallery</a>
            <a href="https://hawinetcoffee.com/news-blogs/">Stories</a>
          </div>
          <div>
            <span>Contact</span>
            <button type="button" onClick={openSamples}>Request samples</button>
            <a href="mailto:info@hawinetcoffee.com">info@hawinetcoffee.com</a>
            <a href="tel:+251911258161">Adama · +251 911 258 161</a>
            <a href="tel:+251907400000">Addis Ababa · +251 907 400 000</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Hawinet Coffee Export</span>
          <div className="footer-meta-links">
            <a href="https://hamiyainvestment.com/">A Hamiya Investment Group company</a>
            <a href="https://hisabtechnologies.com/">Website made by HisabTech</a>
          </div>
        </div>
      </footer>

      <SampleModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialOrigin={selectedOrigin.id}
      />
    </div>
  );
}
