import { IconType } from "../icon";

export const BOOKMARKS_STORAGE_KEY = "VOYAGE_BOOKMARKS";

export interface Bookmark {
  name: string;
  path: string;
  icon: IconType;
}

export function isBookmarks(
  bookmarks: any | undefined
): bookmarks is Bookmark[] {
  if (Array.isArray(bookmarks)) {
    return bookmarks.every(
      (bookmark) =>
        typeof bookmark?.name === "string" && typeof bookmark?.path === "string"
    );
  }
  return false;
}

export function getBookmarksFromLocalstorage(): Bookmark[] {
  const bookmarksStr = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
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
  localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks));
}
