import { expect, test } from "@playwright/test";

test("mobile experience details are hidden until explicitly expanded", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");

  const card = page.locator("#experience article").filter({
    has: page.getByRole("heading", {
      level: 3,
      name: "Software Developer",
    }),
  });
  const toggle = card.locator("button[aria-controls]");
  const details = card.locator("[id]").first();

  await expect(toggle).toHaveAccessibleName(
    "Show details for Software Developer",
  );
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(details).toBeHidden();
  await expect(details.getByText(/Oracle/, { exact: false })).toBeHidden();

  await toggle.click();
  await expect(toggle).toHaveAccessibleName(
    "Hide details for Software Developer",
  );
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(details).toBeVisible();
  await expect(details.getByText(/Oracle/, { exact: false })).toBeVisible();
});

test("desktop experience details are visible without disclosure controls", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto("/");

  const card = page.locator("#experience article").filter({
    has: page.getByRole("heading", {
      level: 3,
      name: "Software Developer",
    }),
  });
  const details = card.locator("[id]").first();

  await expect(card.getByRole("button", { name: /details/ })).toBeHidden();
  await expect(details).toBeVisible();
  await expect(details.getByText(/Oracle/, { exact: false })).toBeVisible();
});
