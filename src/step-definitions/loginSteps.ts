import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import ConfigurationReader from '../config/ConfigurationReader';

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();

Given('the user navigates to the login page', async function () {
  await loginPage.navigate();
});

When('the user logs in with username {string} and password {string}', async function (username: string, password: string) {
  await loginPage.login(username, password);
});

Then('the user should be redirected to the dashboard', async function () {
  const visible = await dashboardPage.isVisible();
  assert.strictEqual(visible, true, 'Dashboard page is not visible');
});

Then('the page title should be {string}', async function (expectedTitle: string) {
  const actualTitle = await loginPage.page.title();
  assert.strictEqual(actualTitle, expectedTitle, `Expected title "${expectedTitle}" but got "${actualTitle}"`);
});