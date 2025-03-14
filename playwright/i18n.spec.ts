import { test, expect } from "@playwright/test";

test.describe("french lang", () => {
  test.use({ locale: "fr-FR" });
  test("should files list", async ({ page }) => {
    await page.goto("http://localhost:4200/");
    await expect(page.getByTestId("files-list-type")).toHaveText([
      "Dossier",
      "Document Typescript",
      "Document Markdown",
      "Document Markdown",
    ]);

    expect(page.getByTestId("files-list-date").first()).toContainText(
      "Aujourd'hui à",
    );
    expect(page.getByTestId("files-list-date").nth(1)).toContainText("Hier à");
  });
});
