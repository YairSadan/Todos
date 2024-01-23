import * as React from 'react';
import { Column } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';

interface DataTableDueFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: {
    value: string;
  }[];
}

export function DataTableDueFilter<TData, TValue>({
  column,
  title,
  options,
}: DataTableDueFilterProps<TData, TValue>) {
  const selectedValues = new Set(column?.getFilterValue() as string[]);
  return (
    <Button
      onClick={() => {
        options.forEach((option) => {
          selectedValues.has(option.value)
            ? selectedValues.delete(option.value)
            : selectedValues.add(option.value);
        });
        const filterValues = Array.from(selectedValues);
        column?.setFilterValue(filterValues.length ? filterValues : undefined);
      }}
      variant="outline"
      size="sm"
      className="h-8 border-dashed">
      {title}
    </Button>
  );
}
