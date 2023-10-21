import * as fs from "fs";
import * as path from "path";
import { WebDriver } from "selenium-webdriver";

export const takeSnapshot = async (driver: WebDriver, relativeFilepath: string) => {
  const absoluteFilepath = path.resolve(relativeFilepath);
  const directory = path.dirname(absoluteFilepath);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  const pageHeight = (await driver.executeScript("return document.body.scrollHeight")) as number;
  await driver.manage().window().setRect({
    width: 1100,
    height: pageHeight,
  });

  await driver.takeScreenshot().then(function (image: string) {
    fs.writeFile(absoluteFilepath, image, "base64", function (error: NodeJS.ErrnoException | null) {
      if (error) {
        console.log(error);
      }
    });
  });
};
