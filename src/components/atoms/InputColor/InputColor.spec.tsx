import { fireEvent, render, screen } from "@testing-library/react";
import InputColor from "@/components/atoms/InputColor/InputColor";

describe("InputColor component", () => {
  let onChangeMock: jest.Mock<any, any, any>;
  const value = "#ffffff";
  beforeEach(() => {
    onChangeMock = jest.fn();
  });
  afterEach(() => {
    onChangeMock.mockReset();
  });
  describe("Render tests", () => {
    test("Renders with default props", () => {
      render(<InputColor value={value} onChange={onChangeMock} />);
      const colorInput = screen.getByDisplayValue(value);
      expect(colorInput).toBeInTheDocument();
    });
  });
  describe("Event tests", () => {
    test("Calls onChange", () => {
      const newColor = "#f43f5e";
      render(<InputColor value={value} onChange={onChangeMock} />);
      const colorInput = screen.getByDisplayValue(value);
      fireEvent.change(colorInput, { target: { value: newColor } });
      expect(onChangeMock).toBeCalledWith(newColor);
    });
  });
});
