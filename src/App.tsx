import { useState } from 'react'
import RetrievalPlayground from './components/RetrievalPlayground'
import { profile, projects, principles } from './content'

function Arrow({ diagonal = false, className = '' }: { diagonal?: boolean; className?: string }) {
  return <svg className={'arrow-icon ' + className} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M4 12h16m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function GithubIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.4 6.8 9.7.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.7.1-.7.1-.7 1 .1 1.6 1 1.6 1 .9 1.5 2.3 1.1 2.8.8.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.8-.1-.3-.4-1.3.1-2.8 0 0 .8-.3 2.8 1.1A9.7 9.7 0 0 1 12 7c.9 0 1.7.1 2.5.3 1.9-1.4 2.8-1.1 2.8-1.1.5 1.5.2 2.5.1 2.8.7.8 1 1.7 1 2.8 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.8v2.8c0 .3.2.6.7.5a10.2 10.2 0 0 0 6.8-9.7C22 6.6 17.5 2 12 2Z" /></svg>
}

const layers = [
  { label: 'Interface', tech: 'React / TypeScript', caption: 'The part that people feel.', detail: 'Thoughtful interfaces, accessible interactions, and clear visual systems. Built on 6+ years of working with React.' },
  { label: 'System', tech: 'Java / Python / APIs', caption: 'The structure underneath.', detail: 'A background in Java and Spring Boot, now extending into Python and FastAPI. Clear contracts connect the experience to the service.' },
  { label: 'Intelligence', tech: 'Retrieval / Evaluation', caption: 'The next chapter.', detail: 'Exploring how retrieval, grounded answers, and evaluation turn AI capabilities into useful product experiences.' },
] as const

