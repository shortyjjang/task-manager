import { atom } from 'jotai';

interface User {
  name: string;
  email: string;
}

export const userAtom = atom<User>({ name: '', email: '' });