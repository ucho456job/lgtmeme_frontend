import prisma from "./prisma";
import { Builder, WebDriver } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";

let driver: WebDriver;

beforeAll(async () => {
  await prisma.$connect();
  const chromeOptions = new Options().addArguments("--no-sandbox").addArguments("--disable-gpu");

  driver = await new Builder()
    .forBrowser("chrome")
    .usingServer("http://localhost:4444/wd/hub")
    .setChromeOptions(chromeOptions)
    .build();
});

beforeEach(async () => {
  await prisma.image.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
  await driver.quit();
});

export { driver };
