export async function GET(request: Request) {
  const res = await fetch('http://localhost:5160/api/priorities', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return Response.json({ data });
}
