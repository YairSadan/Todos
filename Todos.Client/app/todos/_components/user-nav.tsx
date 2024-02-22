"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getInfo } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function UserNav() {
  // currently this is very limited because the only info we have is the email therefore some things here are hardcoded
  const router = useRouter();
  const logout = async () => {
    await fetch("/api/logout");
    router.replace("/login");
  };
  const [user, setUser] = useState({ email: "israel@gmail.com", isEmailConfiremd: false });
  useEffect(() => {
    (async () => {
      setUser(await getInfo());
    })();
  }, []);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src="" alt={user.email} />
            <AvatarFallback>
              {user.email.split("@")[0].charAt(0).toUpperCase() +
                "." +
                user.email
                  .split("@")[0]
                  .charAt(user.email.split("@")[0].length - 4)
                  .toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.email &&
                user.email.split("@")[0].charAt(0).toUpperCase() +
                  user.email.split("@")[0].slice(1)}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user && user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>New Team</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
