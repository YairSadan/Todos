'use client';
import { format } from 'date-fns';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { Priority, Status, Todo } from '@/data/schema';
import { iconMappings } from '@/components/icons';
export const columns: ColumnDef<Todo>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all rows"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Priority" />,
    cell: ({ row }) => {
      const priority = row.original.priority;
      if (!priority) return null;
      return (
        <div className="flex items-center">
          {iconMappings[priority.icon as keyof typeof iconMappings]}
          <span>{priority.value}</span>
        </div>
      );
    },
    filterFn: (row, _id, value) => {
      const priority = row.getValue('priority') as Priority;
      return value.includes(priority.value);
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue('status') as Status;
      if (!status) return null;
      return (
        <div className="flex w-[100px] items-center">
          {iconMappings[status.icon as keyof typeof iconMappings]}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, _id, value) => {
      const status = row.getValue('status') as Status;
      return value.includes(status.value);
    },
  },
  {
    accessorKey: 'createdOn',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created On" />,
    cell: ({ row }) => {
      const createdOn = row.original.createdOn;
      const createdDate = createdOn ? format(createdOn, 'MM/dd/yyyy') : null;
      return <div className="flex items-center">{createdDate}</div>;
    },
    filterFn: (row, _id, value) => {
      //needs a test
      const createdOn = new Date(row.original.createdOn);
      const filterDate = value ? new Date(value) : null;
      if (!createdOn || !filterDate) return false;
      return createdOn.toDateString() === filterDate.toDateString();
    },
  },
  {
    accessorKey: 'due',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Due" />,
    cell: ({ row }) => {
      const due = row.original.due;
      const dueDate = due ? format(due, 'MM/dd/yyyy') : null;
      return <div className="flex items-center">{dueDate}</div>;
    },
    filterFn: (row, _id, value) => {
      const due = row.getValue('due');
      return value.includes(due);
    },
  },
  {
    accessorKey: 'user',
    header: ({ column }) => <DataTableColumnHeader column={column} title="User" />,
    cell: ({ row }) => {
      const username = row.original.myUser.userName;
      if (!username) return null;
      return <div className="flex items-center">{username}</div>;
    },
    filterFn: (row, _id, value) => {
      const username = row.original.myUser.userName;
      return username.toLowerCase().includes(value);
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
