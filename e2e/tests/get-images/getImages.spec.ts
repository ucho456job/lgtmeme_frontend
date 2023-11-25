import { driver } from "../../jest.setup";
import { homeUrl, takeSnapshot, waitTime } from "../../utils";
import { prepareData } from "./getImages.data";
import * as path from "path";
import { By, Key } from "selenium-webdriver";

const currentDirectory = path.dirname(__filename);
const screenshotsPath = currentDirectory + "/screenshots";

describe("Get images", () => {
  test("case1: The maximum number of images to be acquired initially is 9.", async () => {
    await prepareData.case1();
    await driver.get(homeUrl);
    const images = await driver.findElements(By.xpath("//img"));
    expect(images.length).toBe(9);
    await takeSnapshot(driver, `${screenshotsPath}/case1/after.png`);
  });
  test("case2: Click the See More button to get 9 additional images.", async () => {
    await prepareData.case2();
    await driver.get(homeUrl);
    const beforeImages = await driver.findElements(By.xpath("//img"));
    expect(beforeImages.length).toBe(9);
    await takeSnapshot(driver, `${screenshotsPath}/case2/before.png`);

    await driver.findElement(By.xpath("//button[text()='See more']")).click();
    await driver.wait(async () => {
      const images = await driver.findElements(By.xpath("//img"));
      return images.length === 18;
    }, waitTime);

    const images = await driver.findElements(By.xpath("//img"));
    expect(images.length).toBe(18);
    await takeSnapshot(driver, `${screenshotsPath}/case2/after.png`);
  });
  test("case3: Possible to narrow down search by keyword.", async () => {
    await prepareData.case3();
    await driver.get(homeUrl);
    const beforeImages = await driver.findElements(By.xpath("//img"));
    expect(beforeImages.length).toBe(2);
    await takeSnapshot(driver, `${screenshotsPath}/case3/before.png`);

    const textbox = await driver.findElement(By.xpath("//input"));
    await textbox.sendKeys("thanks", Key.ENTER);
    await driver.wait(async () => {
      const images = await driver.findElements(By.xpath("//img"));
      return images.length === 1;
    }, waitTime);

    const afterImages = await driver.findElements(By.xpath("//img"));
    expect(afterImages.length).toBe(1);
    await takeSnapshot(driver, `${screenshotsPath}/case3/after.png`);
  });
  test("case4: Click on the popular tab to display in order of popularity.", async () => {
    /** Prerequisites */
    /** 300x300.png is a recently created unpopular image. */
    const newAndUnpopularImage = "300x300.png";
    /** 200x200.png is a popular image created in the past. */
    const oldAndPopularImage = "200x200.png";
    await prepareData.case4();
    await driver.get(homeUrl);

    /** Initially displayed in order of latest. */
    const timeLineImages = await driver.findElements(By.xpath("//img"));
    const timeLineImageSources: string[] = [];
    for (let i of timeLineImages) {
      const src = await i.getAttribute("src");
      timeLineImageSources.push(src);
    }
    expect(timeLineImageSources[0]).toContain(newAndUnpopularImage);
    expect(timeLineImageSources[1]).toContain(oldAndPopularImage);
    await takeSnapshot(driver, `${screenshotsPath}/case4/before.png`);

    /** Click on the popular tab to display in order of popularity. */
    await driver.findElement(By.xpath("//div[text()='Popular']")).click();
    await driver.wait(async () => {
      const images = await driver.findElements(By.xpath("//img"));
      return images.length === 2;
    }, waitTime);
    const popularImages = await driver.findElements(By.xpath("//img"));
    const popularImageSources: string[] = [];
    for (let i of popularImages) {
      const src = await i.getAttribute("src");
      popularImageSources.push(src);
    }
    expect(popularImageSources[0]).toContain(oldAndPopularImage);
    expect(popularImageSources[1]).toContain(newAndUnpopularImage);
    await takeSnapshot(driver, `${screenshotsPath}/case4/after.png`);
  });
  test("case5: Can be added to favorites.", async () => {
    await prepareData.case5_6_7();
    await driver.get(homeUrl);

    /** Make sure there are no images before adding to favorites. */
    await driver.findElement(By.xpath("//div[text()='Favorite']")).click();
    await driver.wait(async () => {
      const images = await driver.findElements(By.xpath("//img"));
      return images.length === 0;
    }, waitTime);
    const beforeImages = await driver.findElements(By.xpath("//img"));
    expect(beforeImages.length).toBe(0);
    await takeSnapshot(driver, `${screenshotsPath}/case5/before.png`);

    /** Add image to favorites. */
    await driver.findElement(By.xpath("//div[text()='Time line']")).click();
    await driver.wait(async () => {
      const images = await driver.findElements(By.xpath("//img"));
      return images.length === 1;
    }, waitTime);
    await driver.findElement(By.xpath("//button[text()='Favorite']")).click();

    /** Make sure the image is added to favorites. */
    await driver.findElement(By.xpath("//div[text()='Favorite']")).click();
    await driver.wait(async () => {
      const images = await driver.findElements(By.xpath("//img"));
      return images.length === 1;
    }, waitTime);
    const afterImages = await driver.findElements(By.xpath("//img"));
    expect(afterImages.length).toBe(1);
    await takeSnapshot(driver, `${screenshotsPath}/case5/after.png`);
  });
  test("case6: Can be copied to clipboard.", async () => {
    /** The contents of the clipboard cannot be viewed as it is restricted by the browser's security policy. */
    await prepareData.case5_6_7();
    await driver.get(homeUrl);
    await takeSnapshot(driver, `${screenshotsPath}/case6/before.png`);

    await driver.findElement(By.xpath("//button[text()='Copy']")).click();
    await driver.wait(async () => {
      const dialog = await driver.findElements(By.xpath("//p[text()='Copied to clipboard!']"));
      return dialog.length === 1;
    }, waitTime);

    const dialog = await driver.findElements(By.xpath("//p[text()='Copied to clipboard!']"));
    expect(dialog.length).toBe(1);
    await takeSnapshot(driver, `${screenshotsPath}/case6/after.png`);
  });
  test("case7: Can report invalid image.", async () => {
    await prepareData.case5_6_7();
    await driver.get(homeUrl);
    await takeSnapshot(driver, `${screenshotsPath}/case7/before.png`);

    await driver.findElement(By.xpath("//button[text()='Report']")).click();
    await driver.findElement(By.xpath("//button[text()='Send']")).click();
    await driver.wait(async () => {
      const dialog = await driver.findElements(
        By.xpath(
          "//p[text()='The report was successful! Please wait a moment for the operator to confirm.']",
        ),
      );
      return dialog.length === 1;
    }, waitTime);
    await driver.navigate().refresh();

    /** The report button will be hidden to avoid duplicate reports. */
    const reportButton = await driver.findElements(By.xpath("//button[text()='Report']"));
    expect(reportButton.length).toBe(0);
    await takeSnapshot(driver, `${screenshotsPath}/case7/after.png`);
  });
  test("case8: Transition to create-image page.", async () => {
    await driver.get(homeUrl);
    await takeSnapshot(driver, `${screenshotsPath}/case8/before.png`);

    await driver.findElement(By.xpath("//button[text()='Create image']")).click();
    await driver.wait(async () => {
      const createImagePageElement = await driver.findElements(
        By.xpath("//button[text()='Create LGTM image']"),
      );
      return createImagePageElement.length === 1;
    }, waitTime);

    const createImagePageElement = await driver.findElements(
      By.xpath("//button[text()='Create LGTM image']"),
    );
    expect(createImagePageElement.length).toBe(1);
    await takeSnapshot(driver, `${screenshotsPath}/case8/after.png`);
  });
});
