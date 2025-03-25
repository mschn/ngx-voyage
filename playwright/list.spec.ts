import { test, expect } from "@playwright/test";

test.describe("list view", () => {
  test("should display 4 files", async ({ page }) => {
    await page.goto("http://localhost:4200/");
    await page.getByTestId("select-view-list").click();
    await expect(page.getByTestId("files-list-name")).toHaveText([
      "screenshots",
      "example.component.ts",
      "README.md",
      "LICENSE.md",
    ]);
    await expect(page.getByTestId("files-list-size")).toHaveText([
      "24 B",
      "2.0 kB",
      "626 B",
      "1.1 kB",
    ]);
    await expect(page.getByTestId("files-list-type")).toHaveText([
      "Folder",
      "Typescript Document",
      "Markdown Document",
      "Markdown Document",
    ]);

    expect(page.getByTestId("files-list-date").first()).toContainText(
      "Today at",
    );
    expect(page.getByTestId("files-list-date").nth(1)).toContainText(
      "Yesterday at",
    );
  });

  test("should sort by name", async ({ page }) => {
    await page.goto("http://localhost:4200/");
    await page.getByTestId("select-view-list").click();
    await page.getByRole("columnheader", { name: "Name" }).click();
    await expect(page.getByTestId("files-list-name")).toHaveText([
      "example.component.ts",
      "LICENSE.md",
      "README.md",
      "screenshots",
    ]);
  });

  test("should open a folder", async ({ page }) => {
    await page.goto("http://localhost:4200/");
    await page.getByTestId("select-view-list").click();
    await page.getByText("screenshots").dblclick();
    await expect(page.getByTestId("files-list-name")).toHaveText([
      "light.png",
      "dark.png",
    ]);
  });
});
