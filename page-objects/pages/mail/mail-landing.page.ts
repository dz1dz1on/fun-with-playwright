import { Page } from "@playwright/test";
import { PageObject } from "page-objects/base-page-objects/page-object";
import { MailNavigationComponent } from "./mailNavigation.component";

const pageUrl = "https://mail.proton.me/";

export class MailLandingPage extends PageObject {
  $ = {
    navigationComponent: new MailNavigationComponent(this.page),
  };

  constructor(page: Page) {
    super(page, pageUrl, page.locator('[data-testid="sidebar:compose"]'));
  }

  async waitForPageLoad(): Promise<void> {
    await this.parentElement.hover();
  }
}
