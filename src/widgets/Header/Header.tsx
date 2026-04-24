"use client";

import { Avatar, AvatarFallback } from "@/src/shared/ui/Avatar/avatar";
import { Button } from "@/src/shared/ui/Button/button";
import Link from "next/link";
import logo from "../../app/favicon.ico";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { links } from "@/src/shared/config/constants.config";

type User = {
  name: string;
};

type Props = {
  user: User | null;
};
console.log(process.env.DATABASE_URL);
export function Header({ user }: Props) {
  const pathname = usePathname();

  // const session = await auth();
  // if (session) redirect("/auth/login");

  return (
    <header className="border-b">
      <div className="mx-auto max-w-6xl flex items-center justify-between p-4">
        {/* ЛОГО */}

        <Link href={"/"} className="font-bold flex items-center gap-2">
          {/* priority - означает что должен загрузить первым еще до разметки */}
          <Image src={logo} alt="logotype" width={28} height={28} priority />
          <h1 className="text-primary">Chim-Chim</h1>
        </Link>

        {/* НАВИГАЦИЯ */}
        <nav className="flex gap-6">
          {links.map((link) => {
            return (
              <Link
                className={
                  link.href === pathname
                    ? "text-primary  underline underline-offset-5"
                    : "text-muted-foreground"
                }
                key={link.href}
                href={link.href}
              >
                {link.name}
              </Link>
            );
          })}
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
            <div className="flex gap-2">
              <Link href={"/auth/login"}>
                <Button variant={"outline"}>Log in</Button>
              </Link>
              <Link href={"/auth/registration"}>
                <Button>Sign up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
