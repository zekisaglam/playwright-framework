import BasePage from './BasePage';
import Logger from '../utils/Logger';

export default class DashboardPage extends BasePage {
  private header = 'h1[data-testid="dashboard-header"]';

  /** Verify that the dashboard page is displayed */
  async isVisible(): Promise<boolean> {
    Logger.info('Checking dashboard visibility');
    return await this.isDisplayed(this.header);
  }

  /** Example action on dashboard */
  async clickHeader(): Promise<void> {
    Logger.info('Clicking dashboard header');
    await this.click(this.header);
  }
}