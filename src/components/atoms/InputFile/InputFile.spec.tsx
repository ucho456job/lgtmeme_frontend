import { render, screen, fireEvent } from "@testing-library/react";
import InputFile from "@/components/atoms/InputFile/InputFile";

describe("InputFile component", () => {
  let onChangeMock: jest.Mock<any, any, any>;
  beforeEach(() => {
    onChangeMock = jest.fn();
  });
  afterEach(() => {
    onChangeMock.mockReset();
  });
  describe("Render tests", () => {
    test("Renders with default props", () => {
      render(<InputFile onChange={onChangeMock} />);
      const fileInput = screen.getByLabelText("Select file");
      expect(fileInput).toBeInTheDocument();
    });
  });
  describe("Event tests", () => {
    test("Calls onChange", () => {
      render(<InputFile onChange={onChangeMock} />);
      const fileInput = screen.getByLabelText("Select file");
      const file = new File(["file content"], "file.png", { type: "image/png" });
      fireEvent.change(fileInput, { target: { files: [file] } });
      expect(onChangeMock).toBeCalledWith(file);
    });
  });
});
