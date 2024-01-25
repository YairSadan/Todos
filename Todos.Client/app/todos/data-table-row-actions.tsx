'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TodoSchema } from '@/data/schema';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

interface DataTableRowActions<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData>({ row }: DataTableRowActions<TData>) {
  const todo = TodoSchema.parse(row.original);
  const { toast } = useToast();
  const router = useRouter();
  const deleteTodo = async () => {
    await fetch('/api/todos/', {
      body: JSON.stringify({ id: todo.id }),
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    router.refresh();
    toast({
      title: 'Todo deleted',
      description: `"${todo.title}" was deleted.`,
      variant: "destructive"
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Make a copy</DropdownMenuItem>
        <DropdownMenuItem>Favorite</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={deleteTodo}>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
