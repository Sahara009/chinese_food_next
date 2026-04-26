import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";
import { prisma } from "@/server/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { loginSchema } from "../config/zod_schema";
import bcrypt from "bcryptjs";

export const runtime = "nodejs";

const adapter = PrismaAdapter(prisma);

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: adapter,
  secret: process.env.AUTH_SECRET || process.env.BETTER_AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validateCred = loginSchema.parse(credentials);
        const user = await prisma.user.findUnique({
          where: {
            email: validateCred.email.toLowerCase(),
          },
        });
        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const isValidPassword = await bcrypt.compare(
          validateCred.password,
          user.password
        );

        if (!isValidPassword) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.email && session.user) {
        session.user.email = token.email;
      }
      return session;
    },
  },
});
