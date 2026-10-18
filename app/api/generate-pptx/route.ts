import { NextResponse } from 'next/server';

// Redirect to day1 for backwards compatibility
export async function GET() {
  return NextResponse.redirect(new URL('/api/generate-pptx/day1', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'));
}
