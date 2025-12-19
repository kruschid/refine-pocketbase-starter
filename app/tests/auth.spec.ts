import { randomUUID } from "node:crypto";
import { expect, test } from "@playwright/test";

const INBUCKET_URL = "http://127.0.0.1:9000";

test.describe("auth provider", () => {
  test("register and login", async ({ page }) => {
    const [email, password] = [`${randomUUID()}@example.com`, "1234567890"];

    // register
    await page.goto("/");
    await page.click('a[href="/register"]');
    await expect(page.getByText("Sign up for your account")).toBeVisible();
    await page.fill("[type=email]", email);
    await page.fill("[data-path=password]", password);
    await page.fill("[data-path=passwordConfirmation]", password);
    await page.click("[type=submit]");

    // log in
    await expect(page.getByText("Sign in to your account")).toBeVisible();
    await page.fill("[type=email]", email);
    await page.fill("[type=password]", password);
    await page.click("[type=submit]");
    await page.waitForURL("**/products");
  });

  test("password reset", async ({ page, request }) => {
    const mailbox = randomUUID();
    const [email, password, changedPassword] = [
      `${mailbox}@test.com`,
      "1234567890",
      "0987654321",
    ];

    // register
    await page.goto("/register");
    await page.fill("[type=email]", email);
    await page.fill("[data-path=password]", password);
    await page.fill("[data-path=passwordConfirmation]", password);
    await page.click("[type=submit]");
    await expect(page.getByText("Sign in to your account")).toBeVisible();

    // reset pw
    await page.goto("/forgot-password");  
    await page.fill("[type=email]", email);
    await page.click("[type=submit]");

    await expect(page.getByText("Password reset link sent")).toBeVisible();

    // wait for email delivery
    await page.waitForTimeout(2_000);

    // read token from email
    const resetPasswordLink = await request
      .get(`${INBUCKET_URL}/api/v1/mailbox/${mailbox}`)
      .then((res) => res.json())
      .then(([{ id }]) =>
        request.get(`${INBUCKET_URL}/api/v1/mailbox/${mailbox}/${id}`),
      )
      .then((res) => res.json())
      .then(
        (res) => res.body.text.match(/\[Reset password\]\((.+)\)/).slice(-1)[0], // extract link
      );

    // update password
    await page.goto(resetPasswordLink);
    await page.locator("[type=password]").nth(0).fill(changedPassword);
    await page.locator("[type=password]").nth(1).fill(changedPassword);
    await page.click('[type="submit"]');

    const message = page.getByText("Successfully changed the user password.");
    await expect(message).toBeVisible();
  });
});
