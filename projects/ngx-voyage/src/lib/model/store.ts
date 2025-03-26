import { Injectable, signal } from "@angular/core";
import {
  Bookmark,
  getBookmarksFromLocalstorage,
  writeBookmarksToLocalstorage,
} from "./bookmark";
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

  setSelectedView(view: ViewType) {
    this.selectedView.set(view);
  }
}
