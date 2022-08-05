//If there is more than one modal like this one. It would be better to have in shared-components created class for all this modals.
import { Page } from "@playwright/test";
import { PageObjectComponent } from "page-objects/base-page-objects/page-object-component";

export class CreateFolderModal extends PageObjectComponent {
  $ = {
    folderNameInput: this.page.locator(
      '[data-test-id="label/folder-modal:name"]'
    ),
    folderLocationButton: this.page.locator("#parentID"),
    locationSelect: (index: number) =>
      this.page.locator("[data-testid='select-list']").locator("li").nth(index),
    saveButton: this.page
      .locator(".modal-two-footer")
      .locator("button.button button-solid-norm"),
    notificationSwitch: this.page.locator(".toggle-label-text"),
  };

  constructor(page: Page) {
    super(page, page.locator(".modal-two-dialog-container"));
  }

  // when you create first folder you can't select localisation
  async createFolder(
    folderName: string,
    folderIndex: number = 0
  ): Promise<void> {
    await this.$.folderNameInput.fill(folderName);
    await this.$.locationSelect(folderIndex);
    await this.$.saveButton.click();
  }
}
