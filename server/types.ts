import { Request } from "express";
import { Connection, PoolConnection } from "promise-mysql";

export interface RequestContext extends Request {
  db?: PoolConnection | Connection;
}
