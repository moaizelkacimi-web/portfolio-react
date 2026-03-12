import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const contactEmail = import.meta.env.VITE_CONTACT_EMAIL?.trim() || "";
const web3FormsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim() || "";
const web3FormsEndpoint = "https://api.web3forms.com/submit";

const navItems = [
  { href: "#about", label: "À propos" },
  { href: "#skills", label: "Compétences" },
  { href: "#projects", label: "Projets" },
  { href: "#contact", label: "Contact" },
];

const skills = [
  { title: "Frontend", items: ["HTML", "CSS", "Tailwind", "React", "Next.js"] },
  { title: "Backend", items: ["PHP", "Laravel", "MySQL", "REST API"] },
  { title: "Outils", items: ["Git", "GitHub", "VS Code", "Figma"] },
];

const projects = [
  {
    title: "Application de gestion",
    desc: "Une application complète de gestion avec authentification et tableau de bord.",
    tech: ["React", "Laravel", "MySQL"],
  },
  {
    title: "Portfolio dynamique",
    desc: "Portfolio personnel animé avec React et Framer Motion.",
    tech: ["React", "Framer Motion", "Tailwind"],
  },
];

const highlights = ["Interface réactive", "Animations fluides", "Approche produit"];
const metrics = [
  { label: "Focus", value: "UI/UX" },
  { label: "Stack", value: "Full" },
  { label: "Motion", value: "Live" },
];
const marqueeItems = [...navItems, ...navItems];

const sectionReveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" },
  viewport: { once: true, amount: 0.25 },
};

