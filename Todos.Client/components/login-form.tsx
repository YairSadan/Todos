'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './ui/button';
import { AtSymbolIcon, KeyIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';
import { Input } from './ui/input';

const signInScema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type SignInSchemaType = z.infer<typeof signInScema>;

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(signInScema),
  });
  const router = useRouter();
  const login = async (email: string, password: string) => {
    const res = await fetch(`http://localhost:5160/login`, {
      method: 'POST',
      credentials: 'include',
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
      const { accessToken, refreshToken } = data;
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('refreshToken', refreshToken);
      router.push('/todos');
    }
    // TODO add a wrong credentials modal
  };


  const onSubmit = (data: SignInSchemaType) => {
    login(data.email, data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex-1 rounded-lg card-foreground border px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl">Please log in to continue.</h1>
        <div className="w-full">
          <div>
            <label className="mb-3 mt-5 block text-xs font-medium" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <Input
                {...register('email')}
                className="peer block w-full rounded-md border py-[9px] pl-10 text-sm outline-2"
                id="email"
                type="email"
                name="email"
                placeholder="name@example.com"
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-3 mt-5 block text-xs font-medium" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <Input
                {...register('password')}
                className="peer block w-full rounded-md border py-[9px] pl-10 text-sm outline-2"
                id="password"
                type="password"
                name="password"
                placeholder="SomePassword123!"
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
            </div>
          </div>
        </div>
        <LoginButton />
        <div className="flex flex-col h-8 space-y-1 my-1" aria-live="polite" aria-atomic="true">
          {errors.email && (
            <div className='flex space-x-1'>
              <ExclamationCircleIcon className="h-5 w-5 text-warning" />
              <p className="text-sm text-warning">{errors.email?.message}</p>
            </div>
          )}
          {errors.password && (
            <div className='flex space-x-1'>
              <ExclamationCircleIcon className="h-5 w-5 text-warning" />
              <p className="text-sm text-warning">{errors.password?.message}</p>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

function LoginButton() {
  return (
    <Button className="mt-4 w-full">
      Log in <ArrowRightIcon className="ml-auto h-5 w-5" />
    </Button>
  );
}

export default LoginForm;
