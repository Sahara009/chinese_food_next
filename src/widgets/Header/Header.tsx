import { Avatar, AvatarFallback } from "@/src/shared/ui/Avatar/avatar";
import { Button } from "@/src/shared/ui/Button/button";
import Link from "next/link";
import logo from "../../app/favicon.ico";
import Image from "next/image";
import { links } from "@/src/shared/config/constants.config";
import { auth } from "@/src/shared/lib/auth";
import { logoutAction } from "@/src/shared/lib/actions";
import { headers } from "next/headers";

export async function Header() {
  const session = await auth();
  const user = session?.user;
  const headersList = await headers();
  const pathname = headersList.get("x-invoke-path") || "/";

  return (
    <header className="border-b">
      <div className="mx-auto max-w-6xl flex items-center justify-between p-4">
        {/* ЛОГО */}
        <Link href={"/"} className="font-bold flex items-center gap-2">
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
                    ? "text-primary underline underline-offset-5"
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
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>
                  {user.name ? user.name[0] : user.email?.[0] ?? "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-sm">
                {user.name && <span className="font-medium">{user.name}</span>}
                {user.email && (
                  <span className="text-muted-foreground">{user.email}</span>
                )}
              </div>
              <form action={logoutAction}>
                <Button variant="outline" size="sm" type="submit">
                  Sign out
                </Button>
              </form>
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
