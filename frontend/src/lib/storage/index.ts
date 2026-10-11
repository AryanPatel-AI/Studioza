/**
 * Local & Static File Storage Service
 * Handles persisting uploaded media files to the public filesystem with collision-resistant filenames.
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";

/** Result returned after a file is stored */
export interface UploadResult {
  url: string;        // Web-accessible URL path
  storageKey: string; // Internal file identifier on disk
}

/**
 * Saves a binary file buffer to the public uploads directory.
 * @param fileBuffer - Raw buffer of the uploaded file
 * @param originalFilename - Original filename for extracting the extension
 * @param _mimeType - File MIME type
 */
export async function uploadFile(
  fileBuffer: Buffer,
  originalFilename: string,
  _mimeType: string
): Promise<UploadResult> {
  const extension = path.extname(originalFilename) || "";
  const randomKey = `${Date.now()}-${crypto.randomBytes(8).toString("hex")}${extension}`;

  // Store in public/uploads for direct Next.js static asset serving
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const filePath = path.join(uploadsDir, randomKey);
  await fs.promises.writeFile(filePath, fileBuffer);

  return { url: `/uploads/${randomKey}`, storageKey: randomKey };
}

/** Deletes a previously uploaded file from the public uploads directory */
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
