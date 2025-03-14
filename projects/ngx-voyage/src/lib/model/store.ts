import {
  getState,
  patchState,
  signalStore,
  withMethods,
  withState,
} from "@ngrx/signals";
import {
  Bookmark,
  getBookmarksFromLocalstorage,
  writeBookmarksToLocalstorage,
} from "./bookmark";

type State = {
  showHiddenFiles: boolean;
  showOpenFile: boolean;
  bookmarks: Bookmark[];
};

const initialState: State = {
  showHiddenFiles: false,
  showOpenFile: true,
  bookmarks: getBookmarksFromLocalstorage(),
};

export const Store = signalStore(
  { providedIn: "root" },
  withState(initialState),
  withMethods((store) => ({
    toggleHiddenFiles: () =>
      patchState(store, (state) => ({
        ...state,
        showHiddenFiles: !state.showHiddenFiles,
      })),

    setShowOpenFile: (showOpenFile: boolean) =>
      patchState(store, (state) => ({ ...state, showOpenFile })),

    addBookmark: (bookmark: Bookmark) => {
      const bookmarks = [...getState(store).bookmarks, bookmark];
      writeBookmarksToLocalstorage(bookmarks);
      patchState(store, (state) => ({
        ...state,
        bookmarks,
      }));
    },
  }))
);
