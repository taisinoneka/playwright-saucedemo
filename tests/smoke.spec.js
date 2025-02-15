// @ts-check
import { test, expect } from "@playwright/test";
import LoginPage from "../pageObjects/login.page";
import ProductsPage from "../pageObjects/products.page";
import CartPage from "../pageObjects/cart.page";
import CheckoutPage from "../pageObjects/checkout.page";

test.describe("Login flow", async () => {
  test("Error case: Locked out user", async ({ page }) => {
    let loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login("locked_out_user", "secret_sauce");
    await loginPage.expectErrorMessage(
      "Epic sadface: Sorry, this user has been locked out.",
    );
  });
  test("Standard user", async ({ page }) => {
    let loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login("standard_user", "secret_sauce");
    await loginPage.expectUserLoggedIn();
  });
  test("Error case: Non existant user", async ({ page }) => {
    let loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login("asd", "asd");
    await loginPage.expectErrorMessage(
      "Epic sadface: Username and password do not match any user in this service",
    );
  });
  test("Error case: Empty password field", async ({ page }) => {
    let loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login("standard_user", "");
    await loginPage.expectErrorMessage("Epic sadface: Password is required");
  });
  test("Error case: Empty Username field", async ({ page }) => {
    let loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login("", "");
    await loginPage.expectErrorMessage("Epic sadface: Username is required");
  });
  test("Login and logout", async ({ page }) => {
    let loginPage = new LoginPage(page);
    let productsPage = new ProductsPage(page);
    await loginPage.navigate();
    await loginPage.login("standard_user", "secret_sauce");
    await loginPage.expectUserLoggedIn();
    await productsPage.burgerMenu.click();
    await productsPage.logoutBtn.click();
  });
});
test.describe("Purchase product flow", async () => {
  test.beforeEach(async ({ page }) => {
    let loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login("standard_user", "secret_sauce");
  });

  test("Successful purchase", async ({ page }) => {
    let productsPage = new ProductsPage(page);
    let cartPage = new CartPage(page);
    let checkoutPage = new CheckoutPage(page);
    await productsPage.sortingDropdown.selectOption("az");
    await productsPage.lastItemButton.click();
    await productsPage.topRightItemButton.click();
    await productsPage.shoppingCartIcon.click();
    let cartItems = await cartPage.getCartItems();
    await cartPage.checkoutBtn.click();
    await checkoutPage.fillOutInformationForm("test", "user", "0000");
    let checkoutItems = await checkoutPage.getCheckoutItems();
    expect(cartItems).toEqual(checkoutItems);
    await checkoutPage.finishBtn.click();
    expect(page.url()).toBe(checkoutPage.checkoutCompleteURL);
  });
  test("Remove item from cart", async ({ page }) => {
    let productsPage = new ProductsPage(page);
    let cartPage = new CartPage(page);
    await productsPage.sortingDropdown.selectOption("az");
    await productsPage.lastItemButton.click();
    await productsPage.shoppingCartIcon.click();
    await productsPage.removeBtn.click();
    await productsPage.shoppingCartIcon.click();
    expect(cartPage.cartItems).not.toBeAttached();
  });
  test("Open item", async ({ page }) => {
    let productsPage = new ProductsPage(page);
    let item = await productsPage.getItemAttributes("Sauce Labs Backpack");
    console.log(item);
    await productsPage.clickItemLink(item);
    await productsPage.expectCorrectItem(item);
  });
});
