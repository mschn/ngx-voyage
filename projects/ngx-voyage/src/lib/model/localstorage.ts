import { Bookmark, isBookmarks } from "./bookmark";
import { FileSortState, isFileSort, isViewType, ViewType } from "./model";

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

export function getFileSortFromLocalstorage(): FileSortState | undefined {
  const storageSort = localStorage.getItem(getStorageKey("sort"));
  if (storageSort == null) {
    return undefined;
  }
  const sort = JSON.parse(storageSort);
  if (isFileSort(sort)) {
    return sort;
  }
  return undefined;
}

export function writeFileSortToLocalstorage(sort: FileSortState | undefined) {
  if (sort === undefined) {
    localStorage.removeItem(getStorageKey("sort"));
  } else {
    localStorage.setItem(getStorageKey("sort"), JSON.stringify(sort));
  }
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
