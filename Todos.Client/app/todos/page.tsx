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
      Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
    },
  });
  return await response.json();
}

export default function TodosPage() {
  const [data, setData] = useState<Todo[]>([]);

  useEffect(() => {
    getData().then((fetchedData) => {
      fetchedData.map((todo: any) => {
        todo.status = todo.status.name;
        todo.priority = todo.priority.name;
        return todo;
      });
      setData(fetchedData);
      console.log(fetchedData)
    });
  }, []);

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
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
