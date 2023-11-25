/** @jest-environment node */
import { generateRandomUuid, generateStaticUUID, isUuid } from "./uuid";

describe("uuid", () => {
  describe("isUuid", () => {
    test("Return true, when the argument is uuid.", () => {
      const result = isUuid("060eeba4-32b8-49be-a8b0-85f77e4648fc");
      expect(result).toBe(true);
    });
    test("Return false, when the argument isn't uuid.", () => {
      const result = isUuid("1");
      expect(result).toBe(false);
    });
  });
  describe("generateRandomUuid", () => {
    test("Return random uuid, when use generateRandomUuid.", () => {
      const result_1 = generateRandomUuid();
      const result_2 = generateRandomUuid();
      expect(result_1).not.toBe(result_2);
    });
  });
  describe("generateStaticUUID", () => {
    test("Return same uuid, when the arguments are the same.", () => {
      const result_1 = generateStaticUUID(1);
      const result_2 = generateStaticUUID(1);
      expect(result_1).toBe(result_2);
    });
    test("Return different uuid, when the arguments are different.", () => {
      const result_1 = generateStaticUUID(1);
      const result_2 = generateStaticUUID(2);
      expect(result_1).not.toBe(result_2);
    });
  });
});
