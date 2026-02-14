import Redis from "ioredis";

// Éviter Redis pendant le build
const isBuilding = process.env.NEXT_PHASE === 'phase-production-build';

const redis = isBuilding 
  ? null 
  : process.env.REDIS_URL
    ? new Redis(process.env.REDIS_URL, {
        lazyConnect: true,
        maxRetriesPerRequest: 1,
        enableOfflineQueue: false,
        retryStrategy: () => null,
      })
    : new Redis({
        host: process.env.REDIS_HOST || "localhost",
        port: parseInt(process.env.REDIS_PORT || "6379"),
        lazyConnect: true,
        maxRetriesPerRequest: 1,
        enableOfflineQueue: false,
        retryStrategy: () => null,
      });

if (redis) {
  redis.on('error', (err) => {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Redis connection error:', err.message);
    }
  });
}

export default redis;