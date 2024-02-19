import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DialogFooter } from "@/components/ui/dialog";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormUserInput from "./form-user-input";
import FormStatusInput from "./form-status-input";
import FormPriorityInput from "./form-priority-input";
import { addTodo } from "@/lib/actions";
import { useToast } from "@/components/ui/use-toast";
import { AddTodoFormSchema } from "@/data/schema";

export default function AddTodoForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof AddTodoFormSchema>>({
    resolver: zodResolver(AddTodoFormSchema),
    defaultValues: {
      title: "",
      description: "",
      due: new Date(),
      myUserId: "",
      priorityId: "",
      statusId: "",
    },
  });

  function onSubmit(values: z.infer<typeof AddTodoFormSchema>) {
    addTodo(values);
    toast({
      title: "Todo Added",
      description: `${values.title} has been added.`,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Choose title for your task" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the task "
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="due"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Due</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date > new Date("2100-01-01")
                    }
                  />
                </PopoverContent>
              </Popover>
              <FormControl></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormUserInput form={form} />
        <FormStatusInput form={form} />
        <FormPriorityInput form={form} />
        <DialogFooter>
          <Button type="submit">Add Todo</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
