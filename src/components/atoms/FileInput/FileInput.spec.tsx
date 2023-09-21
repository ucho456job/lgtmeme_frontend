import { render, screen, fireEvent } from "@testing-library/react";
import FileInput from "@/components/atoms/FileInput/FileInput";

describe("FileInput component", () => {
  let onChangeMock: jest.Mock<any, any, any>;
  beforeEach(() => {
    onChangeMock = jest.fn();
  });
  afterEach(() => {
    onChangeMock.mockReset();
  });
  describe("Render tests", () => {
    test("Renders with default props", () => {
      render(<FileInput onChange={onChangeMock} />);
      const fileInput = screen.getByLabelText("Select file");
      expect(fileInput).toBeInTheDocument();
    });
  });
  describe("Event tests", () => {
    test("Calls onChange when a file is selected", () => {
      render(<FileInput onChange={onChangeMock} />);
      const fileInput = screen.getByLabelText("Select file");
      const file = new File(["file content"], "file.png", { type: "image/png" });
      fireEvent.change(fileInput, { target: { files: [file] } });
      expect(onChangeMock).toHaveBeenCalledTimes(1);
    });
  });
});
