import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, "../../../../.env");
dotenv.config({ path: envPath, override: false });
dotenv.config({ override: true });

function requireEnv(key: string, fallback?: string): string {
  const value = process.env[key] ?? fallback;
  if (!value) throw new Error(`Missing environment variable: ${key}`);
  return value;
}

export const env = {
  port: Number(process.env.PORT ?? 4000),
  mongoUri: requireEnv("MONGO_URI"),
  jwtSecret: requireEnv("JWT_SECRET", "dev-secret-change-in-production"),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
  corsOrigin:
    process.env.CORS_ORIGIN ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  seedAdminEmail:
    process.env.SEED_ADMIN_EMAIL ?? "admin@alsmortgagesolutions.com.au",
  seedAdminPassword: process.env.SEED_ADMIN_PASSWORD ?? "Admin@123456",
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "",
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY ?? "",
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET ?? "",
  cloudinaryFolder: process.env.CLOUDINARY_FOLDER ?? "als",
};
