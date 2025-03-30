import { FileSortFields, isFileSortField } from "./model";

const LocalstorageKeys = {
  sort: "VOYAGE_SORT_ORDER",
  field: "VOYAGE_SORT_FIELD",
  bookmarks: "VOYAGE_BOOKMARKS",
};

type LocalstorageKey = keyof typeof LocalstorageKeys;

export function getStorageKey(key: LocalstorageKey) {
  return `${LocalstorageKeys[key]}_${window.location.hostname}`;
}

export function getSortOrderFromLocalstorage(): number {
  const storageSort = localStorage.getItem(getStorageKey("sort"));
  if (storageSort == null) {
    return 0;
  }
  const sort = Number.parseInt(storageSort);
  if (isNaN(sort)) {
    return 0;
  }
  return sort;
}

export function getSortFieldFromLocalstorage(): FileSortFields | undefined {
  const storageField = localStorage.getItem(getStorageKey("field"));
  if (isFileSortField(storageField)) {
    return storageField;
  }
  return undefined;
}

export function writeSortToLocalstorage(
  order: number | undefined,
  field: string | undefined,
) {
  localStorage.setItem(getStorageKey("field"), `${field}`);
  localStorage.setItem(getStorageKey("sort"), `${order}`);
}
