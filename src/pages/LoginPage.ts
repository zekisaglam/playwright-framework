import BasePage from './BasePage';
import ConfigurationReader from '../config/ConfigurationReader';
import Logger from '../utils/Logger';

export default class LoginPage extends BasePage {
  private usernameInput = '#username';
  private passwordInput = '#password';
  private loginButton = '[data-testid="login-button"]';

  /** Navigate to the login page */
  async navigate(): Promise<void> {
    const baseUrl = ConfigurationReader.getInstance().get('baseUrl');
    if (!baseUrl) {
      throw new Error('baseUrl not configured');
    }
    const loginUrl = `${baseUrl.replace(/\/+$/, '')}/login`;
    Logger.info(`Navigating to ${loginUrl}`);
    await this.page.goto(loginUrl);
  }

  /** Perform login with credentials */
  async login(username: string, password: string): Promise<void> {
    Logger.info(`Logging in as ${username}`);
    await this.type(this.usernameInput, username);
    await this.type(this.passwordInput, password);
    await this.click(this.loginButton);
  }
}