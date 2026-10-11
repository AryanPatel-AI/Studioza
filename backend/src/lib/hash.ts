import crypto from 'crypto';
import bcrypt from 'bcrypt';

/**
 * Hash password with bcrypt (12 rounds)
 */
export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 12);
}

/**
 * Verify plaintext against hashed password
 */
export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

/**
 * Hash opaque session token to SHA-256 for persistent database storage
 */
export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

/**
 * Generates high-entropy 256-bit random opaque token for HttpOnly cookie
 */
export function generateOpaqueToken(): string {
  return crypto.randomBytes(32).toString('hex');
}
