import { FastifyInstance } from "fastify";
import { fastifyPlugin } from "fastify-plugin";

async function healthCheck(app: FastifyInstance) {
  app.get("/api/health", async (req, resp) => {
    return { status: "ok", db: "ok" };
  });
}

export default fastifyPlugin(healthCheck);
