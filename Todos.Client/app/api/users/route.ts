import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const res = await fetch('https://app-todos-001.azurewebsites.net/api/MyUsers', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
    },
  });
  const data = await res.json();
  return Response.json({ data });
}