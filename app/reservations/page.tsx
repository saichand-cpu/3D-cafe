'use client';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export default function Reservations(){
 const [loading,setLoading]=useState(false); const [done,setDone]=useState(false); const [error,setError]=useState('');
 async function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault();setLoading(true);setError('');
  const form=new FormData(e.currentTarget);
  const payload={name:String(form.get('name')||'').trim(),email:String(form.get('email')||'').trim(),phone:String(form.get('phone')||'').trim(),date:String(form.get('date')||''),time:String(form.get('time')||''),guests:Number(form.get('guests')||2),notes:String(form.get('notes')||'').trim(),status:'pending'};
  try{
   if(!supabase) throw new Error('Reservation backend is not configured yet. Add the Supabase public environment variables to the GitHub Pages workflow.');
   const {error:dbError}=await supabase.from('reservations').insert(payload);
   if(dbError) throw dbError;
   setDone(true);
  }catch(err){setError(err instanceof Error?err.message:'Something went wrong.')}finally{setLoading(false)}
 }
 return <main className="reservation-page"><header className="inner-nav"><Link href="/" className="brand">NOIR<span>°</span></Link><Link href="/menu" className="back"><ArrowLeft size={14}/> Menu</Link></header><div className="reservation-wrap"><div><p className="eyebrow">RESERVE A TABLE</p><h1>Make tonight<br/><em>different.</em></h1><p>Tell us when you are coming. Our team will confirm your table.</p><div className="reserve-details"><span>MON—SUN / 09:00—01:00</span><span>BANJARA HILLS / HYDERABAD</span><span>+91 90000 00000</span></div></div>{done?<div className="success-card"><CheckCircle2 size={42}/><h2>Request received.</h2><p>Your reservation has been securely sent to the NOIR reservation database. The team will confirm it shortly.</p><Link className="pill" href="/">Return home</Link></div>:<form onSubmit={submit}><label>Name<input name="name" required placeholder="Your name" /></label><label>Email<input name="email" required type="email" placeholder="you@example.com" /></label><label>Phone<input name="phone" required placeholder="+91 9XXXXXXXXX" /></label><div className="form-grid"><label>Date<input name="date" required type="date" /></label><label>Time<input name="time" required type="time" /></label></div><label>Guests<select name="guests" defaultValue="2"><option value="2">2 guests</option><option value="3">3 guests</option><option value="4">4 guests</option><option value="5">5 guests</option><option value="6">6 guests</option><option value="8">8 guests</option><option value="10">10 guests</option></select></label><label>Notes<textarea name="notes" placeholder="Birthday, date night, accessibility, etc." rows={4}/></label>{error&&<p className="form-error">{error}</p>}<button type="submit" disabled={loading}>{loading?<><Loader2 className="spin" size={16}/> Sending…</>:<>Request reservation ↗</>}</button></form>}</div></main>;
}
