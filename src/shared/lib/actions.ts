"use server";

import { signIn } from "@/src/shared/lib/auth";

export async function loginAction(data: { email: string; password: string }) {
  try {
    await signIn("credentials", {
      ...data,
      redirect: false,
    });

    return { success: true };
  } catch (e) {
    return { error: "Invalid credentials" };
  }
}
