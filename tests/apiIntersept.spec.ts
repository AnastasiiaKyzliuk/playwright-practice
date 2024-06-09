import { test, expect } from "@playwright/test";
import { correctEmail,  correctPassword,  registeredEmail,  registeredPassword,} from "../../data/generateUserData";
import { SignInForm } from "../pageObjects/forms/signInForm";

let signInForm: SignInForm;

test("Profile name change via API", async ({ page }) => {
  const resp = {
    status: "ok",
    data: {
      userId: 123879,
      photoFilename: "default-user.png",
      name: "Joe",
      lastName: "BIDEN",
    }, 
  };

  await page.route("https://qauto.forstudy.space/api/users/profile", (route) => route.fulfill({
      status: 200,
      body: JSON.stringify(resp),
    })
  );

  signInForm = new SignInForm(page);
  await page.goto("/");
  await signInForm.loginWithValidCredentials( registeredEmail, registeredPassword );
  await page.locator('[routerlink="profile"]').click();
  await expect(page.locator('[class="profile_name display-4"]')).toHaveText('Joe BIDEN')
});