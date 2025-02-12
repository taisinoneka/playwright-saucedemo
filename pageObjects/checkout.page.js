import { test, expect } from "@playwright/test";
class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstnameField = this.page.locator("#first-name");
    this.lastnameField = this.page.locator("#last-name");
    this.postalcodeField = this.page.locator("#postal-code");
    this.continueBtn = this.page.locator("#continue");
    this.checkoutItems = this.page.locator("div.inventory_item_name");
    this.finishBtn = this.page.locator("#finish");
    this.checkoutCompleteURL =
      "https://www.saucedemo.com/checkout-complete.html";
  }
  async fillOutInformationForm(firstname, lastname, postalcode) {
    await this.firstnameField.fill(firstname);
    await this.lastnameField.fill(lastname);
    await this.postalcodeField.fill(postalcode);
    await this.continueBtn.click();
  }
  getCheckoutItems() {
    return this.checkoutItems.allInnerTexts();
  }
}

export default CheckoutPage;
