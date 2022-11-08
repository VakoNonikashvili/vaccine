import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
	windowMs: 60 * 1000,
	max: 5,
	standardHeaders: false,
	legacyHeaders: true,
})

export default limiter