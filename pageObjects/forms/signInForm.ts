import { expect, type Locator, type Page } from '@playwright/test';

export class SignInForm {
    readonly page: Page;
    readonly signInButton: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;
    readonly forgotPassword: Locator;
    readonly rememberCheck: Locator;
    readonly registrationButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signInButton = page.getByText('Sign In', { exact: true });
        this.emailField = page.locator('#signinEmail')
        this.passwordField = page.locator('#signinPassword')
        this.loginButton = page.getByText('Login', { exact: true });
        this.forgotPassword = page.getByText('Forgot password', { exact: true });
        this.rememberCheck = page.locator('#remember')
        this.registrationButton = page.getByText('Registration', { exact: true });

    }
    async clickSignInButton() {
        await this.signInButton.click();
    }
    async clickLogInButton() {
        await this.loginButton.click();
    }

    async loginWithValidCredentials(email, password) {
        await this.signInButton.click()
        await this.emailField.fill(email)

        await this.passwordField.fill(password)
        await this.loginButton.click();
    }
}