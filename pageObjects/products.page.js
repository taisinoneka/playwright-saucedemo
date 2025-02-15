import { test, expect } from "@playwright/test";
class ProductsPage {
  constructor(page) {
    this.page = page;
    this.sortingDropdown = this.page.locator(
      "//select[contains(@class, 'product_sort_container')]",
    );
    this.topRightItemButton = this.page
      .locator("#inventory_container .pricebar button")
      .nth(1);
    this.lastItemButton = this.page
      .locator("#inventory_container .pricebar button")
      .last();
    this.shoppingCartIcon = this.page.locator("#shopping_cart_container");
    this.burgerMenu = this.page.locator("#react-burger-menu-btn");
    this.logoutBtn = this.page.locator("#logout_sidebar_link");
    this.removeBtn = this.page.getByText("Remove");
    this.productViewName = this.page.locator(".inventory_details_name");
    this.productViewDescription = this.page.locator(".inventory_details_desc");
    this.productViewPrice = this.page.locator(".inventory_details_price");
  }
  async navigate() {
    await this.page.goto("https://www.saucedemo.com/inventory.html");
  }
  async clickItemLink(itemName) {
    //#inventory_container .inventory_item_label a
    await this.page
      .locator(`//div[contains(text(),'${itemName.name}')]/parent::a`)
      .click();
  }

  async getItemAttributes(itemName) {
    let item = {
      name: itemName,
      description: await this.page
        .locator(
          `//div[contains(text(),'${itemName}')]/parent::*/following-sibling::div`,
        )
        .innerText(),
      price: await this.page
        .locator(
          `//div[contains(text(),'${itemName}')]/ancestor::div[contains(@class,"inventory_item_label")]/following-sibling::div/div`,
        )
        .innerText(),
    };
    return item;
  }
  async expectCorrectItem(item) {
    expect(this.productViewName).toContainText(item.name);
    expect(this.productViewDescription).toContainText(item.description);
    expect(this.productViewPrice).toContainText(item.price);
  }
}

export default ProductsPage;
