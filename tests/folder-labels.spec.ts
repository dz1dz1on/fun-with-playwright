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
  let testData;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    mailLandingPage = new MailLandingPage(page);
    accountFoldersAndLabelsPage = new AccountFoldersAndLabelsPage(page);

    await loginPage.load();
    await loginPage.loginToAccount(USER.name, process.env.PASSWORD);
    await mailLandingPage.waitForPageLoad();
    await mailLandingPage.$.navigationComponent.$.folderSettingsLink.click();
    await accountFoldersAndLabelsPage.waitForPageLoad();
  });

  test.afterEach(() => {
    // TODO: implement clearing of the state.
  });

  test.only("should allow to add new folder and remove it", async () => {
    testData = {
      folderName: `${faker.word.adjective()}-folder`,
    };

    const { accountFoldersComponent } = accountFoldersAndLabelsPage.$;
    const noOfFolders = await accountFoldersComponent.getNumberOfFolders();

    await accountFoldersComponent.addFolder(testData.folderName);
    const noOfFoldersAfterAddition =
      await accountFoldersComponent.getNumberOfFolders();

    // check if new folder has been added
    await expect(noOfFoldersAfterAddition).toEqual(noOfFolders + 1);
    await expect(
      accountFoldersComponent.$.createdFolderName(testData.folderName)
    ).toBeVisible();

    await accountFoldersComponent.removeFolder(testData.folderName);

    const noOfFoldersAfterRemoval =
      await accountFoldersComponent.getNumberOfFolders();

    await expect(noOfFoldersAfterRemoval).toEqual(noOfFoldersAfterAddition - 1);
  });

  test("should allow to add and remove labels", async () => {
    testData = {
      labelName: `${faker.word.adjective()}-label`,
      colorIndexNumber: 1,
      labelIndexNumber: 0,
    };

    const { accountLabelsComponent } = accountFoldersAndLabelsPage.$;
    const noOfLabelsBeforeAddingNew =
      await accountLabelsComponent.countNumberOfLabels();

    await accountLabelsComponent.addLabel(
      testData.labelName,
      testData.colorIndexNumber
    );

    const noOfLabelsAfterAddingNew =
      await accountLabelsComponent.countNumberOfLabels();

    // check if new label has been added
    await expect(noOfLabelsAfterAddingNew).toEqual(
      noOfLabelsBeforeAddingNew + 1
    );
    await expect(
      accountLabelsComponent.$.createdLabelName(testData.labelName)
    ).toBeVisible();

    await accountLabelsComponent.removeLabel(testData.labelIndexNumber);

    const noOfLabelsAfterRemoval =
      await accountLabelsComponent.countNumberOfLabels();

    await expect(noOfLabelsAfterRemoval).toEqual(noOfLabelsAfterAddingNew - 1);
  });

  test("should allow to add folder inside a folder and remove both by remoing top folder", async () => {
    const testData = {
      topFolderName: `${faker.word.adjective()}-1-folder`,
      nestedFolderName: `${faker.word.adjective()}-2-folder`,
    };
    const folderTitle = `${testData.topFolderName}/${testData.nestedFolderName}`;
    const { accountFoldersComponent } = accountFoldersAndLabelsPage.$;

    await accountFoldersComponent.addFolder(testData.topFolderName);
    await accountFoldersComponent.addFolder(
      testData.nestedFolderName,
      true,
      testData.topFolderName
    );

    await expect(
      accountFoldersComponent.$.createdNestedFolder(folderTitle)
    ).toBeVisible();

    // Visual regression could be a good idea to add here

    await accountFoldersComponent.$.editFolderButton(folderTitle).click();

    await expect(
      accountFoldersComponent.$.createFolderModal.$.folderLocationButton
    ).toHaveText(testData.topFolderName);

    await accountFoldersComponent.$.createFolderModal.$.cancelButton.click();

    // check number of folders and remove top one
    const currentNoOfFolders =
      await accountFoldersComponent.getNumberOfFolders();

    await accountFoldersComponent.removeFolder(testData.topFolderName);

    const noOfFoldersAfterRemoval =
      await accountFoldersComponent.getNumberOfFolders();

    await expect(noOfFoldersAfterRemoval).toEqual(currentNoOfFolders - 2);
  });
});
