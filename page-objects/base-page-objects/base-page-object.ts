import { Locator, Page } from "@playwright/test";

export type ParentElement = Locator | string;

type LocatorFunction = (
  ...args: never[]
) => Promise<Locator> | Locator | BasePageObject;

type ElementType =
  | Locator
  | Promise<Locator>
  | LocatorFunction
  | BasePageObject;

export interface Object$ {
  [key: string]: ElementType;
}

export class BasePageObject {
  $: Object$; // Store here page elements
  readonly page: Page;
  private readonly _parentElement: Locator | undefined;

  constructor(page: Page, parentElement?: ParentElement) {
    this.page = page;
    this._parentElement =
      typeof parentElement === "string"
        ? this.page.locator(parentElement)
        : parentElement;
  }

  get parentElement(): Locator {
    if (!this._parentElement) {
      throw Error(
        `No "parentElement" in PageObject constructor. Please add it`
      );
    }
    return this._parentElement;
  }
}
