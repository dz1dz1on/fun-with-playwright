import { Locator, Page } from "@playwright/test";
import { PageObject } from "page-objects/base-page-objects/page-object";
import { AccountFoldersComponent } from "./account-folders.component";
import { AccountLabelsComponent } from "./account-labels.component";

const pageUrl = "https://account.proton.me/u/2/mail/folders-labels";

export class MailLandingPage extends PageObject {
  $ = {
    accountFoldersComponent: new AccountFoldersComponent(this.page),
    accountLabelsComponent: new AccountLabelsComponent(this.page),
  };

  constructor(page: Page) {
    super(page, pageUrl, page.locator(".container-section-sticky")); // TODO: use data-target-id instead of css
  }

  async waitForPageLoad(): Promise<void> {
    await this.$.accountFoldersComponent.parentElement.hover();
  }
}
