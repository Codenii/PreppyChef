import { z } from "zod";

const envSchema = z.object({
  // Env variable will go here [WIP]
  NODE_ENV: z.enum(["development", "test", "production"]),
  API_PORT: z.coerce.number().default(3000),
});

const parsedEnv = envSchema.parse(process.env);

const config = {
  // Config values will go here [WIP]
  nodeEnv: parsedEnv.NODE_ENV,
  apiPort: parsedEnv.API_PORT,
};

export { config };
