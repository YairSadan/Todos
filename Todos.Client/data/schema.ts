import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  userName: z.string(),
  email: z.string().email(),
});
export const PrioritySchema = z.object({
  value: z.string(),
  label: z.string(),
  icon: z.any(),
  id: z.string(),
});

export const StatusSchema = z.object({
  value: z.string(),
  label: z.string(),
  icon: z.any(),
  id: z.string(),
});

export const TodoSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  createdOn: z.string(),
  due: z.string(),
  myUser: UserSchema,
  priority: PrioritySchema,
  status: StatusSchema,
});

export type Todo = z.infer<typeof TodoSchema>;
export type User = z.infer<typeof UserSchema>;
export type Priority = z.infer<typeof PrioritySchema>;
export type Status = z.infer<typeof StatusSchema>;

export const AddTodoFormSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().optional(),
  due: z.date(),
  myUserId: z.string().uuid(),
  priorityId: z.string().uuid(),
  statusId: z.string().uuid(),
});

export const RegisterFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type FormValues = z.infer<typeof AddTodoFormSchema>;
export type RegisterFormValues = z.infer<typeof RegisterFormSchema>;
export type LoginFormValues = z.infer<typeof LoginFormSchema>;