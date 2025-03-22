import test, { expect } from "@playwright/test";

test.describe("large viewport", () => {
  test("should show the bookmarks panel ", async ({ page }) => {
    await page.goto("http://localhost:4200/");
    await page.getByTestId("select-view-list").click();
    await expect(page.getByTestId("files-list-name").first()).toHaveText(
      "screenshots",
    );
    await expect(page.getByTestId("bookmark")).toHaveText(["Home"]);
  });
});

test.describe("small viewport", () => {
  test.use({
    viewport: { width: 430, height: 932 },
  });

  test("should hide the bookmarks panel ", async ({ page }) => {
    await page.goto("http://localhost:4200/");
    await expect(page.getByTestId("files-grid-name").first()).toHaveText(
      "screenshots",
    );

    await expect(page.getByTestId("select-view-list")).toBeHidden();
    await expect(page.getByTestId("bookmark")).toBeHidden();
  });
});
