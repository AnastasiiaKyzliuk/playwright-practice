import { test, expect } from '@playwright/test';
import { GaragePage } from '../pageObjects/GaragePage';
import { SignInForm } from '../pageObjects/forms/signInForm';
import { correctEmail, correctPassword, registeredEmail, registeredPassword } from '../data/generateUserData';
import { AddExpences } from '../pageObjects/forms/addExpences.form';
import { exec } from 'child_process';

let garagePage: GaragePage;
let signInForm: SignInForm;
let addExpences: AddExpences

test.describe('Garage tests with POM', () => {
    test.use({ storageState: 'userData.json' })
    
    test.beforeEach('Login with valid credentials', async ({ page }) => {
        garagePage = new GaragePage(page)
        signInForm = new SignInForm(page)
        addExpences = new AddExpences(page)
        await page.goto('/');
        await garagePage.clickAddCarButton();
    })
    test.afterEach(async () => {
        await garagePage.removeLastCar();
    })

    test('Add [Audi] [A8] car to the garage', async ({ page }) => {
        await garagePage.selectBrand('Audi');
        await garagePage.selectModel('A8');
        await garagePage.enterMileage('222');
        await garagePage.clickAddButton();
        await expect(garagePage.firstCarName).toHaveText('Audi A8');
    });

    test('Verify mileage update by "Update" button for car', async ({ page }) => {
        await garagePage.selectBrand('Audi');
        await garagePage.selectModel('A8');
        await garagePage.enterMileage('10');
        await garagePage.clickAddButton();
        await expect(garagePage.firstCarName).toHaveText('Audi A8');
        await garagePage.mileageInput.fill('12')
        await garagePage.updateButton.click()
    });

    test('Verify imposibility of updating mileage to the smaller ', async ({ page }) => {
        await garagePage.selectBrand('Audi');
        await garagePage.selectModel('A8');
        await garagePage.enterMileage('10');
        await garagePage.clickAddButton();
        await expect(garagePage.firstCarName).toHaveText('Audi A8');
        await garagePage.mileageInput.fill('5')
        await expect(garagePage.updateButton).toHaveAttribute('disabled')
    });

    test('Verify adding fuel and expenses to the car', async ({ page }) => {
        await garagePage.selectBrand('Audi');
        await garagePage.selectModel('A8');
        await garagePage.enterMileage('5');
        await garagePage.clickAddButton();
        await expect(garagePage.firstCarName).toHaveText('Audi A8');
        await garagePage.clickAddFuelButton()
        await expect(addExpences.addExpenseMileage).toBeVisible()
        await addExpences.addExpenseMileage.fill('15')
        await addExpences.addExpenseLiters.fill('25')
        await addExpences.addExpenseTotalCost.fill('30')
        await addExpences.addButton.click()
        await expect(addExpences.headerH1).toBeVisible()
        await garagePage.garageLink.click()
    });

    test('Add [BMW] [X5] car to the garage', async () => {
        await garagePage.selectBrand('BMW');
        await garagePage.selectModel('X5');
        await garagePage.enterMileage('1222');
        await garagePage.clickAddButton();
        await expect(garagePage.firstCarName).toHaveText('BMW X5');
    });

    test('Verify "Cancel" button while adding the fuel', async ({ page }) => {
        await garagePage.selectBrand('Audi');
        await garagePage.selectModel('A8');
        await garagePage.enterMileage('5');
        await garagePage.clickAddButton();
        await expect(garagePage.firstCarName).toHaveText('Audi A8');
        await garagePage.clickAddFuelButton()
        await addExpences.addExpenseMileage.fill('20')
        await addExpences.addExpenseLiters.fill('25')
        await addExpences.addExpenseTotalCost.fill('30')
        await addExpences.cancelButton.click()
        await expect(garagePage.firstCarName).toHaveText('Audi A8')
    });

    test('Verify impossibility of adding fuel and expenses with the lower mileage', async ({ page }) => {
        await garagePage.selectBrand('BMW');
        await garagePage.selectModel('X5');
        await garagePage.enterMileage('50');
        await garagePage.clickAddButton();
        await expect(garagePage.firstCarName).toHaveText('BMW X5');
        await garagePage.clickAddFuelButton()
        await addExpences.addExpenseLiters.fill('25')
        await addExpences.addExpenseTotalCost.fill('30')
        await addExpences.addButton.click()
        await expect(addExpences.alertMsg).toBeVisible()
        await addExpences.closeButton.click()
    });

    test('Add [Ford] [Fiesta] car to the garage', async () => {
        await garagePage.selectBrand('Ford');
        await garagePage.selectModel('Fiesta');
        await garagePage.enterMileage('1222');
        await garagePage.clickAddButton();
        await expect(garagePage.firstCarName).toHaveText('Ford Fiesta');
    })

    test('Add [Ford] [Focus] car to the garage', async () => {
        await garagePage.selectBrand('Ford');
        await garagePage.selectModel('Focus');
        await garagePage.enterMileage('1222');
        await garagePage.clickAddButton();
        await expect(garagePage.firstCarName).toHaveText('Ford Focus');
    })

    test('Add [Porsche] [911] car to the garage', async () => {
        await garagePage.selectBrand('Porsche');
        await garagePage.selectModel('911');
        await garagePage.enterMileage('1222');
        await garagePage.clickAddButton();
        await expect(garagePage.firstCarName).toHaveText('Porsche 911');
    })

});