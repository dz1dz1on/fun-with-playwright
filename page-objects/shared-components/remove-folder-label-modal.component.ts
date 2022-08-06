import { PageObjectComponent } from "page-objects/base-page-objects/page-object-component";
import { Page } from "@playwright/test";

export class RemoveFolderOrLabelModal extends PageObjectComponent {
  $ = {
    removeButton: this.parentElement.locator(
      ".button.button-solid-danger.w100"
    ),
  };

  constructor(page: Page) {
    super(page, page.locator(".modal-two-dialog-container"));
  }

  async acceptRemoval(): Promise<void> {
    await this.$.removeButton.click();
    await this.$.removeButton.waitFor({ state: "detached" });
  }
}
