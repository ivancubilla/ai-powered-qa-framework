import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/LoginPage';
import { InventoryPage } from '../../../src/pages/InventoryPage';
import { CartPage } from '../../../src/pages/CartPage';

test.describe('Shopping cart @regression', () => {
  test('should add Sauce Labs Backpack to the cart and verify content', async ({ page }) => {
    // 1. Instanciamos todos los Page Objects al principio
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    
    // Definimos el producto como constante para evitar strings mágicos
    const productName = 'Sauce Labs Backpack';

    // 2. Login
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory\.html/);

    // 3. Acciones en el inventario
    await inventoryPage.addProductToCart(productName);
    
    // Validamos que se agregó correctamente (usando nuestro nuevo método)
    await inventoryPage.expectProductAdded(productName);
    await expect(inventoryPage.shoppingCartBadge).toHaveText('1');

    // 4. Navegación al carrito
    await inventoryPage.openCart();
    await expect(page).toHaveURL(/.*cart\.html/);

    // 5. Validaciones dentro del carrito (usando los nuevos métodos del CartPage)
    await cartPage.expectItemCount(1);
    await cartPage.expectProductInCart(productName);
  });
});