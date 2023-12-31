import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "@/components/atoms/Button/Button";

describe("Button", () => {
  let onClickMock: jest.Mock<any, any, any>;
  const text = "Click me";
  beforeEach(() => {
    onClickMock = jest.fn();
  });
  afterEach(() => {
    onClickMock.mockReset();
  });
  describe("Render tests", () => {
    test("Renders with default props", () => {
      render(<Button onClick={onClickMock}>{text}</Button>);
      const button = screen.getByRole("button", { name: text });
      expect(button).toBeInTheDocument();
      expect(button).not.toBeDisabled();
    });
  });
  describe("Event tests", () => {
    test("Calls onClick", async () => {
      render(<Button onClick={onClickMock}>{text}</Button>);
      const button = screen.getByRole("button", { name: text });
      await userEvent.click(button);
      expect(onClickMock).toHaveBeenCalledTimes(1);
    });
  });
});
