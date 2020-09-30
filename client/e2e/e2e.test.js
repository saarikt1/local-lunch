beforeAll(async () => {
  await context.overridePermissions("http://localhost:3000", ["geolocation"]);
  await page.setGeolocation({ latitude: 60.1697802, longitude: 24.9472751 });
  await page.goto("http://localhost:3000");
});

describe("Page", () => {
  it('should be titled "Lunch Near Me"', async () => {
    await expect(page.title()).resolves.toMatch("Lunch Near Me");
  });

  it('should have a header "Lunch Near Me"', async () => {
    const header = await page.$eval("#page-header", (e) => e.innerHTML);
    await expect(header).toBe("Lunch Near Me");
  });

  it("should show restaurant suggestions section", async () => {
    const restaurantSuggestions = await page.$("#restaurant-suggestions");
    await expect(restaurantSuggestions).toBeTruthy;
  });

  it("should show a map", async () => {
    const map = await page.$("#map");
    await expect(map).toBeTruthy;
  });
});
