import { Todo, Status, Priority, User } from '@/types/types';
import { createContext } from 'react';
export const TodosContext = createContext<Todo[]>([]);
export const UsersContext = createContext<User[]>([]);
export const StatusesContext = createContext<Status[]>([]);
export const PrioritiesContext = createContext<Priority[]>([]);
