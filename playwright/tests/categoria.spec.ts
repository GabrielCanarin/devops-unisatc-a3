import dotenv from 'dotenv';
dotenv.config();

import { test, expect } from 'playwright/test';
import { loginAsAdmin } from '../helpers/login';

test.beforeEach(async ({ page }) => {
  await page.context().clearCookies();
  await page.goto('about:blank');
});

test('Deve criar uma nova categoria', async ({ page }) => {
  test.setTimeout(10000);

  await loginAsAdmin(page);

  await page.click('a[aria-label="Content Manager"]');
  await page.getByRole('link', { name: 'Categoria' }).click();

  await page.click('text=Create new entry');
  await page.fill('input[name="name"]', 'Categoria Teste');
  await page.click('button:has-text("Regenerate")');
  await page.fill('textarea[name="description"]', 'Descrição teste.');

  await page.click('button:has-text("Save")');
  await page.waitForTimeout(1000);
  await page.click('text=Back');

  const categoriaNome = await page.textContent('table tbody tr:last-of-type td:nth-of-type(3)');
  expect(categoriaNome).toContain('erro teste');

});
