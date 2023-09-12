import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tabs from "@/components/atoms/Tabs";

describe("Tabs", () => {
  const tabs = [
    { id: "timeLine", label: "Time line" },
    { id: "popular", label: "Popular" },
    { id: "favorite", label: "Favorite" },
  ];
  const activeTabId = "timeLine";
  let setActiveTabId: jest.Mock<any, any, any>;
  beforeEach(() => {
    setActiveTabId = jest.fn();
  });
  afterEach(() => {
    setActiveTabId.mockReset();
  });
  describe("Render tests", () => {
    test("Renders with default props", () => {
      render(<Tabs tabs={tabs} activeTabId={activeTabId} setActiveTabId={setActiveTabId} />);
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
      render(<Tabs tabs={tabs} activeTabId={activeTabId} setActiveTabId={setActiveTabId} />);
      const popular = screen.getByText("Popular");
      await userEvent.click(popular);
      expect(setActiveTabId).toHaveBeenCalledWith("popular");
    });
  });
});