function SystemPortrait() {
  const [activeLayer, setActiveLayer] = useState(0)
  const current = layers[activeLayer]
  const lines = Array.from({ length: 8 }, (_, index) => index)

  return <div className="system-portrait">
    <div className="portrait-overline"><span className="tiny-cross">+</span> THE WAY I THINK <span className="portrait-index">FIG. 001</span></div>
    <div className="portrait-drawing" aria-hidden="true">
      <svg viewBox="0 0 530 400" fill="none">
        <defs>
          <pattern id="portrait-grid" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.85" fill="#889384" opacity=".35" /></pattern>
          <linearGradient id="system-surface" x1="100" y1="50" x2="460" y2="340" gradientUnits="userSpaceOnUse"><stop stopColor="#35463c" /><stop offset="1" stopColor="#1f3027" /></linearGradient>
        </defs>
        <rect width="530" height="400" fill="url(#portrait-grid)" />
        <path d="M72 331 250 379 472 256" stroke="#bec4b7" strokeDasharray="3 5" />
        <g className={'portrait-plane plane-bottom ' + (activeLayer === 2 ? 'plane-selected' : '')}>
          <path d="m67 227 244-119 166 101-244 128Z" fill="#d0d5c7" stroke="#aab4a4" />
          <path d="m67 227 166 110v14L67 241Zm166 110 244-128v14L233 351Z" fill="#b8c3b0" stroke="#aab4a4" />
          <path d="m104 226 211-100 124 76-210 111Z" stroke="#9daa94" />
          {lines.map(i => <path key={i} d={'M' + (123 + i * 18) + ' ' + (217 + i * 11) + 'l169-83'} stroke="#a3b099" opacity=".65" />)}
          <circle cx="316" cy="216" r="14" fill="#e4e7dc" stroke="#91a086" /><path d="m307 216 7 5 12-9" stroke="#52664a" strokeWidth="2" />
        </g>
        <g className={'portrait-plane plane-middle ' + (activeLayer === 1 ? 'plane-selected' : '')}>
          <path d="m67 162 244-119 166 101-244 128Z" fill="url(#system-surface)" stroke="#4c6354" />
          <path d="m67 162 166 110v14L67 176Zm166 110 244-128v14L233 286Z" fill="#203329" stroke="#4c6354" />
          <path d="m127 166 66-34 45 28-66 34Z" fill="#536b57" stroke="#809b7c" /><path d="m219 121 66-34 45 28-66 34Z" fill="#536b57" stroke="#809b7c" /><path d="m241 221 66-34 45 28-66 34Z" fill="#536b57" stroke="#809b7c" /><path d="m331 172 66-34 45 28-66 34Z" fill="#536b57" stroke="#809b7c" />
          <path d="m211 158 38-19m-29 37 39 25m50-77 40 24" stroke="#afc6a5" strokeDasharray="4 3" />
          <circle cx="244" cy="158" r="3" fill="#e5edda" /><circle cx="303" cy="176" r="3" fill="#e5edda" />
        </g>
        <g className={'portrait-plane plane-top ' + (activeLayer === 0 ? 'plane-selected' : '')}>
          <path d="m67 96 244-82 166 61-244 94Z" fill="#ecece0" stroke="#a8b3a1" />
          <path d="m67 96 166 73v14L67 110Zm166 73 244-94v14L233 183Z" fill="#d9ddcf" stroke="#a8b3a1" />
          <path d="m104 91 39-13 132 54-39 15Z" fill="#d4daca" /><path d="m159 73 149-50 114 48-149 57Z" fill="#f8f8ef" stroke="#c1cbbb" />
          <path d="m176 70 41-14 31 13-41 15Z" fill="#34483b" /><path d="m256 79 83-30" stroke="#aebaa4" strokeWidth="6" /><path d="m277 91 84-30" stroke="#d0d6c7" strokeWidth="4" /><path d="m305 102 45-17" stroke="#d75a34" strokeWidth="8" />
          <circle cx="415" cy="80" r="7" fill="#d75a34" />
        </g>
        <path d="M38 134v133m0-133 8 8m-8-8-8 8m8 125 8-8m-8 8-8-8" stroke="#a9b39f" /><text x="27" y="216" transform="rotate(-90 27 216)" fill="#7c8875" fontFamily="monospace" fontSize="8" letterSpacing="2">PRODUCT DEPTH</text>
        <circle cx="487" cy="322" r="15" stroke="#a7b29d" /><path d="M479 322h16m-8-8v16" stroke="#75886c" />
      </svg>
    </div>
    <div className="portrait-tabs" role="group" aria-label="Explore the engineering layers">
      {layers.map((layer, index) => <button key={layer.label} type="button" aria-pressed={index === activeLayer} onClick={() => setActiveLayer(index)}><span className="mono">0{index + 1}</span>{layer.label}<span className="layer-indicator" /></button>)}
    </div>
    <div className="portrait-caption" aria-live="polite"><div><span className="mono">{current.tech}</span><h3>{current.caption}</h3></div><p>{current.detail}</p></div>
  </div>
}

