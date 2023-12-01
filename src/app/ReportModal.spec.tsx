import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ReportModal from "@/app/ReportModal";
import { INTERNAL_SERVER_ERROR_MESSAGE, INTERNAL_SERVER_ERROR_NAME } from "@/constants/exceptions";
import { ImageService } from "@/services/image.service";
import { generateStaticUUID } from "@/utils/uuid";

const mockImage = {
  id: generateStaticUUID(1),
  url: "https://placehold.jp/300x300.png",
  reported: false,
};

describe("ReportModal", () => {
  let onClickCloseMock: jest.Mock<any, any, any>;
  beforeEach(() => {
    onClickCloseMock = jest.fn();
  });
  afterEach(() => {
    onClickCloseMock.mockReset();
  });
  describe("Render tests", () => {
    test("Renders with default props.", () => {
      render(<ReportModal image={mockImage} onClickClose={onClickCloseMock} />);
      const image = screen.getByAltText("LGTM");
      const message = screen.getByText(
        "Would you like to report an image that may be inappropriate or violate copyright/privacy?",
      );
      const closeButton = screen.getByRole("button", { name: "Close" });
      const sendButton = screen.getByRole("button", { name: "Send" });
      expect(image).toBeInTheDocument();
      expect(message).toBeInTheDocument();
      expect(closeButton).toBeInTheDocument();
      expect(sendButton).toBeInTheDocument();
    });
  });
  describe("Event tests", () => {
    test("Calls onClick, when press close button.", async () => {
      render(<ReportModal image={mockImage} onClickClose={onClickCloseMock} />);
      const closeButton = screen.getByRole("button", { name: "Close" });
      await userEvent.click(closeButton);
      expect(onClickCloseMock).toBeCalledTimes(1);
    });
    test("Show success dialog, when the report is successful.", async () => {
      ImageService.prototype.patchImage = jest.fn(async () => {
        const response: PatchImageSuccessResponse = { ok: true };
        return response;
      });
      render(<ReportModal image={mockImage} onClickClose={onClickCloseMock} />);
      const sendButton = screen.getByRole("button", { name: "Send" });
      await userEvent.click(sendButton);
      const modalMessage = screen.getByText(
        "The report was successful! Please wait a moment for the operator to confirm.",
      );
      expect(modalMessage).toBeInTheDocument();
    });
    test("Show failure dialog, when the report fails.", async () => {
      ImageService.prototype.patchImage = jest.fn(async () => {
        const response: ErrorResponse = {
          name: INTERNAL_SERVER_ERROR_NAME,
          message: INTERNAL_SERVER_ERROR_MESSAGE,
          ok: false,
        };
        return response;
      });
      render(<ReportModal image={mockImage} onClickClose={onClickCloseMock} />);
      const sendButton = screen.getByRole("button", { name: "Send" });
      await userEvent.click(sendButton);
      const modalMessage = screen.getByText(INTERNAL_SERVER_ERROR_MESSAGE);
      expect(modalMessage).toBeInTheDocument();
    });
    test("Show failure dialog, when unknown error.", async () => {
      ImageService.prototype.patchImage = jest.fn().mockRejectedValue(new Error());
      render(<ReportModal image={mockImage} onClickClose={onClickCloseMock} />);
      const sendButton = screen.getByRole("button", { name: "Send" });
      await userEvent.click(sendButton);
      const modalMessage = screen.getByText("Report failed. Please try again later.");
      expect(modalMessage).toBeInTheDocument();
    });
  });
});
