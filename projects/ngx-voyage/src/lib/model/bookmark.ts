import { IconType } from "../icon";
import { getStorageKey } from "./localstorage";

export interface Bookmark {
  name: string;
  path: string;
  icon: IconType;
}

export function isBookmarks(bookmarks: unknown): bookmarks is Bookmark[] {
  if (Array.isArray(bookmarks)) {
    return bookmarks.every(
      (bookmark) =>
        typeof bookmark?.name === "string" &&
        typeof bookmark?.path === "string",
    );
  }
  return false;
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
