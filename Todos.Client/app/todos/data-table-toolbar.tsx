'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { DataTableViewOptions } from './data-table-view-options';
import AddTodoDialog from './add-todo-dialog';
import { useEffect, useState } from 'react';
import { modifyStatus, modifyPriority, modifyUser, modifyTodo } from '@/lib/modifications';
import { Status, Priority, User, Todo } from '@/data/schema';
import { DataTableDueFilter } from './data-table-due-filter';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [thisWeekTodos, setThisWeekTodos] = useState<Todo[]>([]);
  useEffect(() => {
    (async () => {
      const res = await fetch('/api/statuses');
      const { data } = await res.json();
      const result: Status[] = data.map((status: any) => modifyStatus(status));
      setStatuses(result);
    })();
    (async () => {
      const res = await fetch('/api/priorities');
      const { data } = await res.json();
      const result: Priority[] = data.map((priority: any) => modifyPriority(priority));
      setPriorities(result);
    })();
    (async () => {
      const res = await fetch('/api/users');
      const { data } = await res.json();
      const result: User[] = data.map((user: any) => modifyUser(user));
      setUsers(result);
    })();
    (async () => {
      const res = await fetch('/api/todos?filterOn=ThisWeek');
      const { data } = await res.json();
      const result: Todo[] = data.map((todo: any) => modifyTodo(todo));
      setThisWeekTodos(result);
    })();
  }, []);
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn('status') && (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn('priority') && (
          <DataTableFacetedFilter
            column={table.getColumn('priority')}
            title="Priority"
            options={priorities}
          />
        )}
        {table.getColumn('user') && (
          <DataTableFacetedFilter
            column={table.getColumn('user')}
            title="User"
            options={users.map((user) => ({
              value: user.userName,
              label: user.userName,
            }))}
          />
        )}
        {table.getColumn('due') && (
          <DataTableDueFilter
            column={table.getColumn('due')}
            title="Due this week"
            options={thisWeekTodos.map((todo) => ({
              value: todo.due,
              label: 'this week'
            }))}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3">
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <AddTodoDialog />
      <DataTableViewOptions table={table} />
    </div>
  );
}
