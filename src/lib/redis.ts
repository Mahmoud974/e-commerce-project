// import Redis from "ioredis";

// const redis = new Redis({
//   host: "localhost",
//   port: 6379,
// });

// export default redis;

import Redis from "ioredis";

// Ne pas se connecter pendant le build
const redis = process.env.REDIS_URL
  ? new Redis(process.env.REDIS_URL)
  : new Redis({
      host: process.env.REDIS_HOST || "localhost",
      port: parseInt(process.env.REDIS_PORT || "6379"),
      lazyConnect: true,
      retryStrategy: () => null, // Pas de retry
      maxRetriesPerRequest: 1,
      enableOfflineQueue: false,
    });

// Ignorer les erreurs de connexion pendant le build
redis.on('error', (err) => {
  if (process.env.NODE_ENV !== 'production') {
    console.warn('Redis connection error:', err.message);
  }
});

export default redis;