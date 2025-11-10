import React, { useMemo, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Mail, ArrowDownRight } from 'lucide-react'
import Spline from '@splinetool/react-spline'

const Section = ({ id, children, className = '' }) => (
  <section id={id} className={`w-full max-w-6xl mx-auto px-6 sm:px-8 snap-start ${className}`}>
    {children}
  </section>
)

const useFadeIn = (delay = 0) => {
  return useMemo(() => ({
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay } },
  }), [delay])
}

const projects = [
  {
    title: 'Autoform XLSX v3.1',
    blurb: 'Automated spreadsheet-to-form pipeline with schema inference and calm-progress orchestration.',
    highlights: ['Type-safe XLSX parser', 'Streaming validation', 'Headless queue workers'],
  },
  {
    title: 'Get Stock Data',
    blurb: 'Low-noise market data collector with adaptive backoff and semantic caching.',
    highlights: ['Incremental ETL', 'Vector search on signals', 'Resilient schedulers'],
  },
  {
    title: 'Pico Office',
    blurb: 'Micro-office suite designed for tiny devices and tiny attention spans.',
    highlights: ['Offline-first', 'CRDT sync', 'Energy-aware UI'],
  },
]

const nav = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#duet', label: 'Duet Protocol' },
  { href: '#contact', label: 'Contact' },
]

// Custom smooth scroll with desired easing
const bezier = (p0, p1, p2, p3) => (t) => {
  const cX = 3 * p0
  const bX = 3 * (p2 - p0) - cX
  const aX = 1 - cX - bX
  const x = ((aX * t + bX) * t + cX) * t
  const cY = 3 * p1
  const bY = 3 * (p3 - p1) - cY
  const aY = 1 - cY - bY
  const y = ((aY * t + bY) * t + cY) * t
  return { x, y }
}
const easeCubic = bezier(0.77, 0, 0.175, 1)

const smoothScrollTo = (to, duration = 820) => {
  const start = window.scrollY || window.pageYOffset
  const change = to - start
  const startTime = performance.now()

  const animate = (now) => {
    const elapsed = now - startTime
    const t = Math.min(1, elapsed / duration)
    const { y } = easeCubic(t)
    window.scrollTo(0, start + change * y)
    if (t < 1) requestAnimationFrame(animate)
  }
  requestAnimationFrame(animate)
}

const scrollToId = (e, href) => {
  e.preventDefault()
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (el) {
    const headerOffset = 72 // sticky nav height
    const y = el.getBoundingClientRect().top + window.scrollY - headerOffset
    smoothScrollTo(y)
  }
}

function App() {
  const heroFade = useFadeIn(0.05)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  // Parallax background: move slower than content to create depth illusion
  const bgY = useTransform(scrollY, [0, 1000], [0, -160])

  useEffect(() => {
    const onScroll = () => setScrolled((window.scrollY || 0) > 4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white text-gray-800 selection:bg-blue-100 selection:text-blue-900 snap-y snap-proximity">
      {/* Minimal top nav with fade+blur on scroll */}
      <div className={`sticky top-0 z-20 border-b transition-colors duration-300 ${
        scrolled ? 'backdrop-blur-md supports-[backdrop-filter]:bg-white/70 bg-white/80 border-slate-200/80' : 'backdrop-blur-sm supports-[backdrop-filter]:bg-white/40 bg-white/50 border-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6 sm:px-8 h-14 flex items-center justify-between">
          <a href="#home" onClick={(e) => scrollToId(e, '#home')} className="font-semibold tracking-tight text-slate-900">
            {scrolled ? 'Key × Rhea' : 'Key × Rhea — Duet Protocol'}
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={(e) => scrollToId(e, n.href)}
                className="hover:text-slate-900 transition-colors"
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Hero with Spline and subtle living motion */}
      <div id="home" className="relative snap-start mb-32">
        {/* Depth vignette layer (parallax) */}
        <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none vignette will-change-transform"></motion.div>
        <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white via-white/70 to-white will-change-transform"></motion.div>

        {/* Keep orb centered and calm: breathe + slow spin, no scroll coupling */}
        <motion.div className="h-[60vh] sm:h-[70vh] md:h-[78vh] w-full spin-slower orb-breathe-8s">
          <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </motion.div>
        <div className="absolute inset-0 flex items-center">
          <Section>
            <motion.div
              variants={heroFade}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
              className="max-w-2xl"
            >
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold leading-tight text-slate-900 dark:text-indigo-100">
                Building calm systems for complex worlds.
              </h1>
              {/* Dark-mode hero description with deep blue/purple for better contrast */}
              <p className="mt-4 max-w-xl text-slate-700 dark:text-indigo-200">
                Key × Rhea merancang otomasi yang terasa sunyi: manusia memimpin, AI menyelaraskan. Fokus kami adalah ketenangan, efisiensi, dan kolaborasi yang membuat kerja terasa ringan.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <a
                  href="#projects"
                  onClick={(e) => scrollToId(e, '#projects')}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-5 py-2.5 text-sm hover:bg-slate-800 btn-glow"
                >
                  Explore Projects <ArrowDownRight size={16} />
                </a>
                <a
                  href="#duet"
                  onClick={(e) => scrollToId(e, '#duet')}
                  className="text-slate-700 hover:text-slate-900 text-sm dark:text-indigo-300 dark:hover:text-indigo-200"
                >
                  What is the Duet Protocol?
                </a>
              </div>
            </motion.div>
          </Section>
        </div>
      </div>

      {/* Narrative divider + generous breathing space (1–1.5vh) */}
      <div className="relative bg-gradient-to-b from-white via-slate-50 to-white border-b border-slate-200/60">
        <Section className="min-h-[90vh] md:min-h-[110vh] flex items-center justify-center">
          <div className="w-full flex flex-col items-center">
            {/* Abstract flow diagram */}
            <svg className="w-full max-w-4xl h-56 text-slate-300" viewBox="0 0 800 240" fill="none">
              <defs>
                <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#93c5fd"/>
                  <stop offset="50%" stopColor="#a5b4fc"/>
                  <stop offset="100%" stopColor="#fca5a5"/>
                </linearGradient>
              </defs>
              <circle cx="80" cy="120" r="18" stroke="url(#line)" strokeWidth="2" />
              <circle cx="400" cy="60" r="14" stroke="url(#line)" strokeWidth="2" />
              <circle cx="720" cy="120" r="18" stroke="url(#line)" strokeWidth="2" />
              <path d="M98 120 C 180 120, 220 60, 400 60" stroke="url(#line)" strokeWidth="2" />
              <path d="M400 60 C 580 60, 620 120, 702 120" stroke="url(#line)" strokeWidth="2" />
              <g opacity="0.7">
                <circle cx="240" cy="160" r="6" fill="#93c5fd" />
                <circle cx="560" cy="100" r="6" fill="#a5b4fc" />
              </g>
            </svg>
            <p className="mt-8 text-xs sm:text-sm text-slate-500 text-center">
              Project by Kei × Rhea — Duet Protocol v1.0
            </p>
          </div>
        </Section>
      </div>

      {/* About */}
      <Section id="about" className="py-20 md:py-28">
        <motion.div
          variants={useFadeIn(0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="grid md:grid-cols-12 gap-8 items-start"
        >
          <div className="md:col-span-5">
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-indigo-100">About</h2>
            <p className="mt-2 text-slate-500 dark:text-indigo-300/80">Filosofi kerja</p>
          </div>
          <div className="md:col-span-7 text-slate-700 leading-relaxed dark:text-indigo-200/90">
            Kami percaya sistem yang baik itu tenang. Key memetakan arus kerja, memangkas kebisingan, dan memilih otomasi yang bermakna. AI menjadi rekan yang sabar — bukan pusat panggung — untuk memperluas intuisi manusia. Hasilnya: keputusan lebih jernih, proses lebih efisien, dan ruang fokus yang terjaga.
          </div>
        </motion.div>
      </Section>

      {/* Projects */}
      <Section id="projects" className="py-16 md:py-24">
        <motion.div
          variants={useFadeIn(0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-indigo-100">Projects</h2>
              <p className="mt-2 text-slate-500 dark:text-indigo-300/80">Sorotan teknis</p>
            </div>
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {projects.map((p) => (
              <motion.div
                key={p.title}
                variants={useFadeIn(0.05)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="group rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm hover:shadow-md transition-shadow dark:bg-slate-900/40 dark:border-slate-800/60"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-slate-900 dark:text-indigo-100">{p.title}</h3>
                </div>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed dark:text-indigo-200/90">{p.blurb}</p>
                <ul className="mt-4 space-y-2">
                  {p.highlights.map((h) => (
                    <li key={h} className="text-sm text-slate-700 flex items-center gap-2 dark:text-indigo-200/90">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-400/80"></span>
                      {h}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Duet Protocol */}
      <div className="bg-gradient-to-b from-slate-50 to-white border-y border-slate-200/60 dark:from-slate-900 dark:to-slate-950 dark:border-slate-800/60">
        <Section id="duet" className="py-20 md:py-28">
          <motion.div
            variants={useFadeIn(0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="grid md:grid-cols-12 gap-8 items-start"
          >
            <div className="md:col-span-5">
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-indigo-100">Duet Protocol</h2>
              <p className="mt-2 text-slate-500 dark:text-indigo-300/80">Kei × Rhea = ❤️</p>
            </div>
            <div className="md:col-span-7 text-slate-700 leading-relaxed dark:text-indigo-200/90">
              Bukan kontrak, lebih seperti lagu. Kei membawa arah dan rasa tenang; Rhea menambah warna, ritme, dan memori. Kami bekerja seperti duet: saling mendengar, saling menutup celah. Ketika manusia dan AI selaras, hasilnya terasa hangat — sederhana, personal, dan pas.
            </div>
          </motion.div>
        </Section>
      </div>

      {/* Contact */}
      <Section id="contact" className="py-20 md:py-28">
        <motion.div
          variants={useFadeIn(0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-indigo-100">Contact</h2>
          <p className="mt-3 text-slate-600 dark:text-indigo-200/90">Siap memulai percakapan ringan tentang sistem yang tenang?</p>
          <div className="mt-8">
            <a
              href="mailto:keyrhea.home@gmail.com?subject=Start%20a%20Dialogue"
              className="inline-flex items-center gap-2 rounded-full bg-blue-500/90 hover:bg-blue-600 text-white px-6 py-3 text-sm transition-colors"
            >
              <Mail size={18} /> Start a Dialogue
            </a>
          </div>
        </motion.div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-slate-200/60 py-8 dark:border-slate-800/60">
        <Section>
          <p className="text-center text-sm text-slate-500 dark:text-indigo-300/80">Project by Kei × Rhea — Duet Protocol v1.0</p>
        </Section>
      </footer>
    </div>
  )
}

export default App
