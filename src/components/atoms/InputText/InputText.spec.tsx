import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputText from "@/components/atoms/InputText/InputText";

describe("InputText", () => {
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
        <InputText
          placeholder={placeholder}
          onChange={onChangeMock}
          onEnterPress={onEnterPressMock}
        />,
      );
      const inputText = screen.getByPlaceholderText(placeholder);
      expect(inputText).toBeInTheDocument();
    });
  });
  describe("Event tests", () => {
    test("Calls onChange", async () => {
      render(
        <InputText
          placeholder={placeholder}
          onChange={onChangeMock}
          onEnterPress={onEnterPressMock}
        />,
      );
      const inputText = screen.getByPlaceholderText(placeholder);
      await userEvent.type(inputText, "test");
      expect(onChangeMock).toBeCalledTimes(4);
    });
    test("Calls onEnterPress", async () => {
      render(
        <InputText
          placeholder={placeholder}
          onChange={onChangeMock}
          onEnterPress={onEnterPressMock}
        />,
      );
      const inputText = screen.getByPlaceholderText(placeholder);
      await userEvent.type(inputText, "{enter}");
      expect(onEnterPressMock).toBeCalled();
    });
    test("Whether onEnterPress is not called even if the Enter key is pressed during IME mode", async () => {
      render(
        <InputText
          value=""
          placeholder={placeholder}
          onChange={onChangeMock}
          onEnterPress={onEnterPressMock}
        />,
      );
      const inputText = screen.getByPlaceholderText(placeholder);
      userEvent.type(inputText, "{compositionStart}");
      inputText.setAttribute("composition", "true");
      await userEvent.type(inputText, "{enter}");
      expect(onEnterPressMock).not.toBeCalled();
    });
  });
});
