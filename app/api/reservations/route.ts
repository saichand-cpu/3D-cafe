import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? '').trim();
    const guestEmail = String(body.email ?? '').trim();
    const phone = String(body.phone ?? '').trim();
    const date = String(body.date ?? '').trim();
    const time = String(body.time ?? '').trim();
    const guests = Number(body.guests ?? 2);
    const notes = String(body.notes ?? '').trim();
    if (!name || !email.test(guestEmail) || !phone || !date || !time || !Number.isInteger(guests) || guests < 1 || guests > 20) return NextResponse.json({error:'Please complete all required fields.'},{status:400});
    const url=process.env.NEXT_PUBLIC_SUPABASE_URL; const key=process.env.SUPABASE_SERVICE_ROLE_KEY;
    if(url && key){
      const supabase=createClient(url,key,{auth:{persistSession:false}});
      const {error}=await supabase.from('reservations').insert({name,email:guestEmail,phone,date,time,guests,notes,status:'pending'});
      if(error) throw error;
    }
    return NextResponse.json({ok:true,mode:url&&key?'database':'demo'});
  } catch { return NextResponse.json({error:'Unable to create reservation. Please try again.'},{status:500}); }
}
