import { test, expect } from "@playwright/test";

test.describe("french lang", () => {
  test.use({ locale: "fr-FR" });
  test("should files list", async ({ page }) => {
    await page.goto("http://localhost:4200/");
    await page.getByTestId("select-view-list").click();
    await expect(page.getByTestId("files-list-type")).toHaveText([
      "Dossier",
      "Document Typescript",
      "Document Markdown",
      "Document Markdown",
    ]);

    await expect(page.getByTestId("files-list-date").first()).toContainText(
      "Aujourd'hui à",
    );
    await expect(page.getByTestId("files-list-date").nth(1)).toContainText(
      "Hier à",
    );
  });
});
