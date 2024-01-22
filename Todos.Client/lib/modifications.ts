import { Status, Priority, Todo, User } from '@/data/schema';
export const modifyStatus = (status: any): Status => {
  const modifiedStatus: Status = {
    label: status.name,
    id: status.id,
    value: status.name,
    icon: '',
  };
  switch (modifiedStatus.label) {
    case 'Pending':
      modifiedStatus.icon = 'QuestionMarkCircledIcon';
      break;
    case 'In Progress':
      modifiedStatus.icon = 'StopwatchIcon';
      break;
    case 'Done':
      modifiedStatus.icon = 'CheckCircledIcon';
      break;
    case 'Canceled':
      modifiedStatus.icon = 'CrossCircledIcon';
      break;
  }
  return JSON.parse(JSON.stringify(modifiedStatus));
};

export const modifyPriority = (priority: any): Priority => {
  const modifiedPriority: Priority = {
    label: priority.name,
    id: priority.id,
    value: priority.name,
    icon: '',
  };
  switch (modifiedPriority.label) {
    case 'High':
      modifiedPriority.icon = 'ArrowTopRightIcon';
      break;
    case 'Medium':
      modifiedPriority.icon = 'ArrowRightIcon';
      break;
    case 'Low':
      modifiedPriority.icon = 'ArrowDownIcon';
      break;
    case 'Critical':
      modifiedPriority.icon = 'ArrowUpIcon';
      break;
  }
  return JSON.parse(JSON.stringify(modifiedPriority));
};

export const modifyUser = (user: any): User => {
  const modifiedUser: User = {
    id: user.id,
    userName: user.userName,
    email: user.email,
  };
  return JSON.parse(JSON.stringify(modifiedUser));
};

export const modifyTodo = (todo: any): Todo => {
  const modifiedTodo: Todo = {
    id: todo.id,
    title: todo.title,
    description: todo.description,
    createdOn: todo.createdOn,
    due: todo.due,
    myUser: modifyUser(todo.myUser),
    priority: modifyPriority(todo.priority),
    status: modifyStatus(todo.status),
  };
  return JSON.parse(JSON.stringify(modifiedTodo));
};
