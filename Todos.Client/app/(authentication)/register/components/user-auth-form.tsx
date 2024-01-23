'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ZodStringCheck, z } from 'zod';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const registerFetch = async (email: string, password: string) => {
  const res = await fetch(`http://localhost:5160/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  if (res.status === 200) return true;
  else if (res.status === 400) {
    throw new Error('Check your email and password and try again');
  }
  throw new Error('Something went wrong');
};

type RegisterSchemaType = z.infer<typeof registerSchema>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    setIsLoading(true);
    try {
      await registerFetch(data.email, data.password);
      router.push('/login');
    } catch (error) {
      console.error(error); //TODO open modal error
      setIsLoading(false);
    }
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              {...register('email')}
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Password
            </Label>
            <Input
              {...register('password')}
              id="password"
              placeholder="SomePassword123!"
              type="password"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="r-2 h-4 w-4 animate-spin">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            )}
            Sign In with Email and Password
          </Button>
          <div className="flex flex-col h-8 space-y-1 my-1" aria-live="polite" aria-atomic="true">
            {errors.email && (
              <div className="flex space-x-1">
                <ExclamationCircleIcon className="h-5 w-5 text-warning" />
                <p className="text-sm text-warning">{errors.email?.message}</p>
              </div>
            )}
            {errors.password && (
              <div className="flex space-x-1">
                <ExclamationCircleIcon className="h-5 w-5 text-warning" />
                <p className="text-sm text-warning">{errors.password?.message}</p>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
