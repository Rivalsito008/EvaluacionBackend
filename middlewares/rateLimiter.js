import rateLimiter from "express-rate-limit"

const limiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many request, please try again later"
})

export default limiter