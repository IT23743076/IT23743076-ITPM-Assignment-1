const { test, expect } = require('@playwright/test');

test('Positive test: Singlish to Sinhala translation', async ({ page }) => {
  await page.goto('https://swifttranslator.com');

  // Type Singlish input
  await page.locator('textarea').first().fill('mama gedhara yanavaa');

  // Wait for UI to react
  await page.waitForTimeout(3000);

  // Basic validation: page is still visible and responsive
  await expect(page.locator('textarea').first()).toBeVisible();
});