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
  const modifiedData: Todo[] = data.map((todo: any) => {
    if (todo.priority.name === 'High') {
      todo.priority.icon = ArrowTopRightIcon;
      todo.priority.value = 2;
      todo.priority.label = todo.priority.name;
    } else if (todo.priority.name === 'Low') {
      todo.priority.icon = ArrowDownIcon;
      todo.priority.value = 4;
      todo.priority.label = todo.priority.name;
    } else if (todo.priority.name === 'Medium') {
      todo.priority.icon = ArrowRightIcon;
      todo.priority.value = 3;
      todo.priority.label = todo.priority.name;
    } else if (todo.priority.name === 'Critical') {
      todo.priority.icon = ArrowUpIcon;
      todo.priority.value = 1;
      todo.priority.label = todo.priority.name;
    }

    if (todo.status.name === 'Pending') {
      todo.status.icon = QuestionMarkCircledIcon;
      todo.status.value = 4;
      todo.status.label = todo.status.name;
    } else if (todo.status.name === 'In Progress') {
      todo.status.icon = StopwatchIcon;
      todo.status.value = 3;
      todo.status.label = todo.status.name;
    } else if (todo.status.name === 'Done') {
      todo.status.icon = CheckCircledIcon;
      todo.status.value = 2;
      todo.status.label = todo.status.name;
    } else if (todo.status.name === 'Canceled') {
      todo.status.icon = CrossCircledIcon;
      todo.status.value = 1;
      todo.status.label = todo.status.name;
    }

    return todo;
  });
  return modifiedData;
};

export const getPriorities = async (): Promise<Priority[]> => {
  const res = await fetch(`http://localhost:5160/api/priorities`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  const modifiedData = data.map((priority: any) => ({
    label: priority.name,
    id: priority.id,
  }));
  modifiedData.forEach((priority: Priority) => {
    if (priority.label === 'High') priority.icon = ArrowTopRightIcon;
    else if (priority.label === 'Low') priority.icon = ArrowDownIcon;
    else if (priority.label === 'Medium') priority.icon = ArrowRightIcon;
    else if (priority.label === 'Critical') priority.icon = ArrowUpIcon;
  });
  return modifiedData;
};

export const getStatuses = async (): Promise<Status[]> => {
  const res = await fetch(`http://localhost:5160/api/status`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  const modifiedData = data.map((status: any) => ({
    label: status.name,
    id: status.id,
  }));
  modifiedData.forEach((status: Status) => {
    if (status.label === 'Pending') status.icon = QuestionMarkCircledIcon;
    else if (status.label === 'In Progress') status.icon = StopwatchIcon;
    else if (status.label === 'Done') status.icon = CheckCircledIcon;
    else if (status.label === 'Canceled') status.icon = CrossCircledIcon;
  });
  return modifiedData;
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
  return data;
};
