'use client'
export default function Home() {
  const res = fetch(`${process.env.API_URL}/todos`)
  .then((res) => res.json())
  .then((data) => console.log(data));
  return <>hello world</>;
}
