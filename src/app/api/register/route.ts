import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  }

  const { error: signUpError } = await supabase.auth.signUp({ email, password });

  if (signUpError) {
    console.error('Registration error:', signUpError);
    return NextResponse.json({ error: signUpError.message }, { status: 400 });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}