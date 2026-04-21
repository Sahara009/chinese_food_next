import type { Config } from "@prisma/migrate";

const config: Config = {
  directUrl: process.env.DATABASE_URL ?? "",
};

export default config;
