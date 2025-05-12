import dotenv from 'dotenv';
dotenv.config();

import { test, expect } from 'playwright/test';
import { loginAsAdmin } from '../helpers/login';

test('Deve criar uma nova categoria', async ({ page }) => {
  test.setTimeout(60000);
  await loginAsAdmin(page);

  await page.click('a[aria-label="Content Manager"]');

  await page.getByRole('link', { name: 'Categoria' }).click();

  await page.waitForURL('**/category?page=1**');
  await page.waitForSelector('a[href="/admin/content-manager/collection-types/api::category.category/create"]:has-text("Create new entry")');
  await page.locator('a[href="/admin/content-manager/collection-types/api::category.category/create"]:has-text("Create new entry")').click();

  await page.fill('label[for=":rt:"] + div input', 'Categoria Teste');
  await page.fill('label[for=":ru:"] + div input', 'Cat_teste');
  await page.fill('label[for=":rv:"] + div textarea', 'Descrição teste.');

  await page.waitForSelector('button[aria-disabled="false"]:not([disabled])', { state: 'visible' });
  await page.click('button[aria-disabled="false"]:not([disabled])');

  await page.waitForSelector('text=Success:');
  await page.waitForSelector('text=Saved document');
});