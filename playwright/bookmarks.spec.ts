import { test, expect } from "@playwright/test";
import { getByText } from "@testing-library/dom";

test.describe("bookmarks", () => {
  test("should add a bookmark", async ({ page }) => {
    await page.goto("http://localhost:4200/");

    await expect(page.getByTestId("bookmark")).toHaveText(["Home"]);

    await page.getByText("screenshots").dblclick();
    await expect(page.getByText("light.png")).toBeVisible();

    await page.getByTestId("add-bookmark").click();

    await expect(page.getByTestId("bookmark")).toHaveText([
      "Home",
      "screenshots",
    ]);

    await page.reload();
    await page.getByTestId("bookmark").nth(1).click();

    await expect(page.getByText("light.png")).toBeVisible();
  });
});
