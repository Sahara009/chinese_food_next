import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";
import { prisma } from "@/server/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { loginSchema } from "../config/zod_schema";
export const runtime = "nodejs";

export const { auth, handlers, signIn } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validateCred = loginSchema.parse(credentials);
        const user = await prisma.user.findFirst({
          where: {
            email: validateCred.email,
            password: validateCred.password,
          },
        });
        // const email = "admin@admin.com";
        // const password = "1234567";

        // if (credentials.email === email && credentials.password === password) {
        //   return { email, password };
        // } else {
        if (!user) {
          throw new Error("Invalid credentials");
        }
        return user;
        // }
      },
    }),
  ],
});
