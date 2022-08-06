import { Page } from "@playwright/test";
import { PageObjectComponent } from "page-objects/base-page-objects/page-object-component";
import { CreateFolderModal } from "./create-folder-modal.component";
import { countNumberOfElements } from "./../../../utils/methods";
import { RemoveFolderOrLabelModal } from "page-objects/shared-components/remove-folder-label-modal.component";

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
    removeFolderOrLabelModal: new RemoveFolderOrLabelModal(this.page),
    createFolderModal: new CreateFolderModal(this.page),
    createdFolderName: (folderName: string) =>
      this.page.locator(`[title="${folderName}"]`).nth(1),
  };

  constructor(page: Page) {
    super(page, page.locator('[data-target-id="folderlist"]'));
  }

  async getNumberOfFolders(): Promise<number> {
    await this.page.waitForLoadState();
    return await countNumberOfElements(this.$.tableRows);
  }

  async removeFolder(index: number): Promise<void> {
    await this.$.folderDropdownButton(index).click();
    await this.$.removeFolderButton.click();
    await this.page.waitForLoadState("networkidle");
    await this.$.removeFolderOrLabelModal.acceptRemoval();
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
