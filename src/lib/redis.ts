import Redis from "ioredis";

const noopClient = {
  get: async () => null as string | null,
  set: async () => {},
  del: async () => {},
  on: () => noopClient,
};

function createRedisClient(): Redis | typeof noopClient {
  const url = process.env.REDIS_URL;
  const host = process.env.REDIS_HOST || "localhost";
  const port = parseInt(process.env.REDIS_PORT || "6379", 10);

  if (process.env.NEXT_PHASE === "phase-production-build") {
    return noopClient;
  }

  if (url) {
    const client = new Redis(url, {
      lazyConnect: true,
      maxRetriesPerRequest: 1,
      retryStrategy: () => null,
      enableOfflineQueue: false,
    });
    client.on("error", () => {});
    return client;
  }

  if (process.env.VERCEL) {
    return noopClient;
  }

  const client = new Redis({
    host,
    port,
    lazyConnect: true,
    maxRetriesPerRequest: 1,
    retryStrategy: () => null,
    enableOfflineQueue: false,
  });
  client.on("error", () => {});
  return client;
}

const redis = createRedisClient();

export default redis;
