import { Page } from "@playwright/test";
import { PageObjectComponent } from "page-objects/base-page-objects/page-object-component";
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
    createLabelModal: new CreateLabelModal(this.page),
  };

  constructor(page: Page) {
    super(page, page.locator('[data-target-id="labellist"]'));
  }

  async removeLabel(index: number): Promise<void> {
    //TODO: move edit and remove action to shared components catalogue. Its the same like account-folder component
    await this.$.editLabelButton(index).click();
    await this.$.removeLabelButton.click();
  }

  async addLabel(labelName: string, colorIndex: number): Promise<void> {
    await this.$.addLabelButton.click();
    await this.$.createLabelModal.createLabel(labelName, colorIndex);
  }
}
