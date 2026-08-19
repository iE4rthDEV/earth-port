import { expect, test } from "@playwright/test";

test("Projects exposes one page heading and descriptive card links", async ({
  page,
}) => {
  await page.goto("/projects");
  await expect(
    page.getByRole("heading", { level: 1, name: "All Projects" }),
  ).toHaveCount(1);
  await expect(
    page.getByRole("link", { name: /View project details:/ }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "View more", exact: true }),
  ).toHaveCount(0);
});

test("the first project image loads eagerly and later images remain lazy", async ({
  page,
}) => {
  await page.goto("/projects");
  const images = page.locator("main article img");
  await expect(images.first()).toHaveAttribute("loading", "eager");
  await expect(images.nth(1)).toHaveAttribute("loading", "lazy");
});

test("project list cards stack on mobile and become side-by-side at md", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/projects");
  const mobileImage = await page
    .locator("main article figure")
    .first()
    .boundingBox();
  const mobileBody = await page
    .locator("main article .card-body")
    .first()
    .boundingBox();
  expect(mobileImage).not.toBeNull();
  expect(mobileBody).not.toBeNull();
  expect(mobileImage!.y).toBeLessThan(mobileBody!.y);

  await page.setViewportSize({ width: 768, height: 900 });
  const desktopImage = await page
    .locator("main article figure")
    .first()
    .boundingBox();
  const desktopBody = await page
    .locator("main article .card-body")
    .first()
    .boundingBox();
  expect(desktopImage).not.toBeNull();
  expect(desktopBody).not.toBeNull();
  expect(desktopImage!.x).toBeLessThan(desktopBody!.x);
});

test("desktop project thumbnails stay landscape for portrait source assets", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/projects");

  const box = await page.locator("main article figure").first().boundingBox();
  expect(box).not.toBeNull();
  expect(box!.width / box!.height).toBeGreaterThan(1);
});
