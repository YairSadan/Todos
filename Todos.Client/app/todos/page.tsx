'use client';
import { useState, useEffect } from 'react';
import { DataTable } from './data-table';
import { Todo } from '@/types/types';
import { columns } from './columns';
import { UserNav } from './user-nav';
import { getTodos } from '@/lib/actions';
import { TodosContext } from '@/data/data';

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    (async () => {
      const todos = await getTodos();
      setTodos(todos);
    })();
  }, []);

  return (
    <TodosContext.Provider value={todos}>
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
        <DataTable data={todos} columns={columns} />
      </div>
    </TodosContext.Provider>
  );
}
