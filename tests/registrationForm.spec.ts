
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Sign up' }).click();
  await expect(page.locator('h4.modal-title')).toBeVisible();
});

test.describe('Verify registration with valid credentials', () => {
  test('Verify successful registration with valid data', async ({ page }) => {
    await page.locator('#signupName').fill('Anastasiia');
    await page.locator('#signupLastName').fill('Kyzliuk');
    await page.locator('#signupEmail').fill('torchovanastia+777@gmail.com');
    await page.locator('#signupPassword').fill('Hillelpsword!17');
    await page.locator('#signupRepeatPassword').fill('Hillelpsword!17');
    await page.locator('button[class="btn btn-primary"]').click();
    await expect(page.locator('h1')).toHaveText('Garage');
    await expect(page).toHaveURL(new RegExp('/panel/garage$'));
  });

  test('Verify error is shown for duplicate user registration', async ({ page }) => {
    await page.locator('#signupName').fill('Anastasiia');
    await page.locator('#signupLastName').fill('Kyzliuk');
    await page.locator('#signupEmail').fill('torchovanastia+777@gmail.com');
    await page.locator('#signupPassword').fill('Hillelpsword!17');
    await page.locator('#signupRepeatPassword').fill('Hillelpsword!17');
    await page.locator('button[class="btn btn-primary"]').click();
    await expect(page.locator('p.alert.alert-danger')).toHaveText('User already exists');
  });
});

test.describe('Verify all mandatory fields', () => {
  test('Verify all fields are mandatory and validation message is displayed', async ({ page }) => {
    await page.locator('#signupName').focus();
    await page.locator('#signupLastName').focus();
    page.getByText('Name required');
    await expect(page.locator('#signupName')).toHaveAttribute('class', /is-invalid/);

    await page.locator('#signupLastName').focus();
    await page.locator('#signupEmail').focus();
    page.getByText('Last name required');
    await expect(page.locator('#signupLastName')).toHaveAttribute('class', /is-invalid/);

    await page.locator('#signupEmail').focus();
    await page.locator('#signupPassword').focus();
    page.getByText('Email required');
    await expect(page.locator('#signupEmail')).toHaveAttribute('class', /is-invalid/);

    await page.locator('#signupPassword').focus();
    await page.locator('#signupRepeatPassword').focus();
    page.getByText('Password required');
    await expect(page.locator('#signupPassword')).toHaveAttribute('class', /is-invalid/);

    await page.locator('#signupRepeatPassword').focus();
    await page.locator('#signupPassword').focus();
    page.getByText('Re-enter password required');
    await expect(page.locator('#signupRepeatPassword')).toHaveAttribute('class', /is-invalid/);

    await expect(page.locator('//button[@disabled]')).toBeVisible();
  });
});

test.describe('Verify the "Name" field validation', () => {
  test('Verify the "Name" field min length validation', async ({ page }) => {
    await page.locator('#signupName').fill('q');
    await page.locator('#signupName').press('Tab');
    await expect(page.locator('#signupName')).toHaveAttribute('class', /is-invalid/);
    await expect(page.locator('div[class="invalid-feedback"] > p')).toHaveText('Name has to be from 2 to 20 characters long');
  });

  test('Verify the "Name" max field lenth validation', async ({ page }) => {
    await page.locator('#signupName').fill('Loremipsumdolorsitwww')
    await page.locator('#signupName').press('Tab')
    await expect(page.locator('#signupName')).toHaveAttribute('class', /is-invalid/);
    await expect(page.locator('div[class="invalid-feedback"] >p')).toHaveText('Name has to be from 2 to 20 characters long');
  });


  test('Verify the "Name" field Cyrillic input validation', async ({ page }) => {
    await page.locator('#signupName').fill('Анастасія');
    await page.locator('#signupName').press('Tab');
    await expect(page.locator('#signupName')).toHaveAttribute('class', /is-invalid/);
    await expect(page.locator('div[class="invalid-feedback"] >p')).toHaveText('Name is invalid');
  });

test.describe('Verify the "Last name" field validation', () => {
  test('Verify the "Last name" field min length validation', async ({ page }) => {
    await page.locator('#signupLastName').fill('K');
    await page.locator('#signupLastName').press('Tab');
    await expect(page.locator('#signupLastName')).toHaveAttribute('class', /is-invalid/);
    await expect(page.locator('div[class="invalid-feedback"] >p')).toHaveText('Last name has to be from 2 to 20 characters long');
  });
  test('Verify the "Last name" max field lenth validation', async ({ page }) => {
    await page.locator('#signupLastName').fill('Loremipsumdolorsitwww')  
    await page.locator('#signupLastName').press('Tab')
    await expect(page.locator('#signupLastName')).toHaveAttribute('class', /is-invalid/); 
    await expect(page.locator('div.invalid-feedback >p')).toHaveText('Last name has to be from 2 to 20 characters long')
  });
  

  test('Verify the "Last name" field Cyrillic input validation', async ({ page }) => {
    await page.locator('#signupLastName').fill('Кизлюк');
    await page.locator('#signupLastName').press('Tab');
    await expect(page.locator('#signupLastName')).toHaveAttribute('class', /is-invalid/);
    await expect(page.locator('div[class="invalid-feedback"] >p')).toHaveText('Last name is invalid');
  });
});

test.describe('Verify the "Email" field validation', () => {
  test('Verify validation for the invalid "Email" field', async ({ page }) => {
    await page.locator('#signupEmail').fill('torchovanastiiagmail.com');
    await page.locator('#signupEmail').press('Tab');
    await expect(page.locator('#signupEmail')).toHaveAttribute('class', /is-invalid/);
    await expect(page.locator('div[class="invalid-feedback"] >p')).toHaveText('Email is incorrect');
  });
});

test('Verify the "Password" field min length validation', async ({ page }) => {
  await page.locator('#signupPassword').fill('Pass1');
  await page.locator('#signupPassword').press('Tab');
  await expect(page.locator('#signupPassword')).toHaveAttribute('class', /is-invalid/);
  await expect(page.locator('div[class="invalid-feedback"] >p')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
});

test('Verify the "Password" field max length validation', async ({ page }) => {
  await page.locator('#signupPassword').fill('Lorem ipsum dolo');
  await page.locator('#signupPassword').press('Tab');
  await expect(page.locator('#signupPassword')).toHaveAttribute('class', /is-invalid/);
  await expect(page.locator('div[class="invalid-feedback"] >p')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
});
test('Verify the "Password" field requires at least one integer', async ({ page }) => {
  await page.locator('#signupPassword').fill('Hillelpsword!');
  await page.locator('#signupRepeatPassword').fill('Hillelpsword!');
  await expect(page.locator('#signupPassword')).toHaveAttribute('class', /is-invalid/);
  await expect(page.locator('div[class="invalid-feedback"] >p')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
});
})