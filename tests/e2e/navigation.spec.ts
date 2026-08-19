import { expect, test } from "@playwright/test";

test("mobile navigation opens as a focus-contained dialog and restores focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");

  const trigger = page.getByRole("button", { name: "Open navigation" });
  await expect(trigger).toBeVisible();
  await trigger.click();

  const dialog = page.getByRole("dialog", { name: "Mobile navigation" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("link", { name: "Home" })).toHaveAttribute(
    "aria-current",
    "page",
  );

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("desktop navigation is visible without a hamburger", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto("/projects");

  const primaryNavigation = page.getByRole("navigation", {
    name: "Primary navigation",
  });

  await expect(primaryNavigation).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toBeHidden();
  await expect(
    primaryNavigation.getByRole("link", { name: "Projects", exact: true }),
  ).toHaveAttribute("aria-current", "page");
});
