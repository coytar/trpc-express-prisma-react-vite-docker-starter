import "module-alias/register";
import "dotenv/config";
import express, { Application, NextFunction, Request, Response } from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "router/index";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createContext } from "lib/context";
import env from "env-var";

const VITE_APP_URL = env.get("VITE_APP_URL").required().asString();
const PORT: number = env.get("SERVER_PORT").required().asInt() || 3001;
console.log(VITE_APP_URL);

const app: Application = express();
app.use(cors({ origin: `${VITE_APP_URL}`, credentials: true }));
app.use(cookieParser());

app.get("/healthcheck", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "OK" });
});

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

app.listen(PORT, () => {
  console.log(`🚀 Server running on Port ${PORT}`);
});
