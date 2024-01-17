'use client';
import { useState, useEffect, Suspense } from 'react';
import { DataTable } from './data-table';
import { Todo } from '@/types/types';
import { columns } from './columns';
import { UserNav } from './user-nav';

async function getData(): Promise<any> {
  const response = await fetch(`http://localhost:5160/api/todos`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJyZWFkZXJAZXhhbXBsZS5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJSZWFkZXIiLCJleHAiOjE3MDU1MDUzMzAsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcxMTQvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzExNC8ifQ.ko36i6XXCFzVA7qUdzC7R2naCZJJ5GEfrB2N4oX6aog`,
    },
  });
  return await response.json();
}

export default function DemoPage() {
  const [data, setData] = useState<Todo[]>([]);

  useEffect(() => {
    getData().then((fetchedData) => {
      fetchedData.map((todo: any) => {
        todo.status = todo.status.name;
        todo.priority = todo.priority.name;
        return todo;
      });
      setData(fetchedData);
    });
  }, []);

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">Here&apos;s a list of your team tasks!</p>
        </div>
        <div className="flex items-center space-x-2">
          <UserNav />
        </div>
      </div>
      <DataTable data={data} columns={columns} />
    </div>
  );
}
