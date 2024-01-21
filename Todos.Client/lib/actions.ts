import { Priority, Status, Todo, User } from '@/types/types';
import {
  ArrowTopRightIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
  CheckCircledIcon,
  CrossCircledIcon,
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
} from '@radix-ui/react-icons';

export const getTodos = async (): Promise<Todo[]> => {
  const res = await fetch(`http://localhost:5160/api/todos`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
    },
  });
  const data = await res.json();
  return data.map((todo: any) => modifyTodo(todo));
};

export const getPriorities = async (): Promise<Priority[]> => {
  const res = await fetch(`http://localhost:5160/api/priorities`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return data.map((priority: any) => modifyPriority(priority));
};

export const getStatuses = async (): Promise<Status[]> => {
  const res = await fetch(`http://localhost:5160/api/status`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return data.map((status: any) => modifyStatus(status));
};

export const getUsers = async (): Promise<User[]> => {
  const res = await fetch(`http://localhost:5160/api/MyUsers`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + sessionStorage.getItem('accessToken'),
    },
  });
  const data = await res.json();
  return data.map((user: any) => modifyUser(user));
};

export const deleteTodo = (id: string) => async () => {
  await fetch(`http://localhost:5160/api/todos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + sessionStorage.getItem('accessToken'),
    },
  });
};


const modifyStatus = (status: any): Status => {
  const modifiedStatus: Status = {
    label: status.name,
    id: status.id,
    value: status.name,
    icon: '',
  };
  switch (modifiedStatus.label) {
    case 'Pending':
      modifiedStatus.icon = QuestionMarkCircledIcon;
      break;
    case 'In Progress':
      modifiedStatus.icon = StopwatchIcon;
      break;
    case 'Done':
      modifiedStatus.icon = CheckCircledIcon;
      break;
    case 'Canceled':
      modifiedStatus.icon = CrossCircledIcon;
      break;
  }
  return modifiedStatus;
};

const modifyPriority = (priority: any): Priority => {
  const modifiedPriority: Priority = {
    label: priority.name,
    id: priority.id,
    value: priority.name,
    icon: '',
  };
  switch (modifiedPriority.label) {
    case 'High':
      modifiedPriority.icon = ArrowTopRightIcon;
      break;
    case 'Medium':
      modifiedPriority.icon = ArrowRightIcon;
      break;
    case 'Low':
      modifiedPriority.icon = ArrowDownIcon;
      break;
    case 'Critical':
      modifiedPriority.icon = ArrowUpIcon;
      break;
  }
  return modifiedPriority;
};

const modifyUser = (user: any): User => {
  const modifiedUser: User = {
    id: user.id,
    userName: user.userName,
    email: user.email,
  };
  return modifiedUser;
};

const modifyTodo = (todo: any): Todo => {
  const modifiedTodo: Todo = {
    id: todo.id,
    title: todo.title,
    description: todo.description,
    createdOn: new Date(todo.createdOn),
    due: new Date(todo.due),
    myUser: modifyUser(todo.myUser),
    priority: modifyPriority(todo.priority),
    status: modifyStatus(todo.status),
  };
  return modifiedTodo;
};
