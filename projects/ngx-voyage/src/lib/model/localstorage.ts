import { FileSortFields, isFileSortField } from "./model";

export const LocalstorageKeys = {
  sort: "VOYAGE_SORT_ORDER",
  field: "VOYAGE_SORT_FIELD",
  bookmarks: "VOYAGE_BOOKMARKS",
};

export function getSortOrderFromLocalstorage(): number {
  const storageSort = localStorage.getItem(LocalstorageKeys.sort);
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
  const storageField = localStorage.getItem(LocalstorageKeys.field);
  if (isFileSortField(storageField)) {
    return storageField;
  }
  return undefined;
}

export function writeSortToLocalstorage(
  order: number | undefined,
  field: string | undefined,
) {
  localStorage.setItem(LocalstorageKeys.field, `${field}`);
  localStorage.setItem(LocalstorageKeys.sort, `${order}`);
}
