import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import Fastify from "fastify";

export function buildApp() {
    const app = Fastify({ logger: true });

    app.register(helmet);
    app.register(cors, {
        origin: process.env.WEB_ORIGIN ?? "http://127.0.0.1:5173",
    });

    app.get("/health", async () => ({ status: "ok" }));

    return app;
}