export default function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    const preferredTheme = window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
    setTheme(savedTheme || preferredTheme);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const themeLabel = useMemo(
    () => (theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"),
    [theme],
  );

  return (
    <div className="app-shell min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500">
      <BackgroundFX />
      <TopMarquee />
      <Navbar
        theme={theme}
        themeLabel={themeLabel}
        onToggleTheme={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
      />
      <main className="relative z-10 overflow-hidden">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function BackgroundFX() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="ambient ambient-three" />
      <div className="orbital orbital-one" />
      <div className="orbital orbital-two" />
      <div className="grid-overlay" />
      <div className="scanline-overlay" />
      <div className="noise-overlay" />
    </div>
  );
}

function TopMarquee() {
  return (
    <div className="marquee-bar fixed inset-x-0 top-0 z-[60] border-b border-[var(--border-soft)] bg-[var(--surface-nav)]/90 backdrop-blur-xl">
      <div className="marquee-track">
        {[0, 1].map((loop) => (
          <div key={loop} className="marquee-group" aria-hidden={loop === 1}>
            {marqueeItems.map((item, index) => (
              <a key={`${loop}-${item.href}-${index}`} href={item.href} className="marquee-link">
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Navbar({ theme, themeLabel, onToggleTheme }) {
  return (
    <nav className="fixed inset-x-0 top-[3rem] z-50">
      <div className="mx-auto flex max-w-6xl justify-end px-6 py-4">
        <button
          type="button"
          aria-label={themeLabel}
          aria-pressed={theme === "light"}
          onClick={onToggleTheme}
          className="theme-toggle"
        >
          <span>{theme === "dark" ? "Mode clair" : "Mode sombre"}</span>
        </button>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center px-6 pb-16 pt-44">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="hero-panel mx-auto max-w-6xl"
      >
        <div className="hero-grid grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative">
            <motion.span
              className="badge-game mb-6 inline-flex"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
            >
              Secure Session
            </motion.span>
            <div className="hero-copy-wrap">
              <div className="hero-signal" />
              <h1 className="max-w-3xl text-5xl font-black uppercase leading-tight tracking-[0.08em] md:text-7xl">
                Abdelmoaiz El Kacimi
              </h1>
              <p className="mt-5 text-xl font-semibold uppercase tracking-[0.18em] text-[var(--accent)] md:text-2xl">
                Développeur Web Full Stack
              </p>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--text-muted)]">
                Je crée des applications web modernes, dynamiques et performantes.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#projects" className="action-primary">
                Voir mes projets
              </a>
              <a href="#contact" className="action-secondary">
                Me contacter
              </a>
            </div>
            <div className="hero-metrics mt-10 grid gap-4 sm:grid-cols-3">
              {metrics.map((metric) => (
                <motion.div
                  key={metric.label}
                  className="metric-card"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="arena-card"
          >
            <div className="hud-line">
              <span>SCAN</span>
              <strong>THREAT SURFACE</strong>
            </div>
            <div className="career-map" role="img" aria-label="Carte stylisée avec un point de départ et un chemin vers un objectif backend">
              <div className="map-grid" />
              <div className="map-route">
                <span className="route-start" />
                <span className="route-line line-one" />
                <span className="route-line line-two" />
                <span className="route-line line-three" />
                <span className="route-end" />
                <span className="route-ping" />
              </div>
            </div>
            <div className="mt-6 space-y-5">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-[var(--text-muted)]">Mission</p>
                <p className="mt-2 text-lg font-semibold">Construire des expériences web fluides et mémorables.</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-[var(--text-muted)]">Signature</p>
                <p className="mt-2 text-lg font-semibold">Interfaces cyber, code net, lisibilité forte en clair comme en sombre.</p>
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                {highlights.map((item) => (
                  <span key={item} className="stat-pill">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section-wrap">
      <motion.div {...sectionReveal} className="content-panel neon-frame mx-auto max-w-4xl text-center">
        <SectionTitle prefix="01" title="À propos" accent="profil" />
        <p className="text-lg leading-8 text-[var(--text-muted)] md:text-xl">
          Apprenti en développement web full stack (frontend, backend). J&apos;aime créer des interfaces modernes et
          des applications performantes. Toujours en train d&apos;apprendre et de m&apos;améliorer.
        </p>
      </motion.div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section-wrap section-tinted">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle center prefix="02" title="Mes Compétences" accent="arsenal" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {skills.map((skill, index) => (
            <motion.article
              key={skill.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="content-panel skill-panel h-full"
            >
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-2xl font-black uppercase tracking-[0.08em] text-[var(--accent)]">
                  {skill.title}
                </h3>
                <span className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--text-muted)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <ul className="space-y-3">
                {skill.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[var(--text-secondary)]">
                    <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)] shadow-[var(--shadow-glow)]" />
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section-wrap">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle center prefix="03" title="Mes Projets" accent="missions" />
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="project-card holo-panel"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="badge-game">Mission {String(index + 1).padStart(2, "0")}</span>
                <span className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--text-muted)]">
                  En ligne
                </span>
              </div>
              <h3 className="mt-6 text-2xl font-black text-[var(--text-primary)]">{project.title}</h3>
              <p className="mt-4 text-lg leading-8 text-[var(--text-muted)]">{project.desc}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {project.tech.map((item) => (
                  <span key={item} className="stat-pill">
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="section-wrap section-tinted">
      <div className="mx-auto max-w-4xl px-6">
        <SectionTitle center prefix="04" title="Ma Formation" accent="progression" />
        <motion.div {...sectionReveal} className="content-panel timeline-card neon-frame">
          <div className="timeline-dot" />
          <div>
            <h3 className="text-2xl font-black text-[var(--text-primary)]">
              Apprenti en développement web full stack
            </h3>
            <p className="mt-2 text-lg font-semibold text-[var(--accent)]">Frontend, Backend</p>
            <p className="mt-4 text-lg leading-8 text-[var(--text-muted)]">
              Formation complète en développement web full stack.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ type: "error", message: "Remplissez le nom, l'email et le message." });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      if (web3FormsAccessKey) {
        const response = await fetch(web3FormsEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: web3FormsAccessKey,
            subject: `Nouveau message portfolio de ${formData.name.trim()}`,
            from_name: formData.name.trim(),
            name: formData.name.trim(),
            email: formData.email.trim(),
            message: formData.message.trim(),
            botcheck: "",
          }),
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error("web3forms-error");
        }

        setFormData({ name: "", email: "", message: "" });
        setStatus({ type: "success", message: "Message envoyé. Je le recevrai directement." });
        return;
      }

      if (contactEmail) {
        const subject = encodeURIComponent(`Nouveau message de ${formData.name.trim()}`);
        const body = encodeURIComponent(
          `Nom: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\n\nMessage:\n${formData.message.trim()}`,
        );

        window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
        setStatus({
          type: "success",
          message: "Le client email s'ouvre pour envoyer le message vers votre adresse.",
        });
        return;
      }

      setStatus({
        type: "error",
        message: "Configurez VITE_WEB3FORMS_ACCESS_KEY ou VITE_CONTACT_EMAIL pour recevoir les messages.",
      });
    } catch {
      setStatus({
        type: "error",
        message: "Échec de l'envoi. Vérifiez la configuration du contact.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-wrap">
      <div className="mx-auto max-w-3xl px-6">
        <SectionTitle center prefix="05" title="Me Contacter" accent="connexion" />
        <motion.form
          {...sectionReveal}
          className="content-panel neon-frame mt-12 space-y-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="Votre nom"
            className="input-game"
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
          />
          <input
            type="email"
            name="email"
            placeholder="Votre email"
            className="input-game"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
          />
          <textarea
            rows="5"
            name="message"
            placeholder="Votre message"
            className="input-game resize-none"
            value={formData.message}
            onChange={handleChange}
          />
          <input
            type="checkbox"
            name="botcheck"
            className="hidden"
            tabIndex="-1"
            autoComplete="off"
            aria-hidden="true"
          />
          {status.message ? (
            <p
              className={
                status.type === "success" ? "text-sm text-emerald-400" : "text-sm text-rose-400"
              }
            >
              {status.message}
            </p>
          ) : null}
          <button
            type="submit"
            className="action-primary w-full justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Envoi..." : "Envoyer le message"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--border-soft)] bg-[var(--surface-nav)] px-6 py-6 text-center text-sm uppercase tracking-[0.2em] text-[var(--text-muted)]">
      © 2026 Abdelmoaiz El Kacimi - Tous droits réservés
    </footer>
  );
}

function SectionTitle({ prefix, title, accent, center = false }) {
  return (
    <div className={center ? "text-center" : "text-left"}>
      <p className="text-sm font-bold uppercase tracking-[0.35em] text-[var(--accent)]">{prefix}</p>
      <h2 className="mt-3 text-4xl font-black uppercase tracking-[0.08em] md:text-5xl">
        {title} <span className="text-[var(--accent)]">// {accent}</span>
      </h2>
    </div>
  );
}
