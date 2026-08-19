import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/projects/addkaithai-crs");
});

test("mobile detail order is title, image, description, responsibilities, technologies, links", async ({
  page,
}) => {
  const selectors = [
    "h1",
    "[data-project-image]",
    "[data-project-description]",
    "[data-project-responsibilities]",
    "[data-project-technologies]",
    "[data-project-links]",
  ];
  const positions = await Promise.all(
    selectors.map(async (selector) => {
      const box = await page.locator(selector).boundingBox();
      expect(box, `${selector} should have a rendered box`).not.toBeNull();
      return box!.y;
    }),
  );

  expect(positions).toEqual([...positions].sort((a, b) => a - b));
});

test("project image opens from a named button and returns focus after close", async ({
  page,
}) => {
  const trigger = page.getByRole("button", {
    name: "Enlarge Family Store Cashier & Reservation System image",
  });
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});

test("live and repository links remain available on mobile", async ({ page }) => {
  await expect(
    page.getByRole("link", { name: /Open live preview/ }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Open GitHub repository/ }),
  ).toBeVisible();
});

test("desktop detail content stays grouped beside a tall project image", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });

  const regions = [
    "h1",
    "[data-project-description]",
    "[data-project-responsibilities]",
    "[data-project-technologies]",
    "[data-project-links]",
  ];
  const boxes = await Promise.all(
    regions.map(async (selector) => {
      const box = await page.locator(selector).boundingBox();
      expect(box, `${selector} should have a rendered box`).not.toBeNull();
      return box!;
    }),
  );
  const verticalGaps = boxes.slice(1).map((box, index) => {
    const previous = boxes[index];
    return box.y - (previous.y + previous.height);
  });

  expect(Math.max(...verticalGaps)).toBeLessThan(96);
});
