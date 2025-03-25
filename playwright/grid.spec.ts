import { test, expect } from "@playwright/test";

test.describe("grid view", () => {
  test("should display 4 files", async ({ page }) => {
    await page.goto("http://localhost:4200/");
    await expect(page.getByTestId("files-grid-name")).toHaveText([
      "screenshots",
      "example.component.ts",
      "README.md",
      "LICENSE.md",
    ]);
  });

  test("should open a folder", async ({ page }) => {
    await page.goto("http://localhost:4200/");
    await page.getByText("screenshots").dblclick();
    await expect(page.getByTestId("files-grid-name")).toHaveText([
      "light.png",
      "dark.png",
    ]);
  });
});
