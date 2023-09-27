import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "@/components/molecules/Modal/Modal";

describe("Modal", () => {
  let onClickMock: jest.Mock<any, any, any>;
  const messageData = "Test message";
  beforeEach(() => {
    onClickMock = jest.fn();
  });
  afterEach(() => {
    onClickMock.mockReset();
  });
  describe("Render tests", () => {
    test("Renders with default props", () => {
      render(<Modal message={messageData} show onClick={onClickMock} />);
      const message = screen.getByText(messageData);
      const button = screen.getByRole("button", { name: "Close" });
      expect(message).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });
  });
  describe("Event tests", () => {
    test("Calls onClick", async () => {
      render(<Modal message={messageData} show onClick={onClickMock} />);
      const button = screen.getByRole("button", { name: "Close" });
      await userEvent.click(button);
      expect(onClickMock).toHaveBeenCalledTimes(1);
    });
  });
});
