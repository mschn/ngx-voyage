import test, { expect } from "@playwright/test";

test.describe("rename", () => {
  test("should rename a file", async ({ page }) => {
    await page.goto("http://localhost:4200/");
    await page.getByText("LICENSE.md").click({ button: "right" });
    await page.getByText("Rename").click();
    await page.getByTestId("rename-file-input").fill("LICENSE_2.md");
    await page.getByRole("button", { name: "Rename" }).click();
    await expect(page.getByTestId("files-grid-name")).toHaveText([
      "screenshots",
      "example.component.ts",
      "README.md",
      "LICENSE_2.md",
    ]);
  });
});
