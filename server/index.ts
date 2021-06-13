import path from "path";
import cors from "cors";
import express from "express";
import api from "./api";
import database from "./database";
import { RequestContext } from "./types";

const server = express();

if (process.env.NODE_ENV !== "production") {
  server.use(
    cors({
      origin: "http://localhost:3000",
      optionsSuccessStatus: 200,
    })
  );
}

server.use(async (req: RequestContext, res, next) => {
  req.db = await database.pool();
  next();
});

server.use(express.static(path.join(__dirname, "../ui/build")));
server.use("/api", api);
server.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../ui/build", "index.html"));
});

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
server.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});
