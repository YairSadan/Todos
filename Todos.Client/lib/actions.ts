"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
export const getInfo = async (): Promise<any> => {
  const res = await fetch(`${process.env.DOMAIN}/manage/info`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
    },
  });
  if (res.status === 401) throw new Error("Unauthorized");
  return await res.json();
};
export const getTodos = async (filterOn: string = ""): Promise<any> => {
  const res = await fetch(
    `${process.env.DOMAIN}/api/todos?filterOn=${filterOn}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
      },
    }
  );
  if (res.status === 401) throw new Error("Unauthorized");
  return await res.json();
};
export const addTodo = async (todo: any): Promise<any> => {
  // add a tododto type
  const res = await fetch(`${process.env.DOMAIN}/api/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
    },
    body: JSON.stringify(todo),
  });
  revalidatePath("/todos");
  return await res.json();
};

export const getPriorities = async (): Promise<any> => {
  const res = await fetch(`${process.env.DOMAIN}/api/priorities`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};

export const getStatuses = async (): Promise<any> => {
  const res = await fetch(`${process.env.DOMAIN}/api/status`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};

export const getUsers = async (): Promise<any> => {
  const res = await fetch(`${process.env.DOMAIN}/api/MyUsers`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
    },
  });
  return await res.json();
};

export const deleteTodo = (id: string) => async () => {
  const res = await fetch(`${process.env.DOMAIN}/api/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies().get("accessToken")}`,
    },
  });
  revalidatePath("/todos");
  return await res.json();
};
export const logout = () => async () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};
export const login = async (email: string, password: string) => {
  try {
    const res = await fetch(`${process.env.DOMAIN}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    if (res.status === 200) {
      cookies().set("accessToken", data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
      cookies().set("refreshToken", data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
      return true;
    } else {
      cookies().delete("accessToken");
      cookies().delete("refreshToken");
      return false;
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
export const registerUser = async (email: string, password: string) => {
  try {
    const res = await fetch(`${process.env.DOMAIN}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (res.status === 400) {
      throw new Error("this email is already taken");
    }
    return true;
  } catch (error: any) {
    throw new Error(error);
  }
};
