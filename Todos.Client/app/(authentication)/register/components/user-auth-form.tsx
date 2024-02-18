"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useToast } from "@/components/ui/use-toast";
import { RegisterFormSchema, RegisterFormValues } from "@/data/schema";
import { registerUser } from "@/lib/actions";
import { Icons } from "@/components/icons";

export function UserAuthForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterFormSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    startTransition(async () => {
      try {
        const res = await registerUser(data.email, data.password);
        if (res) {
          toast({
            title: "Account created",
            description: "We have created your account for you, please login.",
          });
          router.push("/login");
        } else {
          toast({
            title: "Error",
            description: "Something went wrong",
            variant: "destructive",
          });
        }
      } catch (error: any) {
        setError(error.message);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className={cn("grid gap-6")}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              {...register("email")}
              onChange={() => setError("")}
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isPending}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Password
            </Label>
            <Input
              {...register("password")}
              id="password"
              placeholder="SomePassword123!"
              type="password"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isPending}
            />
          </div>
          <Button disabled={isPending}>
            Sign In with Email and Password
            {isPending ? (
            <Icons.spinner className="ml-auto h-4 w-4 animate-spin" />
          ) : (
            <Icons.ArrowRightIcon className="ml-auto h-5 w-5" />
          )}
        </Button>
          <div
            className="flex flex-col h-8 space-y-1 my-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {errors.email && (
              <div className="flex space-x-1">
                <ExclamationCircleIcon className="h-5 w-5 text-warning" />
                <p className="text-sm text-warning">{errors.email?.message}</p>
              </div>
            )}
            {errors.password && (
              <div className="flex space-x-1">
                <ExclamationCircleIcon className="h-5 w-5 text-warning" />
                <p className="text-sm text-warning">
                  {errors.password?.message}
                </p>
              </div>
            )}
            {error && (
              <div className="flex space-x-1">
                <ExclamationCircleIcon className="h-5 w-5 text-warning" />
                <p className="text-sm text-warning">{error}</p>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
