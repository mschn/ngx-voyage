import { Injectable, signal } from "@angular/core";
import { Bookmark } from "./bookmark";
import {
  getBookmarksFromLocalstorage,
  getViewFromLocalstorage,
  writeBookmarksToLocalstorage,
  writeViewToLocalstorage,
} from "./localstorage";
import { File } from "./model";

export type ViewType = "list" | "grid";

@Injectable()
export class Store {
  readonly bookmarks = signal<Bookmark[]>([]);
  readonly showHiddenFiles = signal(false);
  readonly showOpenFile = signal(false);
  readonly showPreviewFile = signal(false);
  readonly selectedView = signal<ViewType>("grid");
  readonly selectedFile = signal<File | undefined>(undefined);

  constructor() {
    this.bookmarks.set(getBookmarksFromLocalstorage());
    this.selectedView.set(getViewFromLocalstorage());
  }

  toggleHiddenFiles() {
    this.showHiddenFiles.set(!this.showHiddenFiles());
  }

  addBookmark(bookmark: Bookmark) {
    const bookmarks = [...this.bookmarks(), bookmark];
    this.saveBookmarks(bookmarks);
  }

  setBookmark(bookmark: Bookmark) {
    const bookmarks = [...this.bookmarks()];
    for (const b of bookmarks) {
      if (bookmark.path === b.path) {
        b.name = bookmark.name;
      }
    }
    this.saveBookmarks(bookmarks);
  }

  removeBookmark(path: string) {
    const bookmarks = this.bookmarks().filter((b) => b.path !== path);
    this.saveBookmarks(bookmarks);
  }

  setSelectedView(view: ViewType) {
    writeViewToLocalstorage(view);
    this.selectedView.set(view);
  }

  private saveBookmarks(bookmarks: Bookmark[]) {
    writeBookmarksToLocalstorage(bookmarks);
    this.bookmarks.set(bookmarks);
  }
}
