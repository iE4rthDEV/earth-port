import { expect, test, type Locator } from "@playwright/test";

const columns = async (cards: Locator): Promise<number> => {
  const lefts = await cards.evaluateAll((elements) =>
    elements.map((element) =>
      Math.round(element.getBoundingClientRect().left),
    ),
  );
  return new Set(lefts).size;
};

test("Contact has one h1 and a 1/2/3-column card grid", async ({ page }) => {
  for (const [width, expected] of [
    [375, 1],
    [768, 2],
    [1024, 3],
  ] as const) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/contact");
    await expect(
      page.getByRole("heading", { level: 1, name: "Contact" }),
    ).toHaveCount(1);
    expect(await columns(page.locator("main article"))).toBe(expected);
  }
});

test("unknown projects render a semantic not-found heading and recovery action", async ({
  page,
}) => {
  const response = await page.goto("/projects/not-a-real-project");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { level: 1, name: "Project not found" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Back to Projects" }),
  ).toBeVisible();
});
