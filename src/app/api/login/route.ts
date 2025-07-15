import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  // Встановлюємо сесію в cookies (автоматично обробляється Supabase)
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) {
    return NextResponse.json({ error: sessionError.message }, { status: 500 });
  }

  return NextResponse.json({ user: data.user, success: true }, { status: 200 });
}