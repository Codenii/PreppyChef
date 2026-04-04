import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import fastifySensible from "@fastify/sensible";
import pino from "pino";
import { config } from "./config.js";

// Routes Plugins
import healthCheck from "./routes/health.js";

async function buildApp() {
  const fastify = Fastify({
    logger: {
      level: config.nodeEnv === "production" ? "info" : "debug",
      base: null,
      timestamp: pino.stdTimeFunctions.isoTime,
      transport:
        config.nodeEnv === "production"
          ? undefined
          : {
              target: "pino-pretty",
              options: {
                colorize: true,
                translateTime: "SYS:standard",
                singleLine: false,
              },
            },
    },
  });

  fastify.register(fastifyCors, {
    origin: true,
    credentials: true,
  });
  fastify.register(fastifySensible);
  fastify.register(fastifyCookie);

  // Routes
  fastify.register(healthCheck);

  return fastify;
}

export { buildApp };
