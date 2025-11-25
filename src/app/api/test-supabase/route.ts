import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  console.log('API route /api/test-supabase POST started.');
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    console.log('Supabase client created:', supabase);

    const { data, error } = await supabase.from('contact_messages').insert([
      { name: 'Test', email: 'test@example.com', message: 'This is a test.' },
    ])

    if (error) {
      console.error('Supabase insert error:', error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    console.log('Supabase insert successful.');
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Unhandled error in /api/test-supabase POST:', err.message);
    // Ensure that even unhandled errors return a proper JSON response
    return NextResponse.json({ success: false, error: `Unhandled server error: ${err.message}` }, { status: 500 });
  }
}

