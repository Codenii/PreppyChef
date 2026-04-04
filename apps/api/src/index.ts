import { buildApp } from "./app.js";
import { config } from "./config.js";

async function startServer() {
  try {
    const app = await buildApp();

    await app.listen({ port: config.apiPort, host: "0.0.0.0" });
  } catch (error) {
    console.error(`Error starting server: ${error}`);
    process.exit(1);
  }
}
