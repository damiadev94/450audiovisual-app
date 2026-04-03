import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_URL,
    token: process.env.UPSTASH_REDIS_TOKEN,
})

export const subscriptionRateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, '1 m'),
    prefix: 'rate_limit',
    analytics: true
})

export const authRateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '15 m'),  // 5 intentos / 15 min
    prefix: 'rate_limit:auth',
    analytics: true,
})

export const publicApiRateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(60, '1 m'),
    prefix: 'rate_limit:public',
    analytics: true,
})
