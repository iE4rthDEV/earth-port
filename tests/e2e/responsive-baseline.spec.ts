import { test } from "@playwright/test";
import {
  expectNoHorizontalOverflow,
  ROUTES,
  VIEWPORT_WIDTHS,
} from "./support/responsive";

for (const width of VIEWPORT_WIDTHS) {
  test.describe(`${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });

    for (const route of ROUTES) {
      test(`${route} has no horizontal document overflow`, async ({ page }) => {
        await page.goto(route);
        await expectNoHorizontalOverflow(page);
      });
    }
  });
}
