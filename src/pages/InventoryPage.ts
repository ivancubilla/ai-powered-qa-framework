import { Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');  
  }

  async addProductToCart(productName: string) {
    const productCard = this.page
      .locator('.inventory_item')
      .filter({ hasText: productName });

    await productCard.getByRole('button', { name: 'Add to cart' }).click();
  }

  async expectProductAdded(productName: string) {
    const productCard = this.page
      .locator('.inventory_item')
      .filter({ hasText: productName });
      
    await productCard.getByRole('button', { name: 'Remove' }).waitFor();
  }

  async openCart() {
    await this.shoppingCartLink.click();
  }
}