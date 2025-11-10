import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Mail, ArrowDownRight } from 'lucide-react'
import Spline from '@splinetool/react-spline'

const Section = ({ id, children, className = '' }) => (
  <section id={id} className={`w-full max-w-6xl mx-auto px-6 sm:px-8 ${className}`}>
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

const scrollToId = (e, href) => {
  e.preventDefault()
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function App() {
  const heroFade = useFadeIn(0.05)

  return (
    <div className="min-h-screen bg-white text-gray-800 selection:bg-blue-100 selection:text-blue-900">
      {/* Minimal top nav */}
      <div className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 h-14 flex items-center justify-between">
          <a href="#home" onClick={(e) => scrollToId(e, '#home')} className="font-semibold tracking-tight text-slate-900">
            Key × Rhea — Duet Protocol
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

      {/* Hero with Spline */}
      <div id="home" className="relative">
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white via-white/70 to-white"></div>
        <div className="h-[60vh] sm:h-[70vh] md:h-[78vh] w-full">
          <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="absolute inset-0 flex items-center">
          <Section>
            <motion.div
              variants={heroFade}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
              className="max-w-2xl"
            >
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold leading-tight text-slate-900">
                Building calm systems for complex worlds.
              </h1>
              <p className="mt-4 text-slate-600 max-w-xl">
                Key × Rhea merancang otomasi yang terasa sunyi: manusia memimpin, AI menyelaraskan. Fokus kami adalah ketenangan, efisiensi, dan kolaborasi yang membuat kerja terasa ringan.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <a
                  href="#projects"
                  onClick={(e) => scrollToId(e, '#projects')}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-5 py-2.5 text-sm hover:bg-slate-800 transition-colors"
                >
                  Explore Projects <ArrowDownRight size={16} />
                </a>
                <a
                  href="#duet"
                  onClick={(e) => scrollToId(e, '#duet')}
                  className="text-slate-700 hover:text-slate-900 text-sm"
                >
                  What is the Duet Protocol?
                </a>
              </div>
            </motion.div>
          </Section>
        </div>
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
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">About</h2>
            <p className="mt-2 text-slate-500">Filosofi kerja</p>
          </div>
          <div className="md:col-span-7 text-slate-700 leading-relaxed">
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
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">Projects</h2>
              <p className="mt-2 text-slate-500">Sorotan teknis</p>
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
                className="group rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-slate-900">{p.title}</h3>
                </div>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{p.blurb}</p>
                <ul className="mt-4 space-y-2">
                  {p.highlights.map((h) => (
                    <li key={h} className="text-sm text-slate-700 flex items-center gap-2">
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
      <div className="bg-gradient-to-b from-slate-50 to-white border-y border-slate-200/60">
        <Section id="duet" className="py-20 md:py-28">
          <motion.div
            variants={useFadeIn(0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="grid md:grid-cols-12 gap-8 items-start"
          >
            <div className="md:col-span-5">
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">Duet Protocol</h2>
              <p className="mt-2 text-slate-500">Kei × Rhea = ❤️</p>
            </div>
            <div className="md:col-span-7 text-slate-700 leading-relaxed">
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
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">Contact</h2>
          <p className="mt-3 text-slate-600">Siap memulai percakapan ringan tentang sistem yang tenang?</p>
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
      <footer className="border-t border-slate-200/60 py-8">
        <Section>
          <p className="text-center text-sm text-slate-500">Project by Kei × Rhea — Duet Protocol v1.0</p>
        </Section>
      </footer>
    </div>
  )
}

export default App
