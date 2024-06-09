import { test, expect } from '@playwright/test';
import { MainPage } from "../pageObjects/MainPage"
import { GaragePage } from '../pageObjects/GaragePage';

let mainPage: MainPage
let garagePage: GaragePage

test.describe('Session Storage change ', () => {
    test('Verify session storage change', async ({ page }) => {
        await page.goto('/')
        mainPage = new MainPage(page)
        const data = {
            "expenses": [],
            "cars": [
                {
                    "id": 1,
                    "brand": "Audi",
                    "model": "TT",
                    "logo": "audi.png",
                    "initialMileage": 400,
                    "updatedMileageAt": "2024-05-17T17:43:49.958Z",
                    "carCreatedAt": "2024-05-17T17:43:49.958Z",
                    "carBrandId": 1,
                    "carModelId": 1,
                    "mileage": 400
                }
            ],
            "nextCarId": 2,
            "nextExpenseId": 1
        }
        await page.evaluate((object) => {
        window.sessionStorage.setItem('guestData', JSON.stringify(object))
        }, data)
        await mainPage.signInAsGuest()
        await expect(page.locator('.car_name')).toHaveText('Audi TT');
    })
})

test.describe('Session Storage tests in guest mode ', () => {
 test.beforeEach('Login with valid credentials', async ({ page }) => {
        await page.goto('/')
        mainPage = new MainPage(page)
        await mainPage.signInAsGuest()
    })
    test('Verify the Storage session is empty by default', async ({ page }) => {
        const data = await page.evaluate(() => window.sessionStorage.getItem('guestData')) ?? ''
        const parsedObject = JSON.parse(data)
        expect(parsedObject.cars).toHaveLength(0)
        expect(parsedObject.expenses).toHaveLength(0)
    })

    test('Verify car brand and model in Session Storage after car adding', async ({ page }) => {
        garagePage = new GaragePage(page)
        await garagePage.clickAddCarButton()
        await (1000)
        await garagePage.mileageField.fill('10')
        await garagePage.clickAddButton()
        await expect(garagePage.firstCarName).toBeVisible()
        const data = await page.evaluate(() => window.sessionStorage.getItem('guestData')) ?? ''
        const parsedObject = JSON.parse(data)
        const firstCar = parsedObject.cars[0]
        expect(firstCar.brand).toBe('Audi')
        expect(firstCar.model).toBe('TT')
        expect(firstCar.logo).toBe('audi.png')
    })

    test('Verify the Storage session is empty after car removal', async ({ page }) => {
        garagePage = new GaragePage(page)
        await garagePage.clickAddCarButton()
        await (1000)
        await garagePage.mileageField.fill('10')
        await garagePage.clickAddButton()
        await expect(garagePage.firstCarName).toBeVisible()
        await garagePage.removeLastCar()
        const data = await page.evaluate(() => window.sessionStorage.getItem('guestData')) ?? ''
        const parsedObject = JSON.parse(data)
        expect(parsedObject.cars).toHaveLength(0)
        expect(parsedObject.expenses).toHaveLength(0)
    })
})