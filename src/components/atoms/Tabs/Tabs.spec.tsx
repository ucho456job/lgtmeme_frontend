import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tabs from "@/components/atoms/Tabs/Tabs";

describe("Tabs", () => {
  const tabs = [
    { id: "timeLine", label: "Time line" },
    { id: "popular", label: "Popular" },
    { id: "favorite", label: "Favorite" },
  ];
  const id = "timeLine";
  let onClickMock: jest.Mock<any, any, any>;
  beforeEach(() => {
    onClickMock = jest.fn();
  });
  afterEach(() => {
    onClickMock.mockReset();
  });
  describe("Render tests", () => {
    test("Renders with default props", () => {
      render(<Tabs tabs={tabs} value={id} onClick={onClickMock} />);
      const timeLine = screen.getByText("Time line");
      const popular = screen.getByText("Popular");
      const favorite = screen.getByText("Favorite");
      expect(timeLine).toBeInTheDocument();
      expect(popular).toBeInTheDocument();
      expect(favorite).toBeInTheDocument();
    });
  });
  describe("Event tests", () => {
    test("Calls the onClick handler when clicked", async () => {
      render(<Tabs tabs={tabs} value={id} onClick={onClickMock} />);
      const popular = screen.getByText("Popular");
      await userEvent.click(popular);
      expect(onClickMock).toHaveBeenCalledWith("popular");
    });
  });
});
