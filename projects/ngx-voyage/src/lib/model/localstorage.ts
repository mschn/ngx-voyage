import { Bookmark, isBookmarks } from "./bookmark";
import { FileSortFields, isFileSortField, isViewType, ViewType } from "./model";

const LocalstorageKeys = {
  sort: "VOYAGE_SORT_ORDER",
  field: "VOYAGE_SORT_FIELD",
  bookmarks: "VOYAGE_BOOKMARKS",
  viewType: "VOYAGE_VIEW_TYPE",
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

export function getBookmarksFromLocalstorage(): Bookmark[] {
  const bookmarksStr = localStorage.getItem(getStorageKey("bookmarks"));
  if (!bookmarksStr) {
    return [];
  }
  const bookmarks = JSON.parse(bookmarksStr);

  if (isBookmarks(bookmarks)) {
    return bookmarks;
  }
  return [];
}

export function writeBookmarksToLocalstorage(bookmarks: Bookmark[]) {
  localStorage.setItem(getStorageKey("bookmarks"), JSON.stringify(bookmarks));
}

export function writeViewToLocalstorage(viewType: ViewType) {
  localStorage.setItem(getStorageKey("viewType"), viewType);
}

export function getViewFromLocalstorage(): ViewType {
  const view = localStorage.getItem(getStorageKey("viewType"));
  if (isViewType(view)) {
    return view;
  }
  return "grid";
}
