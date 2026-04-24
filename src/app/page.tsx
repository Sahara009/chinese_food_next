import { redirect } from "next/navigation";
import { auth } from "../shared/lib/auth";
import { Button } from "../shared/ui/Button/button";

export default async function Home() {
  const session = await auth();

  if (!session) redirect("/auth/login");
  return (
    <div>
      Hello chinese lover <Button>fooood</Button>
    </div>
  );
}
