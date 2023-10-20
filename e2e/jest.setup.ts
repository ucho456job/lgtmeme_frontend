import { Builder, WebDriver } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";

let driver: WebDriver;

beforeAll(async () => {
  const chromeOptions = new Options().addArguments("--no-sandbox").addArguments("--disable-gpu");

  driver = await new Builder()
    .forBrowser("chrome")
    .usingServer("http://localhost:4444/wd/hub")
    .setChromeOptions(chromeOptions)
    .build();
});

afterAll(async () => {
  await driver.quit();
});

export { driver };
