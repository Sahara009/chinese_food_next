"use server";

import { prisma } from "@/server/prisma";
import { authFormData } from "./types/types";

console.log(process.env.DATABASE_URL);

export async function registerApi(dataUser: authFormData) {
  const { email, password } = dataUser;
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password,
      },
    });
    console.log("Created user:", user);
    return user;
  } catch (error) {
    console.error("Registration error:", error);
    return null;
  }
}
