// import puppeteer, { type Page, type Browser } from 'puppeteer';
// import UserAgent from 'user-agents';
// import Path from '../classes/Paths';

// export default class CraigslistClient {
//   private CLASSNAME = 'CraigslistClient';
//   private browser?: Browser;
//   private page?: Page;
//   private userAgent: string;
//   private path: Path;
//   private headers = {
//     accept:
//       'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
//     'accept-language': 'en-US,en;q=0.9',
//     'cache-control': 'no-cache',
//     pragma: 'no-cache',
//     'sec-ch-ua':
//       '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
//     'sec-ch-ua-mobile': '?0',
//     'sec-ch-ua-platform': '"Windows"',
//     'sec-fetch-dest': 'document',
//     'sec-fetch-mode': 'navigate',
//     'sec-fetch-site': 'none',
//     'sec-fetch-user': '?1',
//     'upgrade-insecure-requests': '1',
//     cookie: '',
//   };

//   constructor() {
//     this.userAgent = new UserAgent().toString();
//     this.path = new Path({
//       dirname: 'main',
//       route: 'db',
//       folders: ['craigslist'],
//       files: [{ route: 'db/craigslist', name: 'cookie', format: 'json' }],
//     });
//   }

//   public async run() {
//     const windowPositionX = -1280; // X coordinate for the second monitor
//     const windowPositionY = 0; // Y coordinate for the second monitor
//     const windowWidth = 1280; // Width of the browser window
//     const windowHeight = 720; // Height of the browser window

//     this.browser = await puppeteer.launch({
//       headless: false,
//       args: [
//         `--window-position=${windowPositionX},${windowPositionY}`,
//         `--window-size=${windowWidth},${windowHeight}`,
//       ],
//     });
//     this.page = await this.browser.newPage();
//     await this.setUserAgent();
//     await this.setHeaders();
//   }

//   private async setUserAgent() {
//     await this.page!.setUserAgent(this.userAgent);
//   }

//   private async setHeaders() {
//     await this.page!.setExtraHTTPHeaders(this.headers);
//   }

//   async close(delay: number = 0) {
//     await this.delay(delay);
//     await this.browser!.close();
//   }

//   public async goto(url: string) {
//     await this.page!.goto(url);
//   }

//   public async gotoPage(pageName: 'account') {
//     const pages = {
//       account: 'https://accounts.craigslist.org/login/home',
//     };
//     await this.page!.goto(pages[pageName]);
//   }

//   // check the url of the page after page loads
//   // this waitForNavigation take a long time and it times out,
//   // so we need to find a better method to check the url

//   public async waitForPageLoad() {
//     await this.page!.waitForNetworkIdle();
//   }

//   public async urlIncludes(text: string) {
//     return this.page!.url().includes(text);
//   }

//   public async loadCookie() {
//     // const cookie = this.path.fetchFile('')
//   }

//   public async getCookies() {
//     return this.page!.cookies();
//   }

//   public async getCookieString() {
//     const cookies = await this.getCookies();
//     return cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join('; ');
//   }

//   public async typeInput(selector: string, input: string) {
//     await this.page!.waitForSelector(selector);
//     const inputElement = await this.page!.$(selector);
//     if (!inputElement)
//       return this.error('TypeInput', selector, 'Input not found');
//     await this.page!.$eval(
//       selector,
//       (input) => ((input as HTMLInputElement).value = '')
//     );

//     await inputElement.type(input);
//   }

//   public async click(selector: string) {
//     await this.page!.waitForSelector(selector);
//     const btn = await this.page!.$(selector);
//     if (!btn) return this.error('Click', selector, 'Button not found');
//     await btn.click();
//   }

//   public async delay(time: number) {
//     await new Promise((resolve) => setTimeout(resolve, time));
//   }

//   private error(method: string, selector: string, message: string) {
//     throw new Error(
//       `${this.CLASSNAME} ERROR: method:${method} | selector:${selector} | message:${message}`
//     );
//   }
// }
