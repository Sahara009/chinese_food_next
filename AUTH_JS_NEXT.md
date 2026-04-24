1. npm install next-auth@beta
2. lib/auth.ts :
   import NextAuth from "next-auth";
   export const { auth, handlers, signIn } = NextAuth({ providers: [] });

3. // app/api/auth/[...nextauth]/route.ts
   import { handlers } from "@/auth"
   export const { GET, POST } = handlers

4. header page:
