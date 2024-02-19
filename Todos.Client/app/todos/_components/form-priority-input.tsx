import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { AddTodoFormSchema, Priority } from "@/data/schema";
import { getPriorities } from "@/lib/actions";
import { modifyPriority } from "@/lib/modifications";
import { Icons } from "@/components/icons";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export default function FormPriorityInput({
  form,
}: {
  form: UseFormReturn<z.infer<typeof AddTodoFormSchema>>;
}) {
  const [priorities, setPriorities] = useState<Priority[]>([]);
  useEffect(() => {
    getPriorities().then((priorities) => {
      setPriorities(
        priorities.map((priority: any) => modifyPriority(priority))
      );
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
              {priorities.map((priority) => {
                const PriorityIcon = Icons[priority.icon as keyof typeof Icons];
                return (
                  <SelectItem key={priority.id} value={priority.id}>
                    <div className="flex items-center space-x-2">
                      {PriorityIcon && <PriorityIcon />}
                      <span>{priority.label}</span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
