import { Browser, BrowserContext, Page, chromium, firefox, webkit, LaunchOptions } from 'playwright';
import ConfigurationReader from '../config/ConfigurationReader';

class Driver {
  private static instance: Driver;
  private browser?: Browser;
  private context?: BrowserContext;
  private page?: Page;

  private constructor() {}

  public static getInstance(): Driver {
    if (!Driver.instance) {
      Driver.instance = new Driver();
    }
    return Driver.instance;
  }

  public async init(): Promise<void> {
    const config = ConfigurationReader.getInstance();
    const browserName = (config.get('browser') ?? 'chromium').toLowerCase();
    const headless = (config.get('headless') ?? 'true').toLowerCase() === 'true';
    const slowMo = Number(config.get('slowMo') ?? '0');
    const timeout = Number(config.get('timeout') ?? '30000');

    const launchOpts: LaunchOptions = { headless, slowMo, timeout };

    switch (browserName) {
      case 'firefox':
        this.browser = await firefox.launch(launchOpts);
        break;
      case 'webkit':
        this.browser = await webkit.launch(launchOpts);
        break;
      default:
        this.browser = await chromium.launch(launchOpts);
        break;
    }

    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  public getPage(): Page {
    if (!this.page) {
      throw new Error('Driver not initialized. Call init() first.');
    }
    return this.page;
  }

  public async close(): Promise<void> {
    await this.page?.close();
    await this.context?.close();
    await this.browser?.close();
  }
}

export default Driver;