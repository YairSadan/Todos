export async function GET(request: Request) {
  const res = await fetch(`${process.env.DOMAIN}/api/priorities`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return Response.json({ data });
}
