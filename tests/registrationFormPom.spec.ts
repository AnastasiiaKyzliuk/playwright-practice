import { test, expect } from '@playwright/test';
import { GaragePage } from '../pageObjects/GaragePage.ts';
import { MainPage } from '../pageObjects/MainPage.ts';
import { nameExist, nameLengthMsgText, nameInvalid, lastNameExist, lasNameInvalid, emailIncorrect, passwordReq, rePassMismatch} from '../data/validationMsg.ts';
import { correctEmail, correctPassword, registeredEmail, registeredPassword} from '../data/generateUserData.js';

let mainPage: MainPage;
let garagePage: GaragePage;

test.beforeEach(async ({ page }) => {
  mainPage = new MainPage(page);
  await page.goto('/');
  await mainPage.clickSignUpButton();
});

test.describe('Verify registration with valid credentials', () => {
  test('Verify successful registration with valid data', async ({ page }) => {
    await mainPage.nameField.fill('Anastasiia');
    await mainPage.lastNameField.fill('Kyzliuk');
    await mainPage.emailField.fill(correctEmail);
    await mainPage.passwordField.fill(correctPassword);
    await mainPage.repasswordField.fill(correctPassword);
    await mainPage.clickRegisterButton();
    await expect(page).toHaveURL(new RegExp('/panel/garage$'));
  });

  test('Verify error is shown for duplicate user registration', async ({ page }) => {
    await mainPage.nameField.fill('Anastasiia');
    await mainPage.lastNameField.fill('Kyzliuk');
    await mainPage.emailField.fill(registeredEmail);
    await mainPage.passwordField.fill(registeredPassword);
    await mainPage.repasswordField.fill(registeredPassword);
    await mainPage.clickRegisterButton();
    await expect(mainPage.alertMessage).toHaveText(nameExist);
  });
});

test.describe('Verify mandatory fields', () => {
  test('Verify all fields are mandatory and validation message is displayed', async ({ page }) => {
    await mainPage.nameField.press('Tab');
    await expect(mainPage.nameIsRequired).toBeVisible();
    await mainPage.lastNameField.press('Tab');
    await expect(mainPage.lastNameIsRequiredpage).toBeVisible();
    await mainPage.emailField.press('Tab');
    await expect(mainPage.emailIsRequired).toBeVisible();
    await mainPage.passwordField.press('Tab');
    await expect(mainPage.passwordIsRequired).toBeVisible();
    await mainPage.repasswordField.press('Tab');
    await expect(mainPage.rePasswordIsRequired).toBeVisible();
    await expect(mainPage.registerButton).toHaveAttribute('disabled', '');
  });
});

test.describe('Verify the "Name" field validation', () => {
  test('Verify the "Name" field min length validation', async ({ page }) => {
    await mainPage.nameField.fill('q');
    await mainPage.nameField.press('Tab');
    await expect(mainPage.nameField).toHaveAttribute('class', /is-invalid/);
    await expect(mainPage.Msg).toHaveText(nameLengthMsgText);
  });

  test('Verify the "Name" max field length validation', async ({ page }) => {
    await mainPage.nameField.fill('Loremipsumdolorsitwww');
    await mainPage.nameField.press('Tab');
    await expect(mainPage.nameField).toHaveAttribute('class', /is-invalid/);
    await expect(mainPage.Msg).toHaveText(nameLengthMsgText);
  });

  test('Verify the "Name" field Cyrillic input validation', async ({ page }) => {
    await mainPage.nameField.fill('Кизлюк');
    await mainPage.nameField.press('Tab');
    await expect(mainPage.nameField).toHaveAttribute('class', /is-invalid/);
    await expect(mainPage.Msg).toHaveText(nameInvalid);
  });
});

test.describe('Verify the "Last name" field validation', () => {
  test('Verify the "Last name" field min length validation', async ({ page }) => {
    await mainPage.lastNameField.fill('q');
    await mainPage.lastNameField.press('Tab');
    await expect(mainPage.lastNameField).toHaveAttribute('class', /is-invalid/);
    await expect(mainPage.Msg).toHaveText(lastNameExist);
  });

  test('Verify the "Last name" max field length validation', async ({ page }) => {
    await mainPage.lastNameField.fill('Loremipsumdolorsitwww');
    await mainPage.lastNameField.press('Tab');
    await expect(mainPage.lastNameField).toHaveAttribute('class', /is-invalid/);
    await expect(mainPage.Msg).toHaveText(lastNameExist);
  });

  test('Verify the "Last name" field Cyrillic input validation', async ({ page }) => {
    await mainPage.lastNameField.fill('Кизлюк');
    await mainPage.lastNameField.press('Tab');
    await expect(mainPage.lastNameField).toHaveAttribute('class', /is-invalid/);
    await expect(mainPage.Msg).toHaveText(lasNameInvalid);
  });
});

test.describe('Verify the "Email" field validation', () => {
  test('Verify validation for the invalid "Email" field', async ({ page }) => {
    await mainPage.emailField.fill('torchovanastiiagmail.com');
    await mainPage.emailField.press('Tab');
    await expect(mainPage.emailField).toHaveAttribute('class', /is-invalid/);
    await expect(mainPage.Msg).toHaveText(emailIncorrect);
  });
});

test.describe('Verify the "Password" field validation', () => {
  test('Verify the "Password" min length validation', async ({ page }) => {
    await mainPage.passwordField.fill('Pass1');
    await mainPage.passwordField.press('Tab');
    await expect(mainPage.passwordField).toHaveAttribute('class', /is-invalid/);
    await expect(mainPage.Msg).toHaveText(passwordReq);
  });

  test('Verify the "Password" max length validation', async ({ page }) => {
    await mainPage.passwordField.fill('Lorem ipsum dolo');
    await mainPage.passwordField.press('Tab');
    await expect(mainPage.passwordField).toHaveAttribute('class', /is-invalid/);
    await expect(mainPage.Msg).toHaveText(passwordReq);
  });

  test('Verify the "Password" field Cyrillic input validation', async ({ page }) => {
    await mainPage.passwordField.fill('АРкап6ів!авік');
    await mainPage.passwordField.press('Tab');
    await expect(mainPage.passwordField).toHaveAttribute('class', /is-invalid/);
    await expect(mainPage.Msg).toHaveText(passwordReq);
  });
});

test.describe('Verify the "Re-enter password" field validation', () => {
  test('Verify the "Re-enter password" matching validation', async ({ page }) => {
    await mainPage.passwordField.fill('Lorem15862Dasd');
    await mainPage.repasswordField.fill('Lorem15862DasdA');
    await mainPage.repasswordField.press('Tab');
    await expect(mainPage.repasswordField).toHaveAttribute('class', /is-invalid/);
    await expect(mainPage.Msg).toHaveText(rePassMismatch);
  });
});
