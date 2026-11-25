# Saucedemo Add to Cart Test Plan

## Application Overview

Test the Saucedemo shopping flow by logging in with the standard user, adding one product to the cart, and confirming cart state.

## Test Scenarios

### 1. Saucedemo cart

**Seed:** `tests/seed.spec.ts`

#### 1.1. User can add a product to the cart

**File:** `tests/cart.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/.
    - expect: The login page is visible.
    - expect: The Username, Password, and Login controls are available.
  2. Enter standard_user in the Username field and secret_sauce in the Password field, then click Login.
    - expect: The inventory page is displayed.
    - expect: The page title is Swag Labs.
    - expect: The shopping cart link is visible.
  3. Locate the first inventory item and click its Add to cart button.
    - expect: The selected item's button changes to Remove.
    - expect: The shopping cart badge shows 1.
    - expect: The shopping cart link remains available.
  4. Open the shopping cart.
    - expect: The cart page is displayed.
    - expect: The cart contains exactly one selected product.
    - expect: The product name and Remove button are visible.
