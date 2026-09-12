'use client';

import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const CafeScene = dynamic(() => import('./CafeScene'), { ssr: false });

const menu = [
  ['01', 'Velvet Espresso', 'Dark chocolate · orange peel', '₹240'],
  ['02', 'Cloud Cappuccino', 'Vanilla · sea salt · microfoam', '₹320'],
  ['03', 'Midnight Tiramisu', 'Mascarpone · cacao · espresso', '₹390'],
  ['04', 'Golden Affogato', 'Vanilla gelato · double shot', '₹360'],
];

export default function Experience() {
  const hero = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: hero });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.13]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return <main>
    <nav className="nav"><div className="brand">NOIR<span>°</span></div><div className="nav-links"><a href="#menu">Menu</a><a href="#story">Story</a><a href="#visit">Visit</a></div><a className="nav-cta" href="#reserve">Reserve a table</a></nav>
    <section className="hero" ref={hero}>
      <motion.div className="hero-copy" style={{ y }}>
        <p className="eyebrow">COFFEE / CULTURE / AFTER DARK</p>
        <h1>COFFEE<br/><em>WITHOUT</em><br/>LIMITS.</h1>
        <p className="hero-sub">A cinematic coffee house for people who stay curious after the last cup.</p>
        <a className="pill" href="#menu">Explore the experience <span>↗</span></a>
      </motion.div>
      <motion.div className="hero-art" style={{ scale }}><CafeScene /></motion.div>
      <div className="scroll-cue">SCROLL TO ENTER <span>↓</span></div>
    </section>

    <section className="statement"><p className="eyebrow">THE NEW COFFEE RITUAL</p><h2>Not a café.<br/><span>A mood.</span></h2><p className="statement-copy">Slow pours. Loud ideas. Low light. NOIR turns the everyday coffee run into a small cinematic escape.</p></section>

    <section className="menu-section" id="menu"><div className="section-head"><div><p className="eyebrow">SIGNATURES</p><h2>Made to be<br/><em>remembered.</em></h2></div><p className="section-note">Our menu changes with the hour, the weather and whatever feels right behind the bar.</p></div><div className="menu-grid">{menu.map(([num,name,desc,price]) => <motion.article whileHover={{ y: -12, rotateX: 3, rotateY: -3 }} transition={{ type:'spring', stiffness:220, damping:18 }} className="menu-card" key={num}><span>{num}</span><div className="cup-icon">◉</div><h3>{name}</h3><p>{desc}</p><strong>{price}</strong></motion.article>)}</div></section>

    <section className="story" id="story"><div className="story-orb"><div className="orb-ring"/><div className="orb-core">NOIR<br/><small>EST. 2026</small></div></div><div><p className="eyebrow">OUR PHILOSOPHY</p><h2>Beautiful things<br/>take <em>time.</em></h2><p>We source obsessively, roast intentionally and serve without ceremony. Every detail is designed to make you slow down for a moment longer.</p><a className="text-link" href="#visit">Discover our story →</a></div></section>

    <section className="gallery" id="visit"><div className="gallery-word">NOIR</div><div className="gallery-card tall">01 / NIGHT SHIFT</div><div className="gallery-card wide">02 / SLOW MORNING</div><div className="gallery-card square">03 / THE BAR</div></section>

    <section className="reserve" id="reserve"><p className="eyebrow">YOUR TABLE AWAITS</p><h2>Come for the coffee.<br/><em>Stay for the night.</em></h2><a className="pill light" href="mailto:hello@noir.cafe">Reserve your table <span>↗</span></a><p className="demo">Demo contact: hello@noir.cafe · +91 90000 00000</p></section>
    <footer><div className="brand">NOIR<span>°</span></div><p>COFFEE / CULTURE / AFTER DARK</p><p>© 2026 NOIR CAFÉ</p></footer>
  </main>;
}