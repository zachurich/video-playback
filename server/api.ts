import express from "express";
import { RequestContext } from "./types";

const api = express.Router();

api.get("/videos", async (req: RequestContext, res) => {
  const { db } = req;

  const results = await db?.query(`SELECT id, title FROM videos`);

  if (!results.length) {
    res.status(404);
    return res.send({ data: null });
  }

  return res.send({
    data: results,
  });
});

api.get("/videos/:id", async (req: RequestContext, res) => {
  const { db } = req;

  const result = await db?.query(
    `SELECT id, title FROM videos
      WHERE id = ? LIMIT 1`,
    [req.params.id]
  );

  if (!result[0]) {
    res.status(404);
    return res.send({ data: null });
  }

  return res.send({
    data: result[0],
  });
});

export default api;
