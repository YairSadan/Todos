import { DataTable } from './data-table';
import { columns } from './columns';
import { UserNav } from './user-nav';
import { getTodos } from '@/lib/actions';
import { z } from 'zod';
import { TodoSchema } from '@/data/schema';
import { modifyTodo } from '@/lib/modifications';
async function getTasks() {
  const res = await getTodos();
  const todos = res.map((todo: any) => modifyTodo(todo));
  return z.array(TodoSchema).parse(todos);
}
export default async function TodosPage() {
  const todos = await getTasks();
  return (
    <div className="h-full flex-1 flex-col space-y-8 p-12 md:flex">
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
  );
}
