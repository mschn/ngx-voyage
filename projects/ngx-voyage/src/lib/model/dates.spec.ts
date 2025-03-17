import { isToday } from "./dates";

describe("dates", () => {
  describe("isToday", () => {
    it("should be true", () => {
      expect(isToday(new Date())).toBe(true);
    });

    it("should be false", () => {
      expect(isToday(new Date("2020-10-10"))).toBe(false);
      expect(
        isToday(new Date(new Date().getTime() - 1000 * 60 * 60 * 24)),
      ).toBe(false);
    });
  });

  describe("isYesterday", () => {
    it("should be true", () => {
      expect(
        isToday(new Date(new Date().getTime() - 1000 * 60 * 60 * 24)),
      ).toBe(false);
    });

    it("should be false", () => {
      expect(isToday(new Date("2020-10-10"))).toBe(false);
      expect(isToday(new Date())).toBe(true);
    });
  });
});
