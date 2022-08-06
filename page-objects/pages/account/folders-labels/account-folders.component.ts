import { Page } from "@playwright/test";
import { PageObjectComponent } from "page-objects/base-page-objects/page-object-component";
import {
  CreateFolderModal,
  NameOrIndex,
} from "./create-folder-modal.component";
import { countNumberOfElements } from "../../../../utils/methods";
import { RemoveFolderOrLabelModal } from "page-objects/shared-components/remove-folder-label-modal.component";

export class AccountFoldersComponent extends PageObjectComponent {
  $ = {
    addFolderButton: this.parentElement.locator("button").nth(0), // here would be better to just have e2e-target="add-folder-button"
    toggleLabel: this.parentElement.locator("label"),
    sortButton: this.parentElement.locator("button.button-outline-weak"),
    tableRows: this.parentElement.locator('li[role="treeitem"]'),
    editFolderButton: (title: string) =>
      this.parentElement
        .locator(`[title="${title}"]`)
        .locator('[data-test-id="folders/labels:item-edit"]')
        .nth(0),
    folderDropdownButton: (title: string) =>
      this.parentElement
        .locator(`[title="${title}"]`)
        .locator('[data-testid="dropdown-button"]')
        .nth(0),
    removeFolderButton: this.page.locator(
      '[data-test-id="folders/labels:item-delete"]'
    ),
    removeFolderOrLabelModal: new RemoveFolderOrLabelModal(this.page),
    createFolderModal: new CreateFolderModal(this.page),
    createdFolderName: (folderName: string) =>
      this.page.locator(`[title="${folderName}"]`).nth(1),
    createdNestedFolder: (folderTitle: string) =>
      this.page.locator(`[title="${folderTitle}"]`).nth(0),
  };

  constructor(page: Page) {
    super(page, page.locator('[data-target-id="folderlist"]'));
  }

  async getNumberOfFolders(): Promise<number> {
    await this.page.waitForLoadState("load");
    return await countNumberOfElements(this.$.tableRows);
  }

  async removeFolder(folderTitle: string): Promise<void> {
    await this.$.folderDropdownButton(folderTitle).click();
    await this.$.removeFolderButton.click();
    await this.page.waitForLoadState("networkidle");
    await this.$.removeFolderOrLabelModal.acceptRemoval();
  }

  // when you create first folder you can't select folderLocalisationIndex
  async addFolder(
    folderName: string,
    isNested: boolean = false,
    folderNameOrIndex?: NameOrIndex
  ): Promise<void> {
    await this.$.addFolderButton.click();
    await this.$.createFolderModal.createFolder(
      folderName,
      isNested,
      folderNameOrIndex
    );
    await this.page.waitForLoadState("networkidle");
  }
}
