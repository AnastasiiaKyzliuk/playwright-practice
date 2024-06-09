import { expect, type Locator, type Page } from '@playwright/test';
import { SignInForm } from './forms/signInForm';
import { correctEmail, correctPassword } from '../data/generateUserData';
import { sign } from 'crypto';


export class GaragePage {
    readonly page: Page;
    readonly addCarButton: Locator;
    readonly brandDropdown: Locator;
    readonly modelDropdown: Locator;
    readonly mileageField: Locator;
    readonly addButton: Locator;
    readonly firstCarName: Locator;
    readonly editCarIcon: Locator;
    readonly removeCarButton: Locator;
    readonly acceptCarRemovingButton: Locator;
    readonly mileageInput: Locator;
    readonly updateButton: Locator;
    readonly addFuelButton: Locator;
    readonly garageLink: Locator

    constructor(page: Page) {
        this.page = page;
        this.addCarButton = page.getByText('Add car');
        this.brandDropdown = page.locator('#addCarBrand');
        this.modelDropdown = page.locator('#addCarModel');
        this.mileageField = page.locator('#addCarMileage');
        this.addButton = page.getByText('Add', { exact: true });
        this.firstCarName = page.locator('.car_name').first();
        this.editCarIcon = page.locator('.icon-edit').first();
        this.removeCarButton = page.locator('.btn-outline-danger');
        this.acceptCarRemovingButton = page.locator('.btn-danger');
        this.mileageInput = page.locator('[formcontrolname="miles"]')
        this.updateButton = page.locator('button[type="submit"]')
        this.addFuelButton = page.getByRole('button', { name: 'Add fuel expense' }).first()
        this.garageLink = page.locator('[routerlink="garage"]')
    }

        async open() {
        await this.page.goto('/panel/garage')
    }

    async openAsLoggedUser (email: string, password: string){
        const signInForm = new SignInForm(this.page)
        await signInForm.open()
        await signInForm.loginWithValidCredentials(email, password)
        await expect(this.page.locator('h1')).toHaveText('Garage')
    }
    async clickAddButton() {
        await this.addButton.click();
    }
    async clickAddCarButton() {
        await this.addCarButton.click();
    }
    async clickAddFuelButton(){
        await this.addFuelButton.click()
    }
    async selectBrand(brand: string) {
        await this.brandDropdown.selectOption({ label: brand });
    }
    async selectModel(model: string) {
        await this.page.waitForTimeout(1000);
        await this.modelDropdown.selectOption({ label: model });
    }
    async enterMileage(mileage: string) {
        await this.mileageField.fill(mileage);
    }
    async getFirstCarName() {
        return this.firstCarName;
    }

    async removeLastCar() {
        const carNumberBefore = await this.page.locator('.icon-edit').count()
        await this.editCarIcon.click()
        await this.removeCarButton.click()
        await this.acceptCarRemovingButton.click()  
    }
}