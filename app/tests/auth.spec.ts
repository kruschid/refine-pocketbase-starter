import { test } from "@playwright/test";
import { randomUUID } from "crypto";

const INBUCKET_URL = "http://127.0.0.1:9000";

test.describe("auth provider", () => {
  test("register and login", async ({ page }) => {
    const [email, password] = [`${randomUUID()}@example.com`, "1234567890"];

    // register
    await page.goto("/");
    await page.click('a[href="/register"]');
    await page.fill("#email-input", email);
    await page.fill("#password-input", password);
    await page.click("[type=submit]");

    // log in
    await page.waitForURL("**/login**");
    await page.fill("#email-input", email);
    await page.fill("#password-input", password);
    await page.click("[type=submit]");
    await page.waitForURL("**/orgs");
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
    await page.fill("#email-input", email);
    await page.fill("#password-input", password);
    await page.click("[type=submit]");

    // reset pw
    await page.waitForURL("**/login**");
    await page.click("a[href='/forgot-password']");
    await page.fill("#email-input", email);
    await page.click("[type=submit]");

    // wait for email delivery
    await page.waitForTimeout(2000);

    // read token from email
    const token = await request
      .get(`${INBUCKET_URL}/api/v1/mailbox/${mailbox}`)
      .then((res) => res.json())
      .then(([{ id }]) =>
        request.get(`${INBUCKET_URL}/api/v1/mailbox/${mailbox}/${id}`)
      )
      .then((res) => res.json())
      .then(
        (res) =>
          res.body.text
            .match(/\[Reset password\]\((.+)\)/)
            .slice(-1)[0] // extract link
            .split("/")
            .slice(-1) // extract token
      );

    // update password
    await page.goto(`/update-password?token=${token}`);
    await page.fill("#password-input", changedPassword);
    await page.fill("#confirm-password-input", changedPassword);
    await page.click('[type="submit"]');

    // login to confirm new pw
    await page.waitForURL("**/login**");
    await page.fill("#email-input", email);
    await page.fill("#password-input", changedPassword);
    await page.click("[type=submit]");
    await page.waitForURL("**/orgs");
  });
});
