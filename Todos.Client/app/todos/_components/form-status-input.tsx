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
import { getStatuses } from "@/lib/actions";
import { AddTodoFormSchema, Status } from "@/data/schema";
import { modifyStatus } from "@/lib/modifications";
import { Icons } from "@/components/icons";
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";

export default function FormStatusInput({
  form,
}: {
  form: UseFormReturn<z.infer<typeof AddTodoFormSchema>>;
}) {
  const [statuses, setStatuses] = useState<Status[]>([]);
  useEffect(() => {
    getStatuses().then((statuses) => {
      setStatuses(statuses.map((status: any) => modifyStatus(status)));
    });
  }, []);
  return (
    <FormField
      control={form.control}
      name="statusId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>status</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {statuses.map((status) => {
                const StatusIcon = Icons[status.icon as keyof typeof Icons];
                return (
                  <SelectItem key={status.label} value={status.id}>
                    <div className="flex items-center space-x-2">
                      {StatusIcon && <StatusIcon />}
                      <span>{status.label}</span>
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
