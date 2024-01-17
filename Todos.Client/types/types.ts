import { ReactNode } from 'react';

export type Todo = {
  id: string;
  title: string;
  description: string | null;
  createdOn: Date;
  due: Date;
  user: User;
  priority: Priority;
  status: Status;
};
export type User = {
  id: string;
  name: String;
};
export type Priority = {
  value: string;
  label: string;
  icon: any;
};
export type Status = {
  value: string;
  label: string;
  icon: any;
};
