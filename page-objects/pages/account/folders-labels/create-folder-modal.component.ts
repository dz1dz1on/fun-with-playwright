//If there is more than one modal like this one. It would be better to have in shared-components created class for all this modals.
import { Page } from "@playwright/test";
import { PageObjectComponent } from "page-objects/base-page-objects/page-object-component";

export type NameOrIndex = string | number;
export class CreateFolderModal extends PageObjectComponent {
  $ = {
    folderNameInput: this.page.locator(
      '[data-test-id="label/folder-modal:name"]'
    ),
    folderLocationButton: this.page.locator("#parentID"),
    locationSelectByIndex: (index: number) =>
      this.page.locator("[data-testid='select-list']").locator("li").nth(index),
    locationSelectByTitle: (name: string) =>
      this.page
        .locator("[data-testid='select-list']")
        .locator(`[title="${name}"]`),
    saveButton: this.page
      .locator(".modal-two-footer")
      .locator(".button.button-solid-norm"),
    cancelButton: this.page
      .locator(".modal-two-footer")
      .locator("button.button-outline-weak"),
    notificationSwitch: this.page.locator(".toggle-label-text"),
  };

  constructor(page: Page) {
    super(page, page.locator(".modal-two-dialog-container"));
  }

  async selectLocation(nameOrIndex: NameOrIndex): Promise<void> {
    await this.$.folderLocationButton.click();
    typeof nameOrIndex === "string"
      ? await this.$.locationSelectByTitle(nameOrIndex).click()
      : await this.$.locationSelectByIndex(nameOrIndex).click();
  }

  async createFolder(
    folderName: string,
    isNested: boolean,
    folderNameOrIndex?: NameOrIndex
  ): Promise<void> {
    await this.$.folderNameInput.fill(folderName);
    if (isNested) {
      await this.selectLocation(folderNameOrIndex);
    }
    await this.$.saveButton.click();
  }
}
