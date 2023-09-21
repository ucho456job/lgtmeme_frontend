import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SelectBox from "@/components/atoms/SelectBox/SelectBox";

describe("SelectBox component", () => {
  let onChangeMock: jest.Mock<any, any, any>;
  const options = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
  ];
  beforeEach(() => {
    onChangeMock = jest.fn();
  });
  afterEach(() => {
    onChangeMock.mockReset();
  });
  describe("Render tests", () => {
    test("Renders with default props", () => {
      render(<SelectBox value={"1"} options={options} onChange={onChangeMock} />);
      const selectBox = screen.getByRole("combobox");
      expect(selectBox).toBeInTheDocument();
    });
  });
  describe("Event tests", () => {
    test("Calls onChange", async () => {
      render(<SelectBox value={"1"} options={options} onChange={onChangeMock} />);
      const selectBox = screen.getByRole("combobox");
      await userEvent.selectOptions(selectBox, "2");
      expect(onChangeMock).toBeCalledWith("2");
    });
  });
});
