import { atom } from 'jotai';
import { categories } from '../metaData';

type checkoutAtom = {
  category?: keyof typeof categories;
  checkout?: {
    [key: keyof (typeof categories)[keyof typeof categories]['steps'][number]['options']]: string;
  };
};

export const checkoutAtom = atom<checkoutAtom>({});
