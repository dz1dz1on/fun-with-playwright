import { Locator } from "@playwright/test";

export const countNumberOfElements = async (
  locator: Locator
): Promise<number> => await locator.count();
