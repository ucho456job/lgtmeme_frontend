import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TextBox from "@/components/atoms/TextBox";

describe("TextBox", () => {
  let onEnterPressMock: jest.Mock<any, any, any>;
  let onChangeMock: jest.Mock<any, any, any>;
  const placeholder = "Search";
  beforeEach(() => {
    onEnterPressMock = jest.fn();
    onChangeMock = jest.fn();
  });
  afterEach(() => {
    onEnterPressMock.mockReset();
    onChangeMock.mockReset();
  });
  describe("Render tests", () => {
    test("Renders with default props", () => {
      render(
        <TextBox
          placeholder={placeholder}
          onChange={onChangeMock}
          onEnterPress={onEnterPressMock}
        />,
      );
      const textBox = screen.getByPlaceholderText(placeholder);
      expect(textBox).toBeInTheDocument();
    });
  });
  describe("Event tests", () => {
    test("Calls the onChange handler when changed", async () => {
      render(
        <TextBox
          placeholder={placeholder}
          onChange={onChangeMock}
          onEnterPress={onEnterPressMock}
        />,
      );
      const textBox = screen.getByPlaceholderText(placeholder);
      await userEvent.type(textBox, "test");
      expect(onChangeMock).toBeCalledTimes(4);
    });
    test("Calls the onEnterPress handler when press enter", async () => {
      render(
        <TextBox
          placeholder={placeholder}
          onChange={onChangeMock}
          onEnterPress={onEnterPressMock}
        />,
      );
      const textBox = screen.getByPlaceholderText(placeholder);
      await userEvent.type(textBox, "{enter}");
      expect(onEnterPressMock).toBeCalled();
    });
    test("Whether onEnterPress is not called even if the Enter key is pressed during IME mode", async () => {
      render(
        <TextBox
          value=""
          placeholder={placeholder}
          onChange={onChangeMock}
          onEnterPress={onEnterPressMock}
        />,
      );
      const textBox = screen.getByPlaceholderText(placeholder);
      userEvent.type(textBox, "{compositionStart}");
      textBox.setAttribute("composition", "true");
      await userEvent.type(textBox, "{enter}");
      expect(onEnterPressMock).not.toBeCalled();
    });
  });
});
