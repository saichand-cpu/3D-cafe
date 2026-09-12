'use client';

import dynamic from 'next/dynamic';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Instagram, MapPin, Menu as MenuIcon, X } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';

const CafeScene = dynamic(() => import('./CafeScene'), { ssr: false, loading: () => <div className="scene-loader">LOADING 3D</div> });

const menu = [
  ['01', 'Velvet Espresso', 'Dark chocolate · orange peel', '₹240'],
  ['02', 'Cloud Cappuccino', 'Vanilla · sea salt · microfoam', '₹320'],
  ['03', 'Midnight Tiramisu', 'Mascarpone · cacao · espresso', '₹390'],
  ['04', 'Golden Affogato', 'Vanilla gelato · double shot', '₹360'],
];

export default function Experience() {
  const hero = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: hero });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });
  const scale = useTransform(smooth, [0, 1], [1, 1.16]);
  const y = useTransform(smooth, [0, 1], [0, -110]);
  const [open, setOpen] = useState(false);

  return <main>
    <nav className="nav">
      <Link href="/" className="brand">NOIR<span>°</span></Link>
      <div className="nav-links"><Link href="/menu">Menu</Link><Link href="/story">Story</Link><Link href="/gallery">Gallery</Link><Link href="/contact">Visit</Link></div>
      <Link className="nav-cta" href="/reservations">Reserve a table <ArrowUpRight size={13}/></Link>
      <button className="mobile-menu" aria-label="Open menu" onClick={() => setOpen(!open)}>{open ? <X/> : <MenuIcon/>}</button>
      {open && <div className="mobile-nav"><Link href="/menu" onClick={() => setOpen(false)}>Menu</Link><Link href="/story" onClick={() => setOpen(false)}>Story</Link><Link href="/gallery" onClick={() => setOpen(false)}>Gallery</Link><Link href="/contact" onClick={() => setOpen(false)}>Visit</Link><Link href="/reservations" onClick={() => setOpen(false)}>Reserve</Link></div>}
    </nav>

    <section className="hero" ref={hero}>
      <motion.div className="hero-copy" style={{ y }}>
        <p className="eyebrow">HYDERABAD · COFFEE · CULTURE · AFTER DARK</p>
        <h1>COFFEE<br/><em>WITHOUT</em><br/>LIMITS.</h1>
        <p className="hero-sub">A cinematic coffee house for people who stay curious after the last cup.</p>
        <div className="hero-actions"><Link className="pill" href="/menu">Explore the experience <ArrowUpRight size={14}/></Link><Link className="ghost-link" href="#ritual">Scroll to enter <ArrowDown size={14}/></Link></div>
      </motion.div>
      <motion.div className="hero-art" style={{ scale }}><CafeScene /></motion.div>
      <div className="hero-meta"><span>17° 26′ N</span><span>78° 26′ E</span><span>OPEN UNTIL 01:00</span></div>
    </section>

    <section className="statement" id="ritual"><p className="eyebrow">THE NEW COFFEE RITUAL</p><h2>Not a café.<br/><span>A mood.</span></h2><p className="statement-copy">Slow pours. Loud ideas. Low light. NOIR turns the everyday coffee run into a small cinematic escape. Built for conversations that outstay the clock.</p></section>

    <section className="menu-section" id="menu"><div className="section-head"><div><p className="eyebrow">SIGNATURES / 01—04</p><h2>Made to be<br/><em>remembered.</em></h2></div><p className="section-note">Our menu changes with the hour, the weather and whatever feels right behind the bar.<br/><Link href="/menu" className="text-link">View full menu →</Link></p></div><div className="menu-grid">{menu.map(([num,name,desc,price]) => <motion.article whileHover={{ y: -14, rotateX: 3, rotateY: -3 }} transition={{ type:'spring', stiffness:220, damping:18 }} className="menu-card" key={num}><span>{num}</span><div className="cup-icon">◉</div><h3>{name}</h3><p>{desc}</p><strong>{price}</strong></motion.article>)}</div></section>

    <section className="story" id="story"><div className="story-orb"><div className="orb-ring"/><div className="orb-ring ring-two"/><div className="orb-core">NOIR<br/><small>EST. 2026</small></div></div><div><p className="eyebrow">OUR PHILOSOPHY</p><h2>Beautiful things<br/>take <em>time.</em></h2><p>We source obsessively, roast intentionally and serve without ceremony. Every detail is designed to make you slow down for a moment longer.</p><Link className="text-link" href="/story">Discover our story →</Link></div></section>

    <section className="gallery" id="gallery"><div className="gallery-word">NOIR</div><Link href="/gallery" className="gallery-card tall"><span>01 / NIGHT SHIFT</span></Link><Link href="/gallery" className="gallery-card wide"><span>02 / SLOW MORNING</span></Link><Link href="/gallery" className="gallery-card square"><span>03 / THE BAR</span></Link><Link href="/gallery" className="gallery-card fourth"><span>04 / AFTER DARK</span></Link></section>

    <section className="reserve" id="reserve"><p className="eyebrow">YOUR TABLE AWAITS</p><h2>Come for the coffee.<br/><em>Stay for the night.</em></h2><Link className="pill light" href="/reservations">Reserve your table <ArrowUpRight size={15}/></Link><p className="demo">Demo contact: hello@noir.cafe · +91 90000 00000</p></section>
    <footer><div className="brand">NOIR<span>°</span></div><p><MapPin size={12}/> Banjara Hills · Hyderabad</p><p><Instagram size={12}/> @noircafe</p><p>© 2026 NOIR CAFÉ</p></footer>
  </main>;
}