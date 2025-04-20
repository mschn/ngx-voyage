import { test, expect } from "@playwright/test";

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

  test("should edit a bookmark", async ({ page }) => {
    await page.goto("http://localhost:4200/");

    await page.getByText("screenshots").dblclick();
    await expect(page.getByText("light.png")).toBeVisible();

    await page.getByTestId("add-bookmark").click();

    await page.getByTestId("edit-bookmark-input").fill("my bookmark");
    await page.getByRole("button", { name: "Save" }).click();

    await expect(page.getByTestId("bookmark")).toHaveText([
      "Home",
      "my bookmark",
    ]);
  });

  test("should remove a bookmark", async ({ page }) => {
    await page.goto("http://localhost:4200/");

    await page.getByText("screenshots").dblclick();
    await expect(page.getByText("light.png")).toBeVisible();

    await page.getByTestId("add-bookmark").click();
    await page.getByRole("button", { name: "Remove" }).click();

    await expect(page.getByTestId("bookmark")).toHaveText(["Home"]);
  });
});
