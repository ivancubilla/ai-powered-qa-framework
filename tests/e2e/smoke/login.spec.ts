import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/LoginPage';

// El tag @smoke nos permite correr solo este test rápido en la CI
test.describe('Authentication @smoke', () => {
  
  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    // 1. Navegamos a la página
    await loginPage.goto();
    
    // 2. Ejecutamos la acción del Page Object
    await loginPage.login('standard_user', 'secret_sauce');
    
    // 3. Assert: Playwright espera automáticamente a que la URL cambie
    await expect(page).toHaveURL(/.*inventory.html/);
    
    // Verificamos que el título de la página sea el correcto
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('should show error message with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await loginPage.login('invalid_user', 'wrong_password');
    
    // Assert: Verificamos el mensaje de error usando el locator del POM
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Username and password do not match');
  });
});