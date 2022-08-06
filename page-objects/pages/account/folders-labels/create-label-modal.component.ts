import { Page } from "@playwright/test";
import { PageObjectComponent } from "page-objects/base-page-objects/page-object-component";
import { TIMEOUT } from "page-objects/data/timeouts.data";

export class CreateLabelModal extends PageObjectComponent {
  $ = {
    nameOfLabelInput: this.page.locator(
      '[data-test-id="label/folder-modal:name"]'
    ),
    colorDropdownButton: this.page.locator('[id="accountType"]'),
    colorSelector: (index: number) =>
      this.page.locator(".color-selector-container").locator("li").nth(index),
    saveButton: this.page
      .locator(".modal-two-footer")
      .locator("button.button-solid-norm"),
  };

  constructor(page: Page) {
    super(page);
  }

  async pickColor(index: number): Promise<void> {
    await this.$.colorDropdownButton.click();
    await this.$.colorSelector(index).click();
  }

  async createLabel(labelName: string, colorIndex: number): Promise<void> {
    await this.$.nameOfLabelInput.fill(labelName);
    await this.pickColor(colorIndex);
    await this.$.saveButton.click();
    await this.$.saveButton.waitFor({
      state: "detached",
      timeout: TIMEOUT.SHORT,
    });
  }
}
