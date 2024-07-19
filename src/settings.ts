import { rootPath } from './utils/rootPath';

export const dirnames = {
  main: 'H:/My Drive',
  inventory: 'inventory',
  inventory_folders: [] as const,
  // inventory_folders: ['pending', 'sold', 'listed'] as const,
  car_folders: [
    'unedited_photos',
    'listed_photos',
    'receipts',
    'info',
  ] as const,
};

export const ROOT_PATH = rootPath;
export const ROYAL_AUTO_SALES_DRIVE_PATH = dirnames.main;

// todo
// create a Directory type that is a union of all the keys in dirnames
// export type Directory = keyof typeof dirnames;
// export type Directory = typeof dirnames[keyof typeof dirnames];
// export type Directory = typeof dirnames[keyof typeof dirnames];
// export type Directory = keyof typeof dirnames;
// export type Directory = typeof dirnames[keyof typeof dirnames];
