import { Injectable, signal } from "@angular/core";
import {
  Bookmark,
  getBookmarksFromLocalstorage,
  writeBookmarksToLocalstorage,
} from "./bookmark";

@Injectable({ providedIn: "root" })
export class Store {
  readonly bookmarks = signal<Bookmark[]>([]);
  readonly showHiddenFiles = signal(false);
  readonly showOpenFile = signal(false);

  constructor() {
    this.bookmarks.set(getBookmarksFromLocalstorage());
  }

  toggleHiddenFiles() {
    this.showHiddenFiles.set(!this.showHiddenFiles());
  }

  addBookmark(bookmark: Bookmark) {
    const bookmarks = [...this.bookmarks(), bookmark];
    writeBookmarksToLocalstorage(bookmarks);
    this.bookmarks.set(bookmarks);
  }

  removeBookmark(path: string) {
    const bookmarks = this.bookmarks().filter((b) => b.path !== path);
    writeBookmarksToLocalstorage(bookmarks);
    this.bookmarks.set(bookmarks);
  }
}
