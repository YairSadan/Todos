import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React, { useEffect, useState } from 'react';
import { Priority } from '@/types/types';
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowTopRightIcon,
  ArrowUpIcon,
} from '@radix-ui/react-icons';

const getPriorities = async (): Promise<Priority[]> => {
  const res = await fetch(`http://localhost:5160/api/priorities`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + sessionStorage.getItem('accessToken'),
    },
  });
  const data = await res.json();
  const modifiedData = data.map((priority: any) => ({
    label: priority.name,
    id: priority.id,
  }));
  modifiedData.forEach((priority: Priority) => {
    if (priority.label === 'High') priority.icon = <ArrowTopRightIcon />;
    else if (priority.label === 'Low') priority.icon = <ArrowDownIcon />;
    else if (priority.label === 'Medium') priority.icon = <ArrowRightIcon />;
    else if (priority.label === 'Critical') priority.icon = <ArrowUpIcon />;
  });
  return modifiedData;
};

export default function FormPriorityInput({ form }: { form: any }) {
  //todo find the type of zod form
  const [statuses, setStatuses] = useState<Priority[]>([]);
  useEffect(() => {
    getPriorities().then((data) => {
      setStatuses(data);
    });
  }, []);
  return (
    <FormField
      control={form.control}
      name="priorityId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>priority</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a priority" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {statuses.map((priority) => (
                <SelectItem key={priority.id} value={priority.id}>
                  <div className="flex items-center space-x-2">
                    {priority.icon}
                    <span>{priority.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
