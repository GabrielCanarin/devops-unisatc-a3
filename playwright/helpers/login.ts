import { Page } from 'playwright/test'

export async function loginAsAdmin(page: Page) {
  await page.goto('http://localhost:1337/admin');
  await page.fill('input[name="email"]', process.env.ADMIN_EMAIL || '');
  await page.fill('input[name="password"]', process.env.ADMIN_PASSWORD || '');
  await page.click('button[type="submit"]');

  await page.getByRole('heading', { name: 'Hello Super' }).waitFor();
}