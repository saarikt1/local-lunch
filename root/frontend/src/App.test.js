const puppeteer = require("puppeteer");

beforeAll(async () => {
  await page.goto("http://localhost:3000");
});

describe("Application", () => {
  it('should be titled "Local Lunch"', async () => {
    await expect(page.title()).resolves.toMatch("Local Lunch");
  });
});

describe("Front page", () => {
  it('should have a header "Local Lunch"', async () => {
    const header = await page.$eval("#page-header", (e) => e.innerHTML);
    await expect(header).toBe("Local Lunch");
  });

  it("should have the correct subtitle", async () => {
    const subtitle = await page.$eval("#subtitle", (e) => e.innerHTML);
    await expect(subtitle).toBe(
      "Here's the help you need to choose where to go for lunch today."
    );
  });

  it("should not show restaurant suggestions before clicking the button", async () => {
    const restaurantSuggestions = await page.$("#restaurant-suggestions");
    await expect(restaurantSuggestions).toBeNull();
  });

  it("should not show a map before clicking the button", async () => {
    const map = await page.$("#map");
    await expect(map).toBeNull();
  });
});
