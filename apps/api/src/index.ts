import app from "./app.js";
import { env } from "./config/env.js";
import { connectDb } from "./db/connect.js";
import { isCloudinaryConfigured } from "./lib/cloudinary.js";

const isVercel = Boolean(process.env.VERCEL);

if (!isVercel) {
  connectDb()
    .then(() => {
      app.listen(env.port, () => {
        console.log(`API running on http://localhost:${env.port}`);
        console.log(
          isCloudinaryConfigured()
            ? "Cloudinary: configured"
            : "Cloudinary: not configured (add CLOUDINARY_* to .env and restart)",
        );
      });
    })
    .catch((err) => {
      console.error("Failed to start API:", err);
      process.exit(1);
    });
}

export default app;
