import fs from "fs";
import path from "path";
import crypto from "crypto";

export interface UploadResult {
  url: string;
  storageKey: string;
}

export async function uploadFile(
  fileBuffer: Buffer,
  originalFilename: string,
  mimeType: string
): Promise<UploadResult> {
  const extension = path.extname(originalFilename) || "";
  const randomKey = `${Date.now()}-${crypto.randomBytes(8).toString("hex")}${extension}`;

  // Store in public/uploads for immediate local/static availability
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const filePath = path.join(uploadsDir, randomKey);
  await fs.promises.writeFile(filePath, fileBuffer);

  const url = `/uploads/${randomKey}`;
  return {
    url,
    storageKey: randomKey,
  };
}

export async function deleteFile(storageKey: string): Promise<boolean> {
  try {
    const filePath = path.join(process.cwd(), "public", "uploads", storageKey);
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
    }
    return true;
  } catch (err) {
    console.error("deleteFile error:", err);
    return false;
  }
}
