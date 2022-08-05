import { test, expect, type Page } from "@playwright/test";
import { USER } from "page-objects/data/user.data.";
import { AccountFoldersAndLabelsPage } from "page-objects/pages/account/folders-labels/account-folders-labels.page";
import { LoginPage } from "page-objects/pages/login.page";
import { MailLandingPage } from "page-objects/pages/mail/mail-landing.page";
import { faker } from "@faker-js/faker";

test.describe("Folder and Labels", () => {
  let loginPage: LoginPage;
  let mailLandingPage: MailLandingPage;
  let accountFoldersAndLabelsPage: AccountFoldersAndLabelsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    mailLandingPage = new MailLandingPage(page);
    accountFoldersAndLabelsPage = new AccountFoldersAndLabelsPage(page);

    await loginPage.load();
    await loginPage.loginToAccount(USER.name, USER.password);
    await mailLandingPage.waitForPageLoad();
    await mailLandingPage.$.navigationComponent.$.folderSettingsLink.click();
    await accountFoldersAndLabelsPage.waitForPageLoad();
  });

  test("should allow to add new folder and remove it", async ({ page }) => {
    const testData = {
      folderName: `${faker.word.adjective()}-folder`,
      folderIndexToRemove: 0,
    };

    const { accountFoldersComponent } = accountFoldersAndLabelsPage.$;
    const noOfFolders = await accountFoldersComponent.getNumberOfFolders();

    await accountFoldersComponent.addFolder(testData.folderName);
    const noOfFoldersAfterAddition =
      await accountFoldersComponent.getNumberOfFolders();

    await expect(accountFoldersComponent.parentElement).toBeVisible();
    await expect(noOfFoldersAfterAddition).toEqual(noOfFolders + 1);

    await await accountFoldersComponent.removeFolder(
      testData.folderIndexToRemove
    );

    const noOfFoldersAfterRemoval =
      await accountFoldersComponent.getNumberOfFolders();

    await expect(noOfFoldersAfterRemoval).toEqual(noOfFoldersAfterAddition - 1);
  });
});
