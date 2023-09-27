import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ImageGallery from "@/app/ImageGallery";
import { ImageService } from "@/services/image.service";

describe("ImageGallery", () => {
  const initImages = [{ id: "1", url: "https://placehold.jp/300x300.png" }];
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
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
    };
    afterEach(() => {
      localStorageMock.getItem.mockClear();
      localStorageMock.setItem.mockClear();
    });
    test("When popular tab is clicked, changes the active tab, fetch popular images", async () => {
      ImageService.prototype.fetchImages = jest.fn(async () => [
        { id: "1", url: "https://placehold.jp/300x300.png" },
        { id: "2", url: "https://placehold.jp/300x300.png" },
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
        { id: "1", url: "https://placehold.jp/300x300.png" },
        { id: "2", url: "https://placehold.jp/300x300.png" },
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
        { id: "2", url: "https://placehold.jp/300x300.png" },
        { id: "3", url: "https://placehold.jp/300x300.png" },
        { id: "4", url: "https://placehold.jp/300x300.png" },
        { id: "5", url: "https://placehold.jp/300x300.png" },
        { id: "6", url: "https://placehold.jp/300x300.png" },
        { id: "7", url: "https://placehold.jp/300x300.png" },
        { id: "8", url: "https://placehold.jp/300x300.png" },
        { id: "9", url: "https://placehold.jp/300x300.png" },
        { id: "10", url: "https://placehold.jp/300x300.png" },
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
        { id: "2", url: "https://placehold.jp/300x300.png" },
        { id: "3", url: "https://placehold.jp/300x300.png" },
        { id: "4", url: "https://placehold.jp/300x300.png" },
        { id: "5", url: "https://placehold.jp/300x300.png" },
        { id: "6", url: "https://placehold.jp/300x300.png" },
        { id: "7", url: "https://placehold.jp/300x300.png" },
        { id: "8", url: "https://placehold.jp/300x300.png" },
        { id: "9", url: "https://placehold.jp/300x300.png" },
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
    test("When failed to get images, it should show a failure modal", async () => {
      ImageService.prototype.fetchImages = jest.fn().mockRejectedValue(new Error());
      render(<ImageGallery initImages={initImages} />);

      const beforeImageCardComps = screen.getAllByAltText("LGTM");
      expect(beforeImageCardComps.length).toBe(1);

      const seeMoreButton = screen.getByRole("button", { name: "See more" });
      await userEvent.click(seeMoreButton);

      const modalMessage = screen.getByText("Failed to get images.");
      expect(modalMessage).toBeInTheDocument();
    });
    test("When copying to clipboard succeeds, it should show a success modal", async () => {
      const clipboardWriteTextMock = jest.fn();
      ImageService.prototype.patchImage = jest.fn(async () => {});
      Object.assign(navigator, {
        clipboard: {
          writeText: clipboardWriteTextMock,
        },
      });
      render(<ImageGallery initImages={initImages} />);

      const copyButton = screen.getAllByRole("button")[0];
      await userEvent.click(copyButton);

      expect(clipboardWriteTextMock).toHaveBeenCalledWith(`![LGTM](${initImages[0].url})`);
      const modalMessage = screen.getByText("Copied to clipboard!");
      expect(modalMessage).toBeInTheDocument();
    });
    test("When copying to clipboard fails, it should show a failure modal", async () => {
      ImageService.prototype.patchImage = jest.fn(async () => {});
      Object.assign(navigator, {
        clipboard: {
          writeText: jest.fn(() => Promise.reject(new Error("Failed to copy"))),
        },
      });
      render(<ImageGallery initImages={initImages} />);

      const copyButton = screen.getAllByRole("button")[0];
      await userEvent.click(copyButton);

      const modalMessage = screen.getByText("Failed to copy to clipboard.");
      expect(modalMessage).toBeInTheDocument();
    });
    test("When press favarite button, it will be added to favorites", async () => {
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      render(<ImageGallery initImages={initImages} />);
      const favariteButton = screen.getAllByRole("button")[1];
      await userEvent.click(favariteButton);
      expect(localStorageMock.setItem).toBeCalledWith("favariteImageIds", '["1"]');
    });
    test("When press favarite button when it's already a favorite, it will be removed from favorites", async () => {
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      localStorageMock.getItem.mockReturnValue('["1"]');
      render(<ImageGallery initImages={initImages} />);
      const favariteButton = screen.getAllByRole("button")[1];
      await userEvent.click(favariteButton);
      expect(localStorageMock.setItem).toBeCalledWith("favariteImageIds", "[]");
    });
  });
});
