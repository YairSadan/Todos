import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.nextUrl);
  const res = await fetch(
    `${process.env.DOMAIN}/api/todos?filterOn=${searchParams.get('filterOn')}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
    }
  );
  const data = await res.json();
  return Response.json({ data });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await fetch(`${process.env.DOMAIN}/api/todos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
    },
  });
}
