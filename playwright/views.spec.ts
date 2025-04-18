import test, { expect } from "@playwright/test";

test.describe("views", () => {
  test("should keep files selection when changing views", async ({ page }) => {
    await page.goto("http://localhost:4200/");
    await page.getByText("README.md").click();

    await page.getByTestId("select-view-list").click();
    await page.keyboard.press("Enter");

    await expect(
      page.getByText(
        "ngx-voyage is an Angular File Explorer component built with PrimeNG.",
      ),
    ).toBeVisible();
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
});
