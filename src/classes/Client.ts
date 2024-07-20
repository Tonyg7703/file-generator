import puppeteer, { type Browser, type Page } from 'puppeteer';

export default class Client {
  private browser?: Browser;
  private page?: Page;

  public async openBrowser() {
    const windowPositionX = -1280; // X coordinate for the second monitor
    const windowPositionY = 0; // Y coordinate for the second monitor
    const windowWidth = 1280; // Width of the browser window
    const windowHeight = 720; // Height of the browser window

    this.browser = await puppeteer.launch({
      headless: false,
      args: [
        `--window-position=${windowPositionX},${windowPositionY}`,
        `--window-size=${windowWidth},${windowHeight}`,
      ],
    });
    this.page = await this.browser.newPage();
    await this.setUserAgent();
    await this.setHeaders();
  }
}
