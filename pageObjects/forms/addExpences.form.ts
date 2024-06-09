import { expect, type Locator, type Page } from '@playwright/test';

export class AddExpences {
    readonly page: Page;
    readonly addExpencesHeader: Locator;
    readonly addExpencesCar: Locator
    readonly addExpenseDate: Locator
    readonly addExpenseMileage: Locator
    readonly addExpenseLiters: Locator
    readonly addExpenseTotalCost: Locator
    readonly closeWindowButton: Locator
    readonly addExpenseButton: Locator
    readonly closeExpenseButton: Locator
    readonly addExpenseCar: Locator
    readonly closeButton: Locator
    readonly addButton: Locator
    readonly cancelButton: Locator
    readonly headerH1: Locator
    readonly tableLine: Locator
    readonly alertMsg: Locator

    constructor(page: Page) {
        this.page = page;
        this.addExpencesHeader = page.getByText('Add an expense', { exact: true });
        this.addExpenseCar = page.locator('#addExpenseCar');
        this.addExpenseDate = page.locator('#addExpenseDate');
        this.addExpenseMileage = page.locator("[formcontrolname='mileage']");
        this.addExpenseLiters = page.locator('[name="liters"]');
        this.addExpenseTotalCost = page.locator('[name="totalCost"]');
        this.closeButton = page.locator('button[class="close"]');
        this.addButton = page.locator("//button[text()='Add']");
        this.cancelButton = page.locator('button[class="btn btn-secondary"]')
        this.headerH1 = page.locator("//h1[text()='Fuel expenses']")
        this.tableLine = page.locator("//td[text()='25L']")
        this.alertMsg = page.locator('p[class="alert alert-danger"]')

        /*     }   
            async clickSignInButton() {
                await this.signInButton.click();
            }
            async clickLogInButton() {
                await this.loginButton.click();
            }
         */

    }
}