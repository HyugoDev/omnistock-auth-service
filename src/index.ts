import { Hono } from "hono";
import { cors } from "hono/cors";
import { auth } from "./auth";

const app = new Hono();

// CORS configuration for Angular SPA and API clients
app.use(
  "*",
  cors({
    origin: ["http://localhost:4200", "http://127.0.0.1:4200"],
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

// Health check endpoint
app.get("/health", (c) => {
  return c.json({
    status: "ok",
    service: "omnistock-auth-service",
    runtime: "Bun",
    timestamp: new Date().toISOString(),
  });
});

// Better Auth API Route Handler
app.on(["POST", "GET"], "/api/auth/**", (c) => {
  return auth.handler(c.req.raw);
});

const port = Number(process.env.PORT) || 4000;
console.log(`🚀 OmniStock Auth Service running on port ${port} (Bun + Hono + Better Auth)`);

export default {
  port,
  fetch: app.fetch,
};
