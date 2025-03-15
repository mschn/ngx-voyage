import {
  getBookmarksFromLocalstorage,
  isBookmarks,
  writeBookmarksToLocalstorage,
} from "./bookmark";

describe("Bookmark", () => {
  describe("isBookmarks", () => {
    it("should reject non bookmarks", () => {
      expect(isBookmarks(null)).toBe(false);
      expect(isBookmarks(undefined)).toBe(false);
      expect(isBookmarks({})).toBe(false);
      expect(isBookmarks([{ foo: 1 }])).toBe(false);
    });

    it("should accept bookmarks", () => {
      expect(isBookmarks([])).toBe(true);
      expect(isBookmarks([{ icon: "home", name: "foo", path: "/bar" }])).toBe(
        true,
      );
    });
  });

  describe("getBookmarksFromLocalstorage", () => {
    it("should return an empty array", () => {
      expect(getBookmarksFromLocalstorage()).toEqual([]);
    });

    it("should return an empty array when invalid data is stored", () => {
      Storage.prototype.getItem = jest.fn(() => '[{ "foo": "home"}]');
      expect(getBookmarksFromLocalstorage()).toEqual([]);
    });

    it("should return a bookmarks array", () => {
      Storage.prototype.getItem = jest.fn(
        () => '[{ "icon": "home", "name": "foo", "path": "/foo"}]',
      );
      expect(getBookmarksFromLocalstorage()).toEqual([
        { icon: "home", name: "foo", path: "/foo" },
      ]);
    });
  });

  describe("writeBookmarksToLocalstorage", () => {
    it("should write bookmarks", () => {
      Storage.prototype.setItem = jest.fn();
      writeBookmarksToLocalstorage([
        { icon: "home", name: "foo", path: "/foo" },
      ]);
      expect(Storage.prototype.setItem).toHaveBeenNthCalledWith(
        1,
        "VOYAGE_BOOKMARKS",
        '[{"icon":"home","name":"foo","path":"/foo"}]',
      );
    });
  });
});
