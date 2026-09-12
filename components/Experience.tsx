'use client';

import dynamic from 'next/dynamic';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Clock3, Instagram, MapPin, Menu as MenuIcon, MousePointer2, Sparkles, X } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';

const CafeScene = dynamic(() => import('./CafeScene'), { ssr: false, loading: () => <div className="scene-loader">LOADING 3D EXPERIENCE</div> });

const menu = [
  ['01', 'Velvet Espresso', 'Dark chocolate · orange peel', '₹240'],
  ['02', 'Cloud Cappuccino', 'Vanilla · sea salt · microfoam', '₹320'],
  ['03', 'Midnight Tiramisu', 'Mascarpone · cacao · espresso', '₹390'],
  ['04', 'Golden Affogato', 'Vanilla gelato · double shot', '₹360'],
];

const chapters = [
  ['01', 'THE POUR', 'Pressure, crema, silence.'],
  ['02', 'THE TABLE', 'A place for ideas to stay late.'],
  ['03', 'THE NIGHT', 'Low light. Slow music. One more cup.'],
];

export default function Experience() {
  const hero = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: hero });
  const smooth = useSpring(scrollYProgress, { stiffness: 70, damping: 25 });
  const scale = useTransform(smooth, [0, 1], [1, 1.2]);
  const y = useTransform(smooth, [0, 1], [0, -120]);
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(0);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const moveCursor = (e: React.MouseEvent) => {
    cursorX.set(e.clientX); cursorY.set(e.clientY);
  };

  return <main onMouseMove={moveCursor} className="noir-experience">
    <motion.div className="custom-cursor" style={{ x: cursorX, y: cursorY }}><span>VIEW</span></motion.div>
    <div className="scroll-progress" style={{ transformOrigin: '0 50%' }}><motion.div style={{ scaleX: smooth }} /></div>

    <nav className="nav">
      <Link href="/" className="brand">NOIR<span>°</span></Link>
      <div className="nav-links"><Link href="/menu">Menu</Link><Link href="/story">Story</Link><Link href="/gallery">Gallery</Link><Link href="/contact">Visit</Link></div>
      <Link className="nav-cta" href="/reservations">Reserve a table <ArrowUpRight size={13}/></Link>
      <button className="mobile-menu" aria-label="Open menu" onClick={() => setOpen(!open)}>{open ? <X/> : <MenuIcon/>}</button>
      {open && <div className="mobile-nav"><Link href="/menu" onClick={() => setOpen(false)}>Menu</Link><Link href="/story" onClick={() => setOpen(false)}>Story</Link><Link href="/gallery" onClick={() => setOpen(false)}>Gallery</Link><Link href="/contact" onClick={() => setOpen(false)}>Visit</Link><Link href="/reservations" onClick={() => setOpen(false)}>Reserve</Link></div>}
    </nav>

    <section className="hero hero-immersive" ref={hero}>
      <div className="hero-noise" />
      <motion.div className="hero-copy" style={{ y }}>
        <p className="eyebrow">HYDERABAD · COFFEE · CULTURE · AFTER DARK</p>
        <div className="hero-kicker"><Sparkles size={12}/> A DIGITAL CAFÉ EXPERIENCE</div>
        <h1>COFFEE<br/><em>WITHOUT</em><br/>LIMITS.</h1>
        <p className="hero-sub">A cinematic coffee house for people who stay curious after the last cup.</p>
        <div className="hero-actions"><Link className="pill" href="/menu">Explore the experience <ArrowUpRight size={14}/></Link><Link className="ghost-link" href="#ritual">Scroll to enter <ArrowDown size={14}/></Link></div>
      </motion.div>
      <motion.div className="hero-art" style={{ scale }}><CafeScene /></motion.div>
      <div className="hero-side-label">DRAG / MOVE / SCROLL</div>
      <div className="hero-meta"><span>17° 26′ N</span><span>78° 26′ E</span><span>OPEN UNTIL 01:00</span></div>
    </section>

    <section className="marquee"><div>ESPRESSO — CONVERSATION — MUSIC — DESSERT — MIDNIGHT — ESPRESSO — CONVERSATION — MUSIC —</div></section>

    <section className="statement" id="ritual"><div><p className="eyebrow">THE NEW COFFEE RITUAL</p><h2>Not a café.<br/><span>A mood.</span></h2></div><div><p className="statement-copy">Slow pours. Loud ideas. Low light. NOIR turns the everyday coffee run into a small cinematic escape. Built for conversations that outstay the clock.</p><div className="scroll-hint"><MousePointer2 size={15}/> Move through the ritual</div></div></section>

    <section className="chapter-section">
      <div className="chapter-intro"><p className="eyebrow">THE NOIR METHOD / 01—03</p><h2>Three moments.<br/><em>One feeling.</em></h2></div>
      <div className="chapter-list">{chapters.map(([n,t,d],i)=><motion.div key={n} className={`chapter ${i===activeMenu?'selected':''}`} onMouseEnter={()=>setActiveMenu(i)} whileHover={{x:12}}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div><ArrowUpRight size={18}/></motion.div>)}</div>
    </section>

    <section className="menu-section" id="menu"><div className="section-head"><div><p className="eyebrow">SIGNATURES / 01—04</p><h2>Made to be<br/><em>remembered.</em></h2></div><p className="section-note">Our menu changes with the hour, the weather and whatever feels right behind the bar.<br/><Link href="/menu" className="text-link">View full menu →</Link></p></div><div className="menu-grid">{menu.map(([num,name,desc,price],i) => <motion.article whileHover={{ y: -16, rotateX: 5, rotateY: -4 }} transition={{ type:'spring', stiffness:220, damping:18 }} className={`menu-card ${i===activeMenu?'is-active':''}`} onMouseEnter={()=>setActiveMenu(i)} key={num}><span>{num}</span><div className="menu-card-orb"><div className="coffee-liquid" /></div><h3>{name}</h3><p>{desc}</p><strong>{price}</strong><small>VIEW DETAIL ↗</small></motion.article>)}</div></section>

    <section className="experience-banner"><div className="banner-glow"/><p className="eyebrow">A SMALL WORLD, BUILT FOR SLOW NIGHTS</p><h2>Turn the screen<br/><em>into a doorway.</em></h2><div className="banner-stats"><span><b>01</b> 3D BAR</span><span><b>02</b> LIVE MENU</span><span><b>03</b> TABLE BOOKING</span><span><b>04</b> MOBILE FIRST</span></div></section>

    <section className="story" id="story"><div className="story-orb"><div className="orb-ring"/><div className="orb-ring ring-two"/><div className="orb-ring ring-three"/><div className="orb-core">NOIR<br/><small>EST. 2026</small></div></div><div><p className="eyebrow">OUR PHILOSOPHY</p><h2>Beautiful things<br/>take <em>time.</em></h2><p>We source obsessively, roast intentionally and serve without ceremony. Every detail is designed to make you slow down for a moment longer.</p><Link className="text-link" href="/story">Discover our story →</Link></div></section>

    <section className="gallery" id="gallery"><div className="gallery-word">NOIR</div><Link href="/gallery" className="gallery-card tall"><span>01 / NIGHT SHIFT</span><b>01</b></Link><Link href="/gallery" className="gallery-card wide"><span>02 / SLOW MORNING</span><b>02</b></Link><Link href="/gallery" className="gallery-card square"><span>03 / THE BAR</span><b>03</b></Link><Link href="/gallery" className="gallery-card fourth"><span>04 / AFTER DARK</span><b>04</b></Link></section>

    <section className="visit-strip"><div><p className="eyebrow">COME AS YOU ARE</p><h2>Banjara Hills.<br/><em>After sunset.</em></h2></div><div className="visit-info"><p><MapPin size={15}/> Road No. 12 · Hyderabad</p><p><Clock3 size={15}/> Daily · 08:00 — 01:00</p><p><Instagram size={15}/> @noircafe</p><Link className="pill dark" href="/contact">Get directions <ArrowUpRight size={14}/></Link></div></section>

    <section className="reserve" id="reserve"><p className="eyebrow">YOUR TABLE AWAITS</p><h2>Come for the coffee.<br/><em>Stay for the night.</em></h2><Link className="pill light" href="/reservations">Reserve your table <ArrowUpRight size={15}/></Link><p className="demo">DEMO EXPERIENCE · hello@noir.cafe · +91 90000 00000</p></section>
    <footer><div className="brand">NOIR<span>°</span></div><p>Luxury coffee · Hyderabad</p><p>© 2026 NOIR CAFÉ</p></footer>
  </main>;
}
