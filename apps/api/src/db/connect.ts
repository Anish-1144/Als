import mongoose from "mongoose";
import { env } from "../config/env.js";

declare global {
  // eslint-disable-next-line no-var
  var __mongooseConn: Promise<typeof mongoose> | undefined;
}

export async function connectDb(): Promise<typeof mongoose> {
  mongoose.set("strictQuery", true);

  if (global.__mongooseConn) {
    return global.__mongooseConn;
  }

  global.__mongooseConn = mongoose.connect(env.mongoUri).then((conn) => {
    console.log("MongoDB connected");
    return conn;
  });

  return global.__mongooseConn;
}
