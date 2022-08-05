import { Page } from "@playwright/test";
import { PageObject } from "page-objects/base-page-objects/page-object";

const pageUrl = "https://account.proton.me/login";

export class LoginPage extends PageObject {
  $ = {
    userNameInput: this.page.locator("#username"),
    passwordInput: this.page.locator("#password"),
    submitButton: this.page.locator('button[type="submit"]'),
  };

  constructor(page: Page) {
    super(page, pageUrl, page.locator('[name="loginForm"]'));
  }

  async waitForPageLoad(): Promise<void> {
    await this.parentElement.hover();
  }

  // In the rest of the tests we login by using API instead of this method
  async loginToAccount(name: string, password: string): Promise<void> {
    await this.$.userNameInput.fill(name);
    await this.$.passwordInput.fill(password);
    await this.$.submitButton.click();
  }
}
