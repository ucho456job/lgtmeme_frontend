import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ImageGallery from "@/components/organisms/ImageGallery";
import { ImageService } from "@/services/image.service";

describe("ImageGallery", () => {
  const initImages = [{ id: 1, url: "https://placehold.jp/300x300.png", width: 300, height: 300 }];
  describe("Render tests", () => {
    test("Renders with default props", () => {
      render(<ImageGallery initImages={initImages} />);
      const tabsComp = screen.getByText("Time line");
      const textBoxComp = screen.getByPlaceholderText("Keyword");
      const imageCardComp = screen.getByAltText("LGTM");
      const seeMoreButton = screen.getByRole("button", { name: "See more" });
      expect(tabsComp).toBeInTheDocument();
      expect(textBoxComp).toBeInTheDocument();
      expect(imageCardComp).toBeInTheDocument();
      expect(seeMoreButton).toBeInTheDocument();
    });
  });
  describe("Event tests", () => {
    test("When popular tab is clicked, changes the active tab, fetch popular images", async () => {
      ImageService.prototype.fetchImages = jest.fn(async () => [
        { id: 1, url: "https://placehold.jp/300x300.png", width: 300, height: 300 },
        { id: 2, url: "https://placehold.jp/300x300.png", width: 300, height: 300 },
      ]);
      render(<ImageGallery initImages={initImages} />);

      const beforeImageCardComps = screen.getAllByAltText("LGTM");
      expect(beforeImageCardComps.length).toBe(1);
      const popularTab = screen.getByText("Popular");
      expect(popularTab).not.toHaveClass("font_bold");
      await userEvent.click(popularTab);

      expect(popularTab).toHaveClass("font_bold");
      const imageCardComps = screen.getAllByAltText("LGTM");
      expect(imageCardComps.length).toBe(2);
    });
    test("When input keyword and press enter, fetch keyword images", async () => {
      ImageService.prototype.fetchImages = jest.fn(async () => [
        { id: 1, url: "https://placehold.jp/300x300.png", width: 300, height: 300 },
        { id: 2, url: "https://placehold.jp/300x300.png", width: 300, height: 300 },
      ]);
      render(<ImageGallery initImages={initImages} />);

      const beforeImageCardComps = screen.getAllByAltText("LGTM");
      expect(beforeImageCardComps.length).toBe(1);
      const textBox = screen.getByPlaceholderText("Keyword");
      await userEvent.type(textBox, "test");
      await userEvent.type(textBox, "{enter}");

      const imageCardComps = screen.getAllByAltText("LGTM");
      expect(imageCardComps.length).toBe(2);
    });
    test("When clicked see more button, fetch 9 images, button is not disabled", async () => {
      ImageService.prototype.fetchImages = jest.fn(async () => [
        { id: 2, url: "https://placehold.jp/300x300.png", width: 300, height: 300 },
        { id: 3, url: "https://placehold.jp/300x300.png", width: 300, height: 300 },
        { id: 4, url: "https://placehold.jp/300x300.png", width: 300, height: 300 },
        { id: 5, url: "https://placehold.jp/300x300.png", width: 300, height: 300 },
        { id: 6, url: "https://placehold.jp/300x300.png", width: 300, height: 300 },
        { id: 7, url: "https://placehold.jp/300x300.png", width: 300, height: 300 },
        { id: 8, url: "https://placehold.jp/300x300.png", width: 300, height: 300 },
        { id: 9, url: "https://placehold.jp/300x300.png", width: 300, height: 300 },
        { id: 10, url: "https://placehold.jp/300x300.png", width: 300, height: 300 },
      ]);
      render(<ImageGallery initImages={initImages} />);

      const beforeImageCardComps = screen.getAllByAltText("LGTM");
      expect(beforeImageCardComps.length).toBe(1);

      const seeMoreButton = screen.getByRole("button", { name: "See more" });
      await userEvent.click(seeMoreButton);

      const afterImageCardComps = screen.getAllByAltText("LGTM");
      expect(afterImageCardComps.length).toBe(10);
      const afterSeeMoreButton = screen.getByRole("button", { name: "See more" });
      expect(afterSeeMoreButton).not.toHaveAttribute("disabled");
    });
    test("When clicked see more button, fetch 8 or less images, button is disabled", async () => {
      ImageService.prototype.fetchImages = jest.fn(async () => [
        { id: 2, url: "https://placehold.jp/300x300.png", width: 300, height: 300 },
        { id: 3, url: "https://placehold.jp/300x300.png", width: 300, height: 300 },
        { id: 4, url: "https://placehold.jp/300x300.png", width: 300, height: 300 },
        { id: 5, url: "https://placehold.jp/300x300.png", width: 300, height: 300 },
        { id: 6, url: "https://placehold.jp/300x300.png", width: 300, height: 300 },
        { id: 7, url: "https://placehold.jp/300x300.png", width: 300, height: 300 },
        { id: 8, url: "https://placehold.jp/300x300.png", width: 300, height: 300 },
        { id: 9, url: "https://placehold.jp/300x300.png", width: 300, height: 300 },
      ]);
      render(<ImageGallery initImages={initImages} />);

      const beforeImageCardComps = screen.getAllByAltText("LGTM");
      expect(beforeImageCardComps.length).toBe(1);

      const seeMoreButton = screen.getByRole("button", { name: "See more" });
      await userEvent.click(seeMoreButton);

      const afterImageCardComps = screen.getAllByAltText("LGTM");
      expect(afterImageCardComps.length).toBe(9);
      const afterSeeMoreButton = screen.getByRole("button", { name: "See more" });
      expect(afterSeeMoreButton).toHaveAttribute("disabled");
    });
  });
});
