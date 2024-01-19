
export type Todo = {
  id: string;
  title: string;
  description: string | null;
  createdOn: Date;
  due: Date;
  myUser: User;
  priority: Priority;
  status: Status;
};
export type User = {
  id: string;
  userName: string;
  email: string;
};
export type Priority = {
  value: string;
  label: string;
  icon: any;
  id: string;
};
export type Status = {
  value: string;
  label: string;
  icon: any;
  id: string;
};
