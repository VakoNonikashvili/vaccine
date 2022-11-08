import dotenv from "dotenv"

declare global {
    namespace NodeJS {
      interface ProcessEnv {
        DB_URL: string;
        NODE_ENV?: 'development' | 'production';
        PORT?: string;
      }
    }
  }
  

dotenv.config()

export default process.env