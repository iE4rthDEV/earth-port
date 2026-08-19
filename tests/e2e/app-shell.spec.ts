import { expect, test } from "@playwright/test";

test("the first Tab exposes a skip link targeting main content", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");

  const skipLink = page.getByRole("link", { name: "Skip to main content" });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toHaveAttribute("href", "#main-content");

  await page.keyboard.press("Enter");
  await expect(page.locator("main#main-content")).toBeFocused();
});

test("reduced-motion removes non-essential transition time", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const durationSeconds = await page
    .getByRole("link", { name: "View Projects" })
    .evaluate((element) => {
      const duration = getComputedStyle(element).transitionDuration;
      const value = Number.parseFloat(duration);
      return duration.endsWith("ms") ? value / 1000 : value;
    });

  expect(durationSeconds).toBeLessThanOrEqual(0.001);
});
