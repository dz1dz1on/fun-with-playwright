import { Page } from "@playwright/test";
import { PageObjectComponent } from "page-objects/base-page-objects/page-object-component";
import { CreateFolderModal } from "./create-folder-modal.component";

export class AccountFoldersComponent extends PageObjectComponent {
  $ = {
    addFolderButton: this.parentElement.locator("button").nth(0), // here would be better to just have e2e-target="add-folder-button"
    toggleLabel: this.parentElement.locator("label"),
    sortButton: this.parentElement.locator("button.button-outline-weak"),
    tableRows: this.parentElement.locator('li[role="treeitem"]'),
    editFolderButton: (index: number) =>
      this.parentElement
        .locator('[data-test-id="folders/labels:item-edit"]')
        .nth(index),
    folderDropdownButton: (index: number) =>
      this.parentElement.locator('[data-testid="dropdown-button"]').nth(index),
    removeFolderButton: this.page.locator(
      '[data-test-id="folders/labels:item-delete"]'
    ),
    acceptRemovalButton: this.page.locator(".button.button-solid-danger.w100"),
    createFolderModal: new CreateFolderModal(this.page),
  };

  constructor(page: Page) {
    super(page, page.locator('[data-target-id="folderlist"]'));
  }

  async getNumberOfFolders(): Promise<number> {
    return await this.$.tableRows.count();
  }

  async removeFolder(index: number): Promise<void> {
    await this.$.folderDropdownButton(index).click();
    await this.$.removeFolderButton.click();
    await this.page.waitForLoadState("networkidle");
    await this.$.acceptRemovalButton.click();
    await this.$.acceptRemovalButton.waitFor({ state: "detached" });
  }

  // when you create first folder you can't select folderLocalisationIndex
  async addFolder(
    folderName: string,
    folderLocalisationIndex: number = 0
  ): Promise<void> {
    await this.$.addFolderButton.click();
    await this.$.createFolderModal.createFolder(
      folderName,
      folderLocalisationIndex
    );
    await this.page.waitForLoadState("networkidle");
  }
}
