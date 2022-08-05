import { BasePageObject, Object$, ParentElement } from "./base-page-object";
import { Page } from "@playwright/test";

export abstract class PageObject extends BasePageObject {
  private privateUrl: string;
  abstract $: Object$;

  protected constructor(
    page: Page,
    url: string,
    parentElement?: ParentElement
  ) {
    super(page, parentElement);
    this.privateUrl = url;
  }

  get url(): string {
    return this.privateUrl;
  }

  async load(): Promise<void> {
    try {
      await this.loadPage();
    } catch (error) {
      throw error;
    }
  }

  private async loadPage() {
    await this.page.goto(this.url);
    await this.waitForPageLoad();
  }

  abstract waitForPageLoad(): Promise<void>;
}
