import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const res = await fetch('http://localhost:5160/api/todos', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
    },
  });
  const data = await res.json();
  return Response.json({ data });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const res = await fetch(`http://localhost:5160/api/todos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
    },
  });
  revalidatePath('/todos');
  const data = await res.json();
  return Response.json({ data });
}
