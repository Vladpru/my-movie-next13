import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  const { user_id, movie_id } = await request.json();

  if (!user_id || !movie_id) {
    return NextResponse.json({ error: 'user_id and movie_id are required' }, { status: 400 });
  }

  const { error } = await supabase.from('favorites').insert({
    user_id,
    movie_id,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}