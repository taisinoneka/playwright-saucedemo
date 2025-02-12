import { test, expect } from "@playwright/test";
class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = this.page.locator("div.inventory_item_name");
    this.checkoutBtn = this.page.locator("#checkout");
    this.firstnameField = this.page.locator("#first-name");
    this.lastnameField = this.page.locator("#last-name");
    this.postalcodeField = this.page.locator("#postal-code");
    this.continueBtn = this.page.locator("#continue");
    this.continueShoppingBtn = page.locator("#continue-shopping");
  }
  getCartItems() {
    return this.cartItems.allInnerTexts();
  }
}

export default CartPage;
