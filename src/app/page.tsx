import { redirect } from "next/navigation";
import { auth } from "../shared/lib/auth";
import { Button } from "../shared/ui/Button/button";
import { Title } from "../shared/ui/Title/Title";

export default async function Home() {
  const session = await auth();

  if (!session) redirect("/auth/login");
  return (
    <div>
      <Title>Главная</Title>
      <Button>fooood</Button>
    </div>
  );
}
