export async function GET(request: Request) {
  const res = await fetch('https://app-todos-001.azurewebsites.net/api/status', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return Response.json({ data });
}
