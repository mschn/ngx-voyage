import test, { expect } from "@playwright/test";

test.describe("views", () => {
  test("should keep files selection when changing views", async ({ page }) => {
    await page.goto("http://localhost:4200/");
    await page.getByText("README.md").click();

    await page.getByTestId("select-view-list").click();
    await expect(page.getByRole("row", { selected: true })).toContainText(
      "README.md",
    );
  });

  test("should keep view selection after page reload", async ({ page }) => {
    await page.goto("http://localhost:4200/");
    await page.getByTestId("select-view-list").click();
    await expect(page.getByTestId("files-list-date").first()).toContainText(
      "Today at",
    );

    await page.reload();

    await expect(page.getByTestId("files-list-date").first()).toContainText(
      "Today at",
    );
  });

  test("should switch views using the settings menu", async ({ page }) => {
    await page.goto("http://localhost:4200/");
    await page.getByTestId("settings-menu-button").click();
    await expect(page.getByText("Grid view")).toBeChecked();
    await page.getByText("List view").click();
    await expect(page.getByTestId("files-list-date").first()).toContainText(
      "Today at",
    );
  });
});
