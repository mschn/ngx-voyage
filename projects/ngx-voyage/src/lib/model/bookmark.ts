import { IconType } from "../icon";

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
