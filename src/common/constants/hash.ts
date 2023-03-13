import { hashSync, compareSync } from 'bcrypt';
import { Constants } from './constants';

export function hash(password: string): string {
  const hash = hashSync(password, Constants.SALT_ROUNDS);
  return hash;
}

export function checkPassword(password: string, hashPassword: string): boolean {
  return compareSync(password, hashPassword);
}
