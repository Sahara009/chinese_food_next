"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/src/shared/ui/Button/button";
import { Soup } from "lucide-react";
import Link from "next/link";

type User = {
  name: string;
};

type Props = {
  user: User | null;
};

export function Header({ user }: Props) {
  return (
    <header className="border-b">
      <div className="mx-auto max-w-6xl flex items-center justify-between p-4">
        {/* ЛОГО */}

        <div className="font-bold flex items-center gap-2">
          <Soup className="text-primary" />

          <h1 className="text-primary">Chinese Food</h1>
        </div>

        {/* НАВИГАЦИЯ */}
        <nav className="flex gap-6">
          <Link href={"/"}>Home</Link>

          <a href="/movies" className="hover:underline">
            Recipes
          </a>
          <a href="/about" className="hover:underline">
            About
          </a>
        </nav>

        {/* ПРАВАЯ ЧАСТЬ */}
        <div>
          {user ? (
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <span>{user.name}</span>
            </div>
          ) : (
            <Button>Войти</Button>
          )}
        </div>
      </div>
    </header>
  );
}
