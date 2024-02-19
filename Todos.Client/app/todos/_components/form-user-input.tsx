import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { User } from "@/data/schema";
import { getUsers } from "@/lib/actions";

export default function FormUserInput({ form }: { form: any }) {
  //todo find the type of zod form
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
    });
  }, []);
  return (
    <FormField
      control={form.control}
      name="myUserId"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>User</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-[200px] justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? users.find((user) => user.id === field.value)?.userName
                    : "Select user"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search user..." />
                <CommandEmpty>No User found.</CommandEmpty>
                <CommandGroup>
                  {users.map((User) => (
                    <CommandItem
                      value={User.userName}
                      key={User.id}
                      onSelect={() => {
                        form.setValue("myUserId", User.id);
                      }}
                    >
                      <CheckIcon
                        className={cn(
                          "mr-2 h-4 w-4",
                          User.id === field.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {User.userName}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormDescription>
            This is the User that will be assign to the task.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
