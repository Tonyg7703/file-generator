import puppeteer, { type Page, type Browser } from 'puppeteer';
import UserAgent from 'user-agents';
import { ROOT_PATH } from '../settings';
import Folder from '../classes/Folder';
import JSONFile from '../classes/File';

const nextYear = new Date().getFullYear() + 1;
const detailSelectors = {
  condition: {
    none: 12,
    new: 13,
    'like-new': 14,
    excellent: 15,
    good: 16,
    fair: 17,
    salvage: 18,
  },

  auto_cylinders: {
    none: 19,
    3: 20,
    4: 21,
    5: 22,
    6: 23,
    8: 24,
    10: 25,
    12: 26,
    other: 27,
  },

  auto_drivetrain: {
    none: 28,
    fwd: 29,
    rwd: 30,
    '4wd': 31,
    awd: 31,
  },

  auto_fuel_type: {
    none: 32,
    gas: 33,
    diesel: 34,
    hybrid: 35,
    electric: 36,
    other: 37,
  },

  auto_paint: {
    none: 60,
    black: 61,
    blue: 62,
    brown: 63,
    green: 64,
    grey: 65,
    orange: 66,
    purple: 67,
    red: 68,
    silver: 69,
    white: 70,
    yellow: 71,
    custom: 72,
  },

  auto_title_status: {
    isRequired: true,
    none: 73,
    clean: 74,
    salvage: 75,
    rebuilt: 76,
    'parts-only': 77,
    lien: 78,
    missing: 79,
  },

  auto_transmission: {
    none: 221,
    manual: 222,
    automatic: 223,
    other: 224,
  },

  auto_bodytype: {
    none: 80,
    bus: 81,
    convertible: 82,
    coupe: 83,
    hatchback: 84,
    'mini-van': 85,
    offroad: 86,
    pickup: 87,
    sedan: 88,
    truck: 89,
    suv: 90,
    wagon: 91,
    van: 92,
    other: 93,
  },
  year: Array.from({ length: nextYear - 1900 + 1 }, (_, i) => {
    return { [nextYear - i]: 95 + i };
  }).reduce((acc, curr, i) => {
    if (i === 0) return { ...acc, ...curr, none: 94 };
    return { ...acc, ...curr };
  }, {}),
};

type Cookie = { id: 'cookie'; cookie: string };
type DetailSelector = keyof typeof detailSelectors;
type DetailOption<T extends DetailSelector> = keyof (typeof detailSelectors)[T];

type WaitOptions = {
  timeout?: number;
  tryCount?: number;
  maxTry?: number;
  visible?: boolean;
};

export default class CraigslistClient {
  private CLASSNAME = 'CraigslistClient';
  private browser?: Browser;
  private page?: Page;
  private userAgent: string;
  private cookieFile: JSONFile<Cookie>;
  private headers = {
    accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'accept-language': 'en-US,en;q=0.9',
    'cache-control': 'no-cache',
    pragma: 'no-cache',
    'sec-ch-ua':
      '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'none',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': '1',
    cookie: '',
  };

  constructor() {
    this.userAgent = new UserAgent().toString();

    this.cookieFile = new Folder({
      name: 'db',
      route: ROOT_PATH,
    })
      .newFolder('craigslist')
      .newFile<Cookie>({
        name: 'cookie',
        data: [{ id: 'cookie', cookie: '' }],
      });

    this.headers.cookie = this.cookie;

    // this.path = new Path({
    //   dirname: 'main',
    //   route: 'db',
    //   folders: ['craigslist'],
    //   files: [{ route: 'db/craigslist', name: 'cookie', format: 'json' }],
    // });
  }

  private get cookie() {
    const cookie = this.cookieFile.data.find(
      (file) => file.id === 'cookie'
    )?.cookie;
    if (!cookie) return '';
    return cookie;
  }

  private set cookie(cookie: Cookie['cookie']) {
    this.cookieFile.updateOne({ id: 'cookie', cookie: cookie });
    this.headers.cookie = cookie;
  }

