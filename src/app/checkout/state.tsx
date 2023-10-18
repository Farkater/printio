'use client';

import { atom } from 'jotai';
import { CategoryName, Categories } from '../metaData';

export type CheckoutAtom = {
  id: string;
  image?: string;
  itemQuantity: number;
  category: CategoryName;
  checkout?: {
    [key: keyof Categories[CategoryName]['steps'][number]['options']]: string;
  };
}[];

const atomWithLocalStorage = <T,>(key: string, initialValue: T) => {
  const getInitialValue = (): T => {
    const item = localStorage.getItem(key);
    if (item !== null) {
      return JSON.parse(item);
    }

    return initialValue;
  };

  const baseAtom = atom(getInitialValue());

  const derivedAtom = atom(
    get => get(baseAtom),
    (get, set, update) => {
      const nextValue = typeof update === 'function' ? update(get(baseAtom)) : update;

      set(baseAtom, nextValue);
      localStorage.setItem(key, JSON.stringify(nextValue));
    }
  );

  return derivedAtom;
};

export const checkoutAtom = atomWithLocalStorage<CheckoutAtom>('checkoutState', []);
