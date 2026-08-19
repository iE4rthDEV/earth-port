import { expect, test, type Locator } from "@playwright/test";

const columnCount = async (cards: Locator): Promise<number> => {
  const boxes = await cards.evaluateAll((elements) =>
    elements.map((element) =>
      Math.round(element.getBoundingClientRect().left),
    ),
  );
  return new Set(boxes).size;
};

test("mobile hero prioritizes content before the profile image", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");

  const headingBox = await page
    .getByRole("heading", { level: 1, name: "Niti Surakongka" })
    .boundingBox();
  const imageBox = await page
    .getByRole("img", { name: "Portrait of Niti Surakongka" })
    .boundingBox();

  expect(headingBox).not.toBeNull();
  expect(imageBox).not.toBeNull();
  expect(headingBox!.y).toBeLessThan(imageBox!.y);
});

for (const [width, expectedColumns] of [
  [375, 1],
  [768, 2],
  [1024, 3],
] as const) {
  test(`featured projects use ${expectedColumns} columns at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const cards = page.locator("#featured-projects article");
    await expect(cards).toHaveCount(6);
    expect(await columnCount(cards)).toBe(expectedColumns);
  });
}

test("mobile project media uses a landscape aspect ratio", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const box = await page
    .locator("#featured-projects article figure")
    .first()
    .boundingBox();
  expect(box).not.toBeNull();
  expect(box!.width / box!.height).toBeGreaterThan(1.4);
});
