import { expect, type Page } from "@playwright/test";

export const VIEWPORT_WIDTHS = [
  320, 360, 375, 640, 768, 1024, 1280, 1440,
] as const;

export const ROUTES = [
  "/",
  "/projects",
  "/projects/addkaithai-crs",
  "/contact",
] as const;

export const expectNoHorizontalOverflow = async (
  page: Page,
): Promise<void> => {
  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  expect(
    dimensions.scrollWidth,
    `scrollWidth ${dimensions.scrollWidth} exceeded clientWidth ${dimensions.clientWidth}`,
  ).toBeLessThanOrEqual(dimensions.clientWidth + 1);
};
