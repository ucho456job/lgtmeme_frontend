import pino, { Logger } from "pino";
import { handleErrorLogging } from "@/utils/logger";

jest.mock("pino", () => {
  const mockWarn = jest.fn();
  const mockError = jest.fn();
  return jest.fn().mockImplementation((): any => ({
    warn: mockWarn,
    error: mockError,
  }));
});

describe("logger", () => {
  describe("handleErrorLogging", () => {
    let logger: Logger;
    let mockWarn: jest.Mock;
    let mockError: jest.Mock;
    beforeEach(() => {
      logger = pino();
      mockWarn = logger.warn as jest.Mock;
      mockError = logger.error as jest.Mock;
    });
    test("Output warning level log, when status less than 500.", () => {
      const status = 400;
      const error = new Error("Test error");
      handleErrorLogging(status, error);
      expect(mockWarn).toHaveBeenCalledWith(error);
      expect(mockError).not.toHaveBeenCalled();
    });
    test("Output error level log, when status 500 or more.", () => {
      const status = 500;
      const error = new Error("Test error");
      handleErrorLogging(status, error);
      expect(mockError).toHaveBeenCalledWith(error);
      expect(mockWarn).not.toHaveBeenCalled();
    });
  });
});
