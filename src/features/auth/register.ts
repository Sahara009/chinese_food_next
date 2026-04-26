"use server";

import { prisma } from "@/server/prisma";
import { authFormData } from "./types/types";
import bcrypt from "bcryptjs";

export async function registerApi(dataUser: authFormData) {
  const { email, password } = dataUser;
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return { error: "User with this email already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
      },
    });

    return { success: true, user: { id: user.id, email: user.email } };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Something went wrong. Please try again." };
  }
}