  public async run() {
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

  private async setUserAgent() {
    await this.page!.setUserAgent(this.userAgent);
  }

  private async setHeaders() {
    this.headers.cookie = this.cookie;
    await this.page!.setExtraHTTPHeaders(this.headers);
  }

  async close(delay: number = 0) {
    await this.delay(delay);
    await this.browser!.close();
  }

  public async goto(url: string) {
    await this.page!.goto(url);
  }

  public async gotoPage(pageName: 'account') {
    const pages = {
      account: 'https://accounts.craigslist.org/login/home',
    };
    await this.page!.goto(pages[pageName]);
  }

  // check the url of the page after page loads
  // this waitForNavigation take a long time and it times out,
  // so we need to find a better method to check the url

  public async waitForPageLoad() {
    // wait for domcontentloaded
    // await this.page!.waitForNavigation({ waitUntil: 'networkidle2' });
    await this.page!.waitForNetworkIdle();
    await this.delay(1000);
  }

  public async urlIncludes(text: string) {
    return this.page!.url().includes(text);
  }

  public async loadCookie() {
    // const cookie = this.path.fetchFile('')
  }

  public async getCookies() {
    return this.page!.cookies();
  }

  public async setCookies() {
    const cookieString = await this.getCookieString();
    this.cookie = cookieString;
  }

  public async getCookieString() {
    const cookies = await this.getCookies();
    return cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join('; ');
  }

  public async waitForSelector(
    selector: string,
    {
      maxTry = 3,
      timeout = 30000,
      tryCount = 1,
      visible = false,
    }: WaitOptions = {}
  ) {
    console.log(`waiting for selector: ${selector}`);
    try {
      await this.page!.waitForSelector(selector, { timeout, visible });
      console.log(`selector found!`);
    } catch (error) {
      if (tryCount === maxTry) {
        throw new Error(
          `${this.CLASSNAME} ERROR: waitForSelector | selector:${selector} | message: ${error}`
        );
      }
      console.log(`selector not found. tryCount: ${tryCount}`);
      await this.waitForSelector(selector, {
        maxTry,
        timeout,
        tryCount: tryCount + 1,
      });
    }
  }

  public async typeInput(selector: string, input?: string | number) {
    await this.waitForSelector(selector);
    const inputElement = await this.page!.$(selector);
    if (!inputElement) {
      return this.error('TypeInput', selector, 'Input not found');
    }

    await this.page!.$eval(
      selector,
      (input) => ((input as HTMLInputElement).value = '')
    );

    await inputElement.type(`${input}`);
  }

  public async click(selector: string, options?: WaitOptions) {
    await this.waitForSelector(selector, options);
    const btn = await this.page!.$(selector);
    if (!btn) return this.error('Click', selector, 'Button not found');
    await btn.click();
  }

  public async select(selector: string, value: string) {
    await this.waitForSelector(selector);
    await this.page!.$eval(
      selector,
      (select, value) => {
        const element = select as HTMLSelectElement;
        element.value = value;
      },
      value
    );

    // await this.page!.select(selector, value);
  }

  public async selectDetailOption<T extends DetailSelector>(
    selector: T,
    option: DetailOption<T>
  ) {
    await this.click(`select[name="${selector}"] + span`);
    await this.delay(1000);
    await this.click(`#ui-id-${detailSelectors[selector][option]}`);
    await this.delay(1000);
  }

  public async delay(time: number) {
    await new Promise((resolve) => setTimeout(resolve, time));
  }

  public async submitForm(selector: string) {
    await this.waitForSelector(selector);
    await this.page!.$eval(selector, (form) =>
      (form as HTMLFormElement).submit()
    );
  }

  private error(method: string, selector: string, message: string) {
    throw new Error(
      `${this.CLASSNAME} ERROR: method:${method} | selector:${selector} | message:${message}`
    );
  }
}
