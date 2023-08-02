import { randomBytes } from 'node:crypto';

export function generateToken(length: number): string {
  return randomBytes(Math.ceil(length / 2)).toString('hex');
}
