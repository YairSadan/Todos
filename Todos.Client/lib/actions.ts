'use server';
import { cookies } from 'next/headers';

export const getTodos = async (): Promise<any> => {
  const res = await fetch(`http://localhost:5160/api/todos`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
    },
  });
  return await res.json();
};

export const getPriorities = async (): Promise<any> => {
  const res = await fetch(`http://localhost:5160/api/priorities`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
};

export const getStatuses = async (): Promise<any> => {
  const res = await fetch(`http://localhost:5160/api/status`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
};

export const getUsers = async (): Promise<any> => {
  const res = await fetch(`http://localhost:5160/api/MyUsers`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies().get('accessToken')}`,
    },
  });
  return await res.json();
};

export const deleteTodo = (id: string) => async () => {
  await fetch(`http://localhost:5160/api/todos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies().get('accessToken')}`,
    },
  });
};
export const logout = () => () => {
  cookies().delete('accessToken');
  cookies().delete('refreshToken');
};
export const login = async (email: string, password: string) => {
  const res = await fetch(`http://localhost:5160/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await res.json();
  if (res.status === 200) {
    cookies().set('accessToken', data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
    cookies().set('refreshToken', data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
    return true;
  }
  return false;
};
