"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function HomePage() {
  /* ================= Theme toggle (dark <-> light), persists ================= */
  useEffect(() => {
    const KEY = "aryan-theme";
    const apply = (t: "dark" | "light" | null) => {
      document.documentElement.removeAttribute("data-theme");
      if (t === "light") {
        document.documentElement.setAttribute("data-theme", "light");
      }
      if (t) localStorage.setItem(KEY, t);
      else localStorage.removeItem(KEY);

      const btn = document.getElementById("themeBtn");
      if (btn) btn.textContent = t === "light" ? "Dark" : "Light";
    };

    const stored =
      (localStorage.getItem(KEY) as "dark" | "light" | null) || null;
    if (!stored) {
      const prefersLight = window.matchMedia?.(
        "(prefers-color-scheme: light)"
      )?.matches;
      apply(prefersLight ? "light" : "dark");
    } else {
      apply(stored);
    }

    const btn = document.getElementById("themeBtn");
    const onClick = () => {
      const cur =
        document.documentElement.getAttribute("data-theme") === "light"
          ? "light"
          : "dark";
      apply(cur === "light" ? "dark" : "light");
    };
    btn?.addEventListener("click", onClick);
    return () => btn?.removeEventListener("click", onClick);
  }, []);

  /* ================= Back-to-top show/hide ================= */
  useEffect(() => {
    const btn = document.getElementById("toTop");
    if (!btn) return;
    const onScroll = () => btn.classList.toggle("show", window.scrollY > 600);
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  /* ================= Active nav highlight on scroll ================= */
  useEffect(() => {
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(".nav-links > a")
    );
    const sections = links
      .map((a) => document.getElementById(a.getAttribute("href")!.slice(1)))
      .filter(Boolean) as HTMLElement[];

    const setActive = () => {
      const y = window.scrollY + 120;
      let best: HTMLElement | null = null;
      let bestDist = Infinity;
      for (const sec of sections) {
        const d = Math.abs(sec.offsetTop - y);
        if (d < bestDist) {
          bestDist = d;
          best = sec;
        }
      }
      links.forEach((a) =>
        a.classList.toggle("active", a.getAttribute("href") === `#${best?.id}`)
      );
    };

    const onScroll = () => requestAnimationFrame(setActive);
    document.addEventListener("scroll", onScroll, { passive: true });
    setActive();
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  /* ================= Project card hover shine ================= */
  useEffect(() => {
    const thumbs = Array.from(
      document.querySelectorAll<HTMLElement>(".project .thumb")
    );
    const onMove = (e: PointerEvent, el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      el.style.setProperty("--mx", `${x}%`);
    };
    thumbs.forEach((el) => {
      const handler = (e: Event) => onMove(e as PointerEvent, el);
      el.addEventListener("pointermove", handler as any);
      (el as any).__shine = handler;
    });
    return () => {
      thumbs.forEach((el) => {
        const handler = (el as any).__shine as EventListener | undefined;
        if (handler) el.removeEventListener("pointermove", handler);
      });
    };
  }, []);

  return (
    <>
      {/* ================= Header ================= */}
      <header>
        <div className="container">
          <nav>
            <div className="brand">
              <div className="name">
                Aryan <span style={{ fontWeight: 900 }}>Bhansali</span>
              </div>
            </div>

            <div className="nav-links" id="navLinks">
              <a href="#about" className="active">
                About
              </a>
              <a href="#experience">Experience</a>
              <a href="#projects">Projects</a>
              <a href="#skills">Skills</a>
              <a href="#education">Education</a>
              <a href="#certifications">Certifications</a>
              <a href="#achievements">Achievements</a>
              <a href="#contact">Contact</a>
            </div>

            <div className="controls">
              <button className="btn glass" id="themeBtn">
                Theme
              </button>
              <a
                href="/aryan_resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn glass"
              >
                Résumé
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* ================= Main ================= */}
      <main id="main" className="container">
        {/* ---------- Hero / About ---------- */}
        <section id="about" className="hero">
          <div>
            <div className="tagline">
              Software Engineering • Exploring Opportunities
            </div>
            <h1 className="title">
              Driven to build software that is practical today and scalable for
              tomorrow.
            </h1>
            <p className="subtitle">
              Hands-on delivering an enterprise BigQuery + Python search
              platform. I focus on pragmatic software design, performance, and
              developer experience.
            </p>
            <div className="row" style={{ marginTop: 14 }}>
              <a
                className="btn glass"
                href="mailto:aryan.bhansali2004@gmail.com"
              >
                Email Me
              </a>
              <a
                className="btn glass"
                target="_blank"
                rel="noopener noreferrer"
                href="https://linkedin.com/in/aryanbhansali10"
              >
                LinkedIn
              </a>
              <a
                className="btn glass"
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/aryanbhansali"
              >
                GitHub
              </a>
            </div>
          </div>

          <div className="card">
            <h2>At a glance</h2>
            <p>
              Emerging <strong>Software Engineer</strong> skilled in scalable
              services and data systems. Experience with keyword &amp; semantic
              search (vector embeddings), SQL optimization, and clean
              interfaces.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "360px 1fr",
                gap: 18,
                alignItems: "center",
                marginTop: 14,
              }}
            >
              <Image
                className="avatar-large"
                src="/aryan.jpg"
                alt="Portrait of Aryan Bhansali"
                width={360}
                height={360}
                priority
              />
            </div>
          </div>
        </section>

        {/* ---------- Experience ---------- */}
        <section id="experience">
          <h2>Experience</h2>
          <div className="timeline">
            <div className="tl-item card">
              <div>
                <strong>Intern</strong> · Colt Technology Services
              </div>
              <div className="muted">Jun 2025 – Aug 2025</div>
              <ul>
                <li>
                  Built a BigQuery + Python Gradio search application unifying
                  12 enterprise tables.
                </li>
                <li>
                  Implemented keyword and semantic search (vector embeddings)
                  for structured/unstructured retrieval.
                </li>
                <li>
                  Optimized pipelines scanning thousands of records, achieving
                  2–5 minute end-to-end retrieval times.
                </li>
                <li>
                  Delivered a scalable proof-of-concept integrating backend
                  services and search workflows for the DIO Division.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- Projects ---------- */}
        <section id="projects">
          <h2>Projects</h2>
          <div className="grid-2">
            <article className="project card" data-tilt>
              <div
                className="thumb"
                style={{
                  position: "relative",
                  height: 180,
                  borderRadius: 14,
                  overflow: "hidden",
                  border: "1px solid var(--border)",
                  background:
                    "linear-gradient(135deg, rgba(110,168,254,.25), rgba(179,136,255,.22))",
                }}
              >
                <div
                  className="shine"
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(600px 100px at var(--mx, 50%) -20%, rgba(255,255,255,.35), transparent 50%)",
                  }}
                />
              </div>
              <h3>
                Landmark Recognition System{" "}
                <span className="muted">(Ongoing)</span>
              </h3>
              <p>
                High-accuracy recognition pipeline for large landmark datasets.
                Training &amp; evaluation workflows, feature extraction,
                optimization routines.
              </p>
              <div className="row" style={{ gap: 8, flexWrap: "wrap" }}>
                <span className="tag">Python</span>
                <span className="tag">Computer Vision</span>
                <span className="tag">Retrieval</span>
              </div>
            </article>

            <article className="project card" data-tilt>
              <div
                className="thumb"
                style={{
                  position: "relative",
                  height: 180,
                  borderRadius: 14,
                  overflow: "hidden",
                  border: "1px solid var(--border)",
                  background:
                    "linear-gradient(135deg, rgba(110,168,254,.25), rgba(179,136,255,.22))",
                }}
              >
                <div
                  className="shine"
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(600px 100px at var(--mx, 50%) -20%, rgba(255,255,255,.35), transparent 50%)",
                  }}
                />
              </div>
              <h3>Enterprise Search POC</h3>
              <p>
                Unified search across 12 BigQuery tables with keyword + semantic
                retrieval, pragmatic caching &amp; profiling. Built a clean
                Gradio UI.
              </p>
              <div className="row" style={{ gap: 8, flexWrap: "wrap" }}>
                <span className="tag">BigQuery</span>
                <span className="tag">Python</span>
                <span className="tag">Gradio</span>
              </div>
            </article>
          </div>
        </section>

        {/* ---------- Skills ---------- */}
        <section id="skills">
          <h2>Skills</h2>
          <div className="skills">
            <div className="skill">
              <span>Python</span>
              <span>Advanced</span>
            </div>
            <div className="skill">
              <span>BigQuery</span>
              <span>Advanced</span>
            </div>
            <div className="skill">
              <span>SQL</span>
              <span>Advanced</span>
            </div>
            <div className="skill">
              <span>Gradio</span>
              <span>Proficient</span>
            </div>
            <div className="skill">
              <span>Streamlit</span>
              <span>Proficient</span>
            </div>
            <div className="skill">
              <span>Software Design</span>
              <span>Proficient</span>
            </div>
            <div className="skill">
              <span>GCP</span>
              <span>Proficient</span>
            </div>
            <div className="skill">
              <span>JavaScript</span>
              <span>Proficient</span>
            </div>
            <div className="skill">
              <span>HTML/CSS</span>
              <span>Proficient</span>
            </div>
            <div className="skill">
              <span>React</span>
              <span>Intermediate</span>
            </div>
            <div className="skill">
              <span>Next.js</span>
              <span>Intermediate</span>
            </div>
            <div className="skill">
              <span>Node.js</span>
              <span>Intermediate</span>
            </div>
          </div>
        </section>

        {/* ---------- Education ---------- */}
        <section id="education">
          <h2>Education</h2>
          <div className="timeline">
            <div className="tl-item card">
              <div>
                <strong>Suncity School</strong> · Gurugram
              </div>
              <div className="muted">2008 – 2022</div>
            </div>
            <div className="tl-item card">
              <div>
                <strong>B.Tech in Computer Science and Engineering</strong> ·
                Manipal University Jaipur
              </div>
              <div className="muted">Aug 2022 – Present</div>
            </div>
          </div>
        </section>

        {/* ---------- Certifications (with small link icon) ---------- */}
        <section id="certifications">
          <h2>Certifications</h2>
          <div className="grid-2">
            <div
              className="card"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div>AWS Academy Graduate – Cloud Foundations (2025)</div>
              <a
                href="https://www.credly.com/go/7fWQ0ZZJ"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link"
                aria-label="Open certificate"
                title="Open certificate"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z"></path>
                  <path d="M5 5h5V3H3v7h2V5z"></path>
                </svg>
              </a>
            </div>
            <div
              className="card"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div>
                Cisco CCNA: Switching, Routing &amp; Wireless Essentials (2024)
              </div>
              <a
                href="https://www.credly.com/badges/4630553f-6a83-4454-89f4-6def48e44b31/public_url"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link"
                aria-label="Open certificate"
                title="Open certificate"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z"></path>
                  <path d="M5 5h5V3H3v7h2V5z"></path>
                </svg>
              </a>
            </div>
            <div
              className="card"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div>Python Essentials 1 – Cisco Networking Academy (2025)</div>
              <a
                href="https://www.credly.com/badges/848d004d-242f-4da1-bfcf-7450f8c684a6/public_url"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link"
                aria-label="Open certificate"
                title="Open certificate"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z"></path>
                  <path d="M5 5h5V3H3v7h2V5z"></path>
                </svg>
              </a>
            </div>
            <div
              className="card"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div>Python Essentials 2 – Cisco Networking Academy (2025)</div>
              <a
                href="https://www.credly.com/badges/35cbb275-6579-46f6-9c77-157883d2e1e0/public_url"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link"
                aria-label="Open certificate"
                title="Open certificate"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z"></path>
                  <path d="M5 5h5V3H3v7h2V5z"></path>
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* ---------- Achievements ---------- */}
        <section id="achievements">
          <h2>Achievements &amp; Leadership</h2>
          <div className="grid-2">
            <div className="card">
              3D Printing Club: Designed a multi-fragrance atomizer using CAD.
            </div>
            <div className="card">
              Robotics Club: Programmed autonomous Lego Mindstorm robots.
            </div>
            <div className="card">
              World Scholar Club: Silver Medals in Writing &amp; Debating.
            </div>
            <div className="card">
              Astronomy Club: Built a working water-propelled rocket.
            </div>
            <div className="card">
              District-level Baseball and Basketball player.
            </div>
          </div>
        </section>

        {/* ---------- Contact ---------- */}
        <section id="contact">
          <h2>Contact</h2>
          <div className="card">
            Reach out via email:{" "}
            <a href="mailto:aryan.bhansali2004@gmail.com">
              aryan.bhansali2004@gmail.com
            </a>{" "}
            or connect on{" "}
            <a
              target="_blank"
              href="https://linkedin.com/in/aryanbhansali10"
              rel="noopener"
            >
              LinkedIn
            </a>
            .
          </div>
        </section>
      </main>

      {/* ================= Footer ================= */}
      <footer className="container">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div>© {new Date().getFullYear()} Aryan Bhansali</div>
          <div className="row">
            <a className="btn" href="#about">
              Top
            </a>
          </div>
        </div>
      </footer>

      {/* Back to Top */}
      <button className="btn to-top" id="toTop" aria-label="Back to top">
        Top
      </button>
    </>
  );
}
