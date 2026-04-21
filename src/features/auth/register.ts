"use server";

import { prisma } from "@/src/shared/utils/prisma";
import { authFormData } from "./types/types";

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
