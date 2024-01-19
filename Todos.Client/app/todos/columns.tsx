import { format } from 'date-fns';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';
import { Priority, Status, Todo } from '@/types/types';
import { DataTableRowActions } from './data-table-row-actions';

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
          {priority.icon && <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
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
          {status.icon && <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
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
    filterFn: (row, id, value) => {
      //needs a test
      const createdOn = row.original.createdOn;
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
  },
  {
    accessorKey: 'user',
    header: ({ column }) => <DataTableColumnHeader column={column} title="User" />,
    cell: ({ row }) => {
      const username = row.original.myUser.userName;
      if (!username) return null;
      return <div className="flex items-center">{username}</div>;
    },
    filterFn: (row, id, value) => {
      const username = row.original.myUser.userName;
      return username.toLowerCase().includes(value);
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