function ProjectArtwork({ kind }: { kind: 'network' | 'identity' }) {
  if (kind === 'network') return <div className="project-artwork artwork-network" aria-label="Architecture sketch of a FastAPI service">
    <div className="artwork-topline"><span>NCCP / SERVICE FOUNDATION</span><span>PYTHON 3.12</span></div>
    <div className="network-sketch">
      <div className="sketch-bracket bracket-left" /><div className="sketch-bracket bracket-right" />
      <span className="request-path">HTTP REQUEST</span><span className="sketch-wire" />
      <div className="api-node"><span className="api-node-symbol">⌘</span><span>FastAPI<small>CONTROL PLANE</small></span></div>
      <div className="api-routes"><span><i />Liveness</span><span><i />Readiness</span><span><i />Request ID</span></div>
      <div className="database-node"><svg width="25" height="29" viewBox="0 0 25 29" fill="none" aria-hidden="true"><ellipse cx="12.5" cy="6" rx="10" ry="4" stroke="currentColor" /><path d="M2.5 6v16c0 5.5 20 5.5 20 0V6M2.5 14c0 5.5 20 5.5 20 0" stroke="currentColor" /></svg><span>PostgreSQL</span></div>
    </div>
    <div className="artwork-bottomline"><span><i /> OBSERVABILITY BY DESIGN</span><span>ARCHITECTURE SKETCH ↗</span></div>
  </div>
  return <div className="project-artwork artwork-identity" aria-label="System sketch of a Spring Boot identity API">
    <div className="artwork-topline"><span>IDENTITY / ACCESS MODEL</span><span>JAVA + SPRING</span></div>
    <div className="identity-sketch"><div className="identity-window"><div className="window-bar"><span /><span /><span /><small>access.model</small></div><div className="identity-row"><div className="entity-icon">U</div><div><span>Users</span><small>identity & authentication</small></div><span className="row-index">01</span></div><div className="identity-row"><div className="entity-icon">R</div><div><span>Roles</span><small>relationships & access</small></div><span className="row-index">02</span></div><div className="identity-row"><div className="entity-icon">P</div><div><span>Permissions</span><small>actions & capabilities</small></div><span className="row-index">03</span></div></div><div className="jwt-stamp"><span>JWT</span><small>AUTH</small></div></div>
    <div className="artwork-bottomline"><span>USERS → ROLES → PERMISSIONS</span><span>SYSTEM SKETCH ↗</span></div>
  </div>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [expandedProject, setExpandedProject] = useState<string | null>(null)
  const closeMenu = () => setMenuOpen(false)

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header wrap">
      <a className="wordmark" href="#" aria-label="Himanshu Sharma, home" onClick={closeMenu}><span className="monogram">HS<span>.</span></span><span>Himanshu Sharma<small>SOFTWARE ENGINEER</small></span></a>
      <button className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="primary-nav" onClick={() => setMenuOpen(!menuOpen)} type="button"><span /><span /></button>
      <nav id="primary-nav" className={menuOpen ? 'primary-nav is-open' : 'primary-nav'} aria-label="Main navigation"><a href="#work" onClick={closeMenu}>Work</a><a href="#lab" onClick={closeMenu}>AI lab<span className="nav-dot" /></a><a href="#about" onClick={closeMenu}>About</a><a className="nav-contact" href="#contact" onClick={closeMenu}>Let’s connect<Arrow diagonal /></a></nav>
    </header>

    <main id="main">
      <section className="hero wrap" aria-labelledby="hero-title">
        <div className="hero-copy"><div className="eyebrow"><span className="status-dot" /> FRONTEND ROOTS. FULL STACK THINKING.</div><h1 id="hero-title">Human interfaces.<br /><span className="serif">Intelligent systems.</span></h1><p className="hero-introduction">{profile.introduction}</p><p className="hero-description">{profile.description}</p><div className="hero-actions"><a className="button button-dark" href="#work">Explore my work<Arrow /></a><a className="text-link" href={profile.github} target="_blank" rel="noreferrer"><GithubIcon />GitHub<Arrow diagonal /></a></div><div className="hero-footnote"><span className="mono">CURRENT DIRECTION</span><span>React <span className="footnote-arrow">→</span> Python <span className="footnote-arrow">→</span> Applied AI</span></div></div>
        <SystemPortrait />
        <div className="hero-bottom"><span>CRAFT AT THE SURFACE. RIGOUR UNDERNEATH.</span><a href="#work">SCROLL TO EXPLORE<span>↓</span></a></div>
      </section>

      <section className="work-section wrap section-space" id="work" aria-labelledby="work-title">
        <div className="section-topline"><span className="eyebrow">01 / SELECTED WORK</span><span className="section-aside">A look inside the build.</span></div><div className="section-heading"><h2 id="work-title">Built with <span className="serif">intent.</span></h2><p>Backend foundations, product thinking,<br className="desktop-break" /> and the path toward applied AI.</p></div>
        <div className="project-grid">{projects.map(project => <article className="project-card" key={project.id}><ProjectArtwork kind={project.id} /><div className="project-body"><div className="project-kicker"><span>{project.category}</span><span className="project-status">{project.status}</span></div><h3>{project.title}</h3><p className="project-name">{project.name}</p><p className="project-description">{project.description}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="project-actions"><a href={project.href} target="_blank" rel="noreferrer">Explore the repository<Arrow diagonal /></a><button type="button" aria-expanded={expandedProject === project.id} aria-controls={'details-' + project.id} onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}>{expandedProject === project.id ? 'Close notes' : 'Build notes'}<span>{expandedProject === project.id ? '−' : '+'}</span></button></div><div id={'details-' + project.id} className="project-details" hidden={expandedProject !== project.id}>{project.details.map(detail => <p key={detail}>{detail}</p>)}<div>{project.sources.map(source => <a key={source.href} href={source.href} target="_blank" rel="noreferrer">{source.label}<Arrow diagonal /></a>)}</div></div></div></article>)}</div>
        <div className="work-endnote"><span className="tiny-cross">+</span><p>Public work, with its current scope made clear. Each repository is an opportunity to look beyond the interface.</p><a href={profile.github + '?tab=repositories'} target="_blank" rel="noreferrer">All repositories<Arrow diagonal /></a></div>
      </section>

      <section className="lab-section section-space" id="lab" aria-labelledby="lab-title"><div className="wrap"><div className="section-topline"><span className="eyebrow">02 / THE AI LAB</span><span className="section-aside">Understand what happens underneath.</span></div><div className="section-heading"><h2 id="lab-title">Make the evidence <span className="serif">visible.</span></h2><p>A small, interactive exploration of retrieval.<br className="desktop-break" /> Ask, inspect, and follow the source.</p></div><RetrievalPlayground /></div></section>

      <section className="approach-section wrap section-space" aria-labelledby="approach-title"><div className="section-topline"><span className="eyebrow">03 / ENGINEERING APPROACH</span><span className="section-aside">The decisions behind the code.</span></div><h2 id="approach-title" className="approach-title">The details are <span className="serif">the work.</span></h2><div className="principle-grid">{principles.map(principle => <article key={principle.number}><span className="principle-number mono">{principle.number} /</span><h3>{principle.title}</h3><p>{principle.description}</p></article>)}</div></section>

      <section className="about-section wrap section-space" id="about" aria-labelledby="about-title"><div className="section-topline"><span className="eyebrow">04 / A LITTLE CONTEXT</span><span className="section-aside">Experience, with a new direction.</span></div><div className="about-grid"><div><h2 id="about-title">A product engineer.<br /><span className="serif">An expanding toolkit.</span></h2><div className="about-signature">Himanshu<span>↗</span></div></div><div className="about-copy"><p className="about-lead">I’m Himanshu, a software engineer with 6+ years of experience in React and a background in Java, Spring Boot and AWS.</p><p>I’m extending that foundation into Python, FastAPI and AI application engineering. My interest is in the complete experience: a useful interface, a dependable service, and an AI system whose answers you can examine.</p><div className="toolkit-row"><span className="mono">THE FOUNDATION</span><div><span>React</span><span>Java</span><span>Spring Boot</span><span>AWS</span></div></div><div className="toolkit-row"><span className="mono">THE NEXT CHAPTER</span><div><span>Python</span><span>FastAPI</span><span>Retrieval</span><span>AI evaluation</span></div></div></div></div></section>

      <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="wrap contact-inner"><div className="eyebrow"><span className="tiny-cross">+</span> INTERESTED IN WHAT’S NEXT?</div><h2 id="contact-title">Let’s build something<br /><span className="serif">worth using.</span></h2><a className="contact-link" href={profile.github} target="_blank" rel="noreferrer">Find me on GitHub<Arrow diagonal /></a><p>Explore the code. Follow the experiments.<br />Connect over thoughtful software and applied AI.</p><div className="contact-orbit" aria-hidden="true"><span /><span /><span /><div>HS<span>.</span></div></div></div></section>
    </main>
    <footer className="site-footer wrap"><span>© 2026 {profile.name}</span><span className="footer-credit">BUILT WITH REACT. MADE WITH INTENT.</span><a href={profile.repository} target="_blank" rel="noreferrer">View source<Arrow diagonal /></a><a className="back-top" href="#">Back to top ↑</a></footer>
  </>
}

export default App
