import { test } from '@playwright/test';

// Este test NO valida nada de negocio. 
// Su propósito es que el Playwright Agent (Planner) tenga un punto de entrada
// para entender cómo inicializar el entorno.
test('seed test for agent environment bootstrapping', async ({ page }) => {
  await page.goto('/');
  
  // Login básico a SauceDemo
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  
  // Wait for navigation to inventory page (implicitly done by Playwright)
  // No assertions needed here, just reach the state.
});