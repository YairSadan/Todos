import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import AddTodoForm from './add-todo-form';

export default function AddTodoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto h-8 flex text-xs md:text-sm min-w-28">
          <PlusIcon className="mr-1 h-4 w-4" />
          Add Todo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Todo Details</DialogTitle>
          <DialogDescription>
            Fill out the form below to add a new todo to your list.
          </DialogDescription>
        </DialogHeader>
        <AddTodoForm />
      </DialogContent>
    </Dialog>
  );
}
