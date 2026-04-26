"use server";

import { signIn, signOut } from "@/src/shared/lib/auth";
import { redirect } from "next/navigation";

export async function loginAction(data: { email: string; password: string }) {
  try {
    const result = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (result?.error) {
      return { error: "Invalid credentials" };
    }

    redirect("/");
  } catch (e) {
    if (e instanceof Error && e.message === "NEXT_REDIRECT") {
      throw e;
    }
    return { error: "Invalid credentials" };
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/auth/login" });
}
