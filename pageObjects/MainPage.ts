import { expect, type Locator, type Page } from '@playwright/test';
import { execArgv } from 'process';

export class MainPage {
    readonly page: Page;
    readonly signUpButton: Locator;
    readonly nameField: Locator;
    readonly lastNameField: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly repasswordField: Locator;
    readonly registerButton: Locator;
    readonly signUpForm : Locator;
    readonly alertMessage: Locator;
    readonly nameIsRequired: Locator;
    readonly lastNameIsRequiredpage: Locator
    readonly emailIsRequired: Locator
    readonly passwordIsRequired: Locator
    readonly rePasswordIsRequired: Locator
    readonly Msg : Locator;
    readonly guestSignIn: Locator

    constructor(page: Page) {
        this.page = page;
        this.signUpButton = page.getByText('Sign up' , { exact: true });
        this.nameField = page.locator('#signupName');
        this.lastNameField = page.locator('#signupLastName');
        this.emailField = page.locator('#signupEmail');
        this.passwordField = page.locator('#signupPassword')
        this.repasswordField = page.locator('#signupRepeatPassword');
        this.registerButton = page.getByText('Register' , { exact: true })
        this.signUpForm = page.locator('div.modal-content');
        this.alertMessage = page.locator('p.alert.alert-danger');
        this.nameIsRequired = page.getByText('Name required');
        this.lastNameIsRequiredpage = page.getByText('Last name required');
        this.emailIsRequired =  page.getByText('Email required');
        this.passwordIsRequired = page.getByText('Password required');
        this.rePasswordIsRequired = page.getByText('Re-enter password required');
        this.Msg = page.locator('div[class="invalid-feedback"] >p');
        this.guestSignIn = page.getByText('Guest log in')
    }   

    async clickSignUpButton() {
        await this.signUpButton.click();
    }

    async clickRegisterButton() {
        await this.registerButton.click();
    }

    async signInAsGuest() {
        await this.guestSignIn.click()
    }
}