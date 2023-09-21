import { fireEvent, render, screen } from "@testing-library/react";
import ColorInput from "@/components/atoms/ColorInput/ColorInput";

describe("ColorInput component", () => {
  let onChangeMock: jest.Mock<any, any, any>;
  beforeEach(() => {
    onChangeMock = jest.fn();
  });
  afterEach(() => {
    onChangeMock.mockReset();
  });
  describe("Render tests", () => {
    test("Renders with default props", () => {
      render(<ColorInput value="#ffffff" onChange={onChangeMock} />);
      const colorInput = screen.getByDisplayValue("#ffffff");
      expect(colorInput).toBeInTheDocument();
    });
  });
  describe("Event tests", () => {
    test("Calls onChange when a file is selected", () => {
      render(<ColorInput value="#ffffff" onChange={onChangeMock} />);
      const colorInput = screen.getByDisplayValue("#ffffff");
      fireEvent.change(colorInput, { target: { value: "#f43f5e" } });
      expect(onChangeMock).toHaveBeenCalledTimes(1);
    });
  });
});
