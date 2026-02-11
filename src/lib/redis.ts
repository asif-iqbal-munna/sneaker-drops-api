import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

const getRedisUrl = () => {
  if (process.env.REDIS_URL) {
    return process.env.REDIS_URL;
  }
  throw new Error("REDIS_URL is not defined");
};

const globalForRedis = global as unknown as { redis: Redis };

export const redis = globalForRedis.redis || new Redis(
  getRedisUrl(),
  {
    maxRetriesPerRequest: null,
  }
);

if (process.env.NODE_NODE !== "production") globalForRedis.redis = redis;
