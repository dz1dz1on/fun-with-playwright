import { Page } from "@playwright/test";
import { PageObjectComponent } from "page-objects/base-page-objects/page-object-component";
import { RemoveFolderOrLabelModal } from "page-objects/shared-components/remove-folder-label-modal.component";
import { countNumberOfElements } from "page-objects/utils/methods";
import { CreateLabelModal } from "./create-label-modal.component";

export class AccountLabelsComponent extends PageObjectComponent {
  $ = {
    addLabelButton: this.parentElement.locator("button").nth(0),
    sortButton: this.parentElement.locator("button.button-outline-weak"),
    editLabelButton: (index: number) =>
      this.parentElement
        .locator('[data-test-id="folders/labels:item-edit"]')
        .nth(index),
    removeLabelButton: this.page.locator(
      '[data-test-id="folders/labels:item-delete"]'
    ),
    labelDropdownButton: (index: number) =>
      this.parentElement.locator('[data-testid="dropdown-button"]').nth(index),
    labelRows: this.parentElement.locator(
      '[data-test-id="folders/labels:item-type:label"]'
    ),
    createLabelModal: new CreateLabelModal(this.page),
    removeFolderOrLabelModal: new RemoveFolderOrLabelModal(this.page),
  };

  constructor(page: Page) {
    super(page, page.locator('[data-target-id="labellist"]'));
  }

  async countNumberOfLabels(): Promise<number> {
    return await countNumberOfElements(this.$.labelRows);
  }

  async removeLabel(index: number): Promise<void> {
    //TODO: move edit and remove action to shared components catalogue. Its the same like account-folder component
    await this.$.labelDropdownButton(index).click();
    await this.$.removeLabelButton.click();
    await this.page.waitForLoadState("networkidle");
    await this.$.removeFolderOrLabelModal.acceptRemoval();
  }

  async addLabel(labelName: string, colorIndex: number): Promise<void> {
    await this.$.addLabelButton.click();
    await this.$.createLabelModal.createLabel(labelName, colorIndex);
    await this.page.waitForLoadState("networkidle");
  }
}
