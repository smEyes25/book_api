import { v4 as uuid } from 'uuid';

export function generateID(name: string): string {
  return name + uuid();
}
