import { BASE_URL } from "../constants";
import { driver } from "../jest.setup";
import { prepareData } from "./list-images.data";
import { By, Key } from "selenium-webdriver";

describe("List images", () => {
  test("case 1: The maximum number of images to be acquired initially is 9.", async () => {
    await prepareData.case1();
    await driver.get(BASE_URL);
    const images = await driver.findElements(By.xpath("//img"));
    expect(images.length).toBe(9);
  });
  test("case 2: Click the See More button to get 9 additional images.", async () => {
    await prepareData.case2();
    await driver.get(BASE_URL);
    await driver.findElement(By.xpath("//button[text()='See more']")).click();
    await driver.sleep(3000);
    const images = await driver.findElements(By.xpath("//img"));
    expect(images.length).toBe(18);
  });
  test("case 3: Ability to search by keyword.", async () => {
    await prepareData.case3();
    await driver.get(BASE_URL);
    const beforeImages = await driver.findElements(By.xpath("//img"));
    expect(beforeImages.length).toBe(2);
    const textbox = await driver.findElement(By.xpath("//input"));
    await textbox.sendKeys("thanks", Key.ENTER);
    await driver.sleep(3000);
    const afterImages = await driver.findElements(By.xpath("//img"));
    expect(afterImages.length).toBe(1);
  });
});
