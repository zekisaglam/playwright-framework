import { Page, Locator } from 'playwright';
import Driver from '../utils/Driver';
import Logger from '../utils/Logger';

/**
 * BasePage provides reusable actions for all page objects.
 * It follows the Singleton Driver pattern to use a single browser/page instance.
 */
export default abstract class BasePage {
  protected page: Page;

  constructor() {
    this.page = Driver.getInstance().getPage();
  }

  /**
   * Returns a Locator for the given selector.
   * @param selector Playwright selector string
   */
  protected el(selector: string): Locator {
    return this.page.locator(selector);
  }

  /** Clicks an element */
  async click(selector: string, options = {}): Promise<void> {
    Logger.info(`Clicking element: ${selector}`);
    await this.el(selector).click(options);
  }

  /** Types text into an input field */
  async type(selector: string, text: string, options = {}): Promise<void> {
    Logger.info(`Typing into ${selector}: ${text}`);
    await this.el(selector).fill(''); // clear first
    await this.el(selector).type(text, options);
  }

  /** Clears an input field */
  async clear(selector: string): Promise<void> {
    Logger.info(`Clearing element: ${selector}`);
    await this.el(selector).fill('');
  }

  /** Hover over an element */
  async hover(selector: string): Promise<void> {
    Logger.info(`Hovering over ${selector}`);
    await this.el(selector).hover();
  }

  /** Scroll element into view */
  async scrollIntoView(selector: string): Promise<void> {
    Logger.info(`Scrolling into view: ${selector}`);
    await this.el(selector).scrollIntoViewIfNeeded();
  }

  /** Wait for element to be visible */
  async waitForVisible(selector: string, timeout?: number): Promise<void> {
    Logger.info(`Waiting for visibility: ${selector}`);
    await this.el(selector).waitFor({ state: 'visible', timeout });
  }

  /** Wait for element to be hidden */
  async waitForHidden(selector: string, timeout?: number): Promise<void> {
    Logger.info(`Waiting for hidden: ${selector}`);
    await this.el(selector).waitFor({ state: 'hidden', timeout });
  }

  /** Wait for element to be enabled / clickable */
  async waitForClickable(selector: string, timeout?: number): Promise<void> {
    Logger.info(`Waiting for clickable: ${selector}`);
    await this.el(selector).waitFor({ state: 'visible', timeout });
    // Playwright does not have explicit clickable state; visible is sufficient.
  }

  /** Get text content of element */
  async getText(selector: string): Promise<string> {
    Logger.info(`Getting text from ${selector}`);
    return await this.el(selector).innerText();
  }

  /** Check if element is displayed */
  async isDisplayed(selector: string): Promise<boolean> {
    Logger.info(`Checking display status of ${selector}`);
    return await this.el(selector).isVisible();
  }

  /** Select option from a <select> element */
  async selectDropdown(selector: string, optionValue: string): Promise<void> {
    Logger.info(`Selecting dropdown ${selector} value ${optionValue}`);
    await this.el(selector).selectOption({ value: optionValue });
  }

  /** Upload file(s) to an <input type="file"> */
  async uploadFile(selector: string, filePath: string | string[]): Promise<void> {
    Logger.info(`Uploading file(s) to ${selector}`);
    await this.el(selector).setInputFiles(filePath);
  }

  /** Drag and drop element */
  async dragAndDrop(sourceSelector: string, targetSelector: string): Promise<void> {
    Logger.info(`Dragging ${sourceSelector} to ${targetSelector}`);
    const source = this.el(sourceSelector);
    const target = this.el(targetSelector);
    await source.dragTo(target);
  }

  /** Take screenshot of the current page or specific element */
  async takeScreenshot(path: string, selector?: string): Promise<void> {
    if (selector) {
      Logger.info(`Taking screenshot of element ${selector} to ${path}`);
      await this.el(selector).screenshot({ path });
    } else {
      Logger.info(`Taking full page screenshot to ${path}`);
      await this.page.screenshot({ path, fullPage: true });
    }
  }
}