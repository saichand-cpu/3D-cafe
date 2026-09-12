'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { categories, menu } from '@/lib/menu';
export default function MenuPage(){
 const [category,setCategory]=useState('All'); const items=category==='All'?menu:menu.filter(x=>x.category===category);
 return <main className="inner-page"><header className="inner-nav"><Link href="/" className="brand">NOIR<span>°</span></Link><Link href="/" className="back"><ArrowLeft size={14}/> Home</Link><Link className="nav-cta" href="/reservations">Reserve <ArrowUpRight size={13}/></Link></header><section className="inner-hero"><p className="eyebrow">THE NOIR MENU / 2026</p><h1>Eat.<br/><em>Drink.</em><br/>Stay.</h1><p>Small plates, serious coffee and things worth coming back for.</p></section><section className="menu-list"><div className="filters">{categories.map(c=><button key={c} className={category===c?'active':''} onClick={()=>setCategory(c)}>{c}</button>)}</div><div className="full-menu">{items.map((item,i)=><article className="menu-row" key={item.id}><span className="menu-index">{String(i+1).padStart(2,'0')}</span><div><span className="menu-category">{item.category}</span><h2>{item.name}</h2><p>{item.description}</p>{item.note&&<small>{item.note}</small>}</div><strong>₹{item.price}</strong></article>)}</div></section><section className="inner-cta"><p className="eyebrow">TABLES / PRIVATE DINING</p><h2>Make a night<br/><em>of it.</em></h2><Link className="pill" href="/reservations">Book NOIR <ArrowUpRight size={14}/></Link></section></main>;
}