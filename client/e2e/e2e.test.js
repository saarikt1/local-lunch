describe("Front page", () => {
  beforeAll(async () => {
    await context.overridePermissions("http://localhost:3000", ["geolocation"]);
    await page.setGeolocation({ latitude: 60.1697802, longitude: 24.9472751 });
    await page.goto("http://localhost:3000");
    await page.screenshot({ path: "./screenshots/initialLoadSuccess.png" });
  });

  it('should be titled "Lunch Near Me"', async () => {
    await expect(page.title()).resolves.toMatch("Lunch Near Me");
  });

  it('should have a header "Lunch Near Me"', async () => {
    const header = await page.$eval("#page-header", (e) => e.innerHTML);
    await expect(header).toBe("Lunch Near Me");
  });

  it("should show a map", async () => {
    const map = await page.$("#map");
    await expect(map).toBeTruthy;
  });

  it("should show restaurant suggestions section", async () => {
    const restaurantSuggestions = await page.$("#restaurant-suggestions");
    await expect(restaurantSuggestions).toBeTruthy;
  });
});

describe("Notification", () => {
  it("should be shown if there are no restaurants", async () => {
    await context.overridePermissions("http://localhost:3000", ["geolocation"]);
    // Location: London
    await page.setGeolocation({ latitude: 51.507351, longitude: -0.127758 });
    await page.goto("http://localhost:3000");

    await page.screenshot({ path: "./screenshots/no-restaurants.png" });

    const notificationText = await page.$eval(
      "#notificationContainer > div > div > div.MuiAlert-message",
      (e) => e.innerHTML
    );

    await expect(notificationText).toBe(
      "No restaurants found near your location."
    );
  });

  it("should be shown if location is inaccurate", async () => {
    await context.overridePermissions("http://localhost:3000", ["geolocation"]);
    await page.setGeolocation({
      latitude: 60.1697802,
      longitude: 24.9472751,
      accuracy: 5000,
    });
    await page.goto("http://localhost:3000");

    const notificationText = await page.$eval(
      "#notificationContainer > div > div > div.MuiAlert-message",
      (e) => e.innerHTML
    );

    await expect(notificationText).toBe(
      "Couldn't get an accurate location. Maybe try with a different browser."
    );
  });
});

// MAP
// should show three options on the map
// options should be clickable
// should show user location on the map
// if no restaurants, should show only user location on the map

// RESTAURANTSUGGESTIONS
// should show three options
// should show name and website link
// website link should take to the correct url
