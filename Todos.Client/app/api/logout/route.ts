import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/login', request.url));
  cookies().delete('accessToken');
  cookies().delete('refreshToken');
  return response;
}
