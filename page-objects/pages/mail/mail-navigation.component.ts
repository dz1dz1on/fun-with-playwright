import { Page } from "@playwright/test";
import { PageObjectComponent } from "page-objects/base-page-objects/page-object-component";

export class MailNavigationComponent extends PageObjectComponent {
  $ = {
    // Here we should have another navigation elements to move around the navigation bar. Important thing we should have more [data-testId] tags
    folderSettingsLink: this.page.locator(
      '[data-testid="navigation-link:folders-settings"]'
    ),
  };

  constructor(page: Page) {
    super(page);
  }
}
