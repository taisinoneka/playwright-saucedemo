import { test, expect } from "@playwright/test";
class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = this.page.locator("#user-name");
    this.passwordInput = this.page.locator("#password");
    this.loginButton = this.page.locator("#login-button");
    this.pageHeader = this.page.locator("#header_container");
    this.pageFooter = this.page.locator("footer.footer");
    this.loginPageUrl = "https://www.saucedemo.com/";
    this.urlAfterLogin = "https://www.saucedemo.com/inventory.html";
  }

  async navigate() {
    await this.page.goto(this.loginPageUrl);
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    expect(this.pageHeader).toBeVisible();
    expect(this.pageFooter).toBeVisible();
    expect(this.page.url()).toBe(this.urlAfterLogin);
  }
  async expectErrorMessage(err) {
    expect(this.page.getByText(err)).toBeVisible();
  }

  async expectLoginPage() {
    expect(this.page.url()).toBe(this.loginPageUrl);
    expect(this.loginButton).toBeVisible();
  }
}

export default LoginPage;
