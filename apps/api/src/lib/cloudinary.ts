import { v2 as cloudinary } from "cloudinary";
import { env } from "../config/env.js";

export function isCloudinaryConfigured(): boolean {
  return Boolean(
    env.cloudinaryCloudName &&
      env.cloudinaryApiKey &&
      env.cloudinaryApiSecret,
  );
}

export function getCloudinary() {
  if (!isCloudinaryConfigured()) {
    throw new Error("Cloudinary is not configured");
  }
  cloudinary.config({
    cloud_name: env.cloudinaryCloudName,
    api_key: env.cloudinaryApiKey,
    api_secret: env.cloudinaryApiSecret,
    secure: true,
  });
  return cloudinary;
}

export async function uploadImageBuffer(
  buffer: Buffer,
  options?: { folder?: string; publicId?: string },
): Promise<{ url: string; publicId: string }> {
  const cld = getCloudinary();
  const folder = options?.folder ?? env.cloudinaryFolder;

  return new Promise((resolve, reject) => {
    const stream = cld.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        ...(options?.publicId ? { public_id: options.publicId } : {}),
      },
      (err, result) => {
        if (err || !result) reject(err ?? new Error("Upload failed"));
        else
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
          });
      },
    );
    stream.end(buffer);
  });
}
