import dotenv from "dotenv"

interface ProcessEnv {
    PORT?: string
    NODE_ENV?: string
}

dotenv.config()

export default process.env as ProcessEnv