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
});
