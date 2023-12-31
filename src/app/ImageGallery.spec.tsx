import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ImageGallery from "@/app/ImageGallery";
import { VALIDATION_ERROR_NAME } from "@/constants/exceptions";
import { VALIDATION_ERROR_MESAGE_KEYWORD } from "@/constants/image";
import { ImageService } from "@/services/image.service";
import { generateStaticUUID } from "@/utils/uuid";

const SAMPLE_IMAGE_URL = "https://placehold.jp/300x300.png";
const IMAGE_ID = generateStaticUUID(1);
const INTI_IMAGES = [{ id: IMAGE_ID, url: SAMPLE_IMAGE_URL, reported: false }];

describe("ImageGallery", () => {
  describe("Render tests", () => {
    test("Renders with default props.", () => {
      render(<ImageGallery initImages={INTI_IMAGES} />);
      const tabs = screen.getByText("Time line");
      const textBox = screen.getByPlaceholderText("Keyword");
      const imageCard = screen.getByAltText("LGTM");
      const seeMoreButton = screen.getByRole("button", { name: "See more" });
      expect(tabs).toBeInTheDocument();
      expect(textBox).toBeInTheDocument();
      expect(imageCard).toBeInTheDocument();
      expect(seeMoreButton).toBeInTheDocument();
    });
  });
  describe("Event tests", () => {
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
    };
    test("Get popular images, when popular tab clicked.", async () => {
      ImageService.prototype.getImages = jest.fn(async () => {
        const res: GetImagesSuccessResponse = {
          images: [
            { id: generateStaticUUID(1), url: SAMPLE_IMAGE_URL, reported: false },
            { id: generateStaticUUID(2), url: SAMPLE_IMAGE_URL, reported: false },
          ],
          ok: true,
        };
        return res;
      });
      render(<ImageGallery initImages={INTI_IMAGES} />);

      const beforeImageCards = screen.getAllByAltText("LGTM");
      expect(beforeImageCards.length).toBe(1);
      const popularTab = screen.getByText("Popular");
      expect(popularTab).not.toHaveClass("font_bold");
      await userEvent.click(popularTab);

      expect(popularTab).toHaveClass("font_bold");
      const afterImageCardComp = screen.getAllByAltText("LGTM");
      expect(afterImageCardComp.length).toBe(2);
    });
    test("Get images matching keyword, when input keyword and press enter.", async () => {
      ImageService.prototype.getImages = jest.fn(async () => {
        const res: GetImagesSuccessResponse = {
          images: [
            { id: generateStaticUUID(1), url: SAMPLE_IMAGE_URL, reported: false },
            { id: generateStaticUUID(2), url: SAMPLE_IMAGE_URL, reported: false },
          ],
          ok: true,
        };
        return res;
      });
      render(<ImageGallery initImages={INTI_IMAGES} />);

      const beforeImageCards = screen.getAllByAltText("LGTM");
      expect(beforeImageCards.length).toBe(1);
      const textBox = screen.getByPlaceholderText("Keyword");
      await userEvent.type(textBox, "test");
      await userEvent.type(textBox, "{enter}");

      const afterImageCardComps = screen.getAllByAltText("LGTM");
      expect(afterImageCardComps.length).toBe(2);
    });
    test("See more button is not disabled, when get 9 images.", async () => {
      ImageService.prototype.getImages = jest.fn(async () => {
        const res: GetImagesSuccessResponse = {
          images: [
            { id: generateStaticUUID(2), url: SAMPLE_IMAGE_URL, reported: false },
            { id: generateStaticUUID(3), url: SAMPLE_IMAGE_URL, reported: false },
            { id: generateStaticUUID(4), url: SAMPLE_IMAGE_URL, reported: false },
            { id: generateStaticUUID(5), url: SAMPLE_IMAGE_URL, reported: false },
            { id: generateStaticUUID(6), url: SAMPLE_IMAGE_URL, reported: false },
            { id: generateStaticUUID(7), url: SAMPLE_IMAGE_URL, reported: false },
            { id: generateStaticUUID(8), url: SAMPLE_IMAGE_URL, reported: false },
            { id: generateStaticUUID(9), url: SAMPLE_IMAGE_URL, reported: false },
            { id: generateStaticUUID(10), url: SAMPLE_IMAGE_URL, reported: false },
          ],
          ok: true,
        };
        return res;
      });
      render(<ImageGallery initImages={INTI_IMAGES} />);

      const beforeImageCards = screen.getAllByAltText("LGTM");
      expect(beforeImageCards.length).toBe(1);
      const beforeSeeMoreButton = screen.getByRole("button", { name: "See more" });
      await userEvent.click(beforeSeeMoreButton);

      const afterImageCards = screen.getAllByAltText("LGTM");
      expect(afterImageCards.length).toBe(10);
      const afterSeeMoreButton = screen.getByRole("button", { name: "See more" });
      expect(afterSeeMoreButton).not.toHaveAttribute("disabled");
    });
    test("See more button is disabled, when get 8 or less images.", async () => {
      ImageService.prototype.getImages = jest.fn(async () => {
        const res: GetImagesSuccessResponse = {
          images: [
            { id: generateStaticUUID(2), url: SAMPLE_IMAGE_URL, reported: false },
            { id: generateStaticUUID(3), url: SAMPLE_IMAGE_URL, reported: false },
            { id: generateStaticUUID(4), url: SAMPLE_IMAGE_URL, reported: false },
            { id: generateStaticUUID(5), url: SAMPLE_IMAGE_URL, reported: false },
            { id: generateStaticUUID(6), url: SAMPLE_IMAGE_URL, reported: false },
            { id: generateStaticUUID(7), url: SAMPLE_IMAGE_URL, reported: false },
            { id: generateStaticUUID(8), url: SAMPLE_IMAGE_URL, reported: false },
            { id: generateStaticUUID(9), url: SAMPLE_IMAGE_URL, reported: false },
          ],
          ok: true,
        };
        return res;
      });
      render(<ImageGallery initImages={INTI_IMAGES} />);

      const beforeImageCards = screen.getAllByAltText("LGTM");
      expect(beforeImageCards.length).toBe(1);
      const beforeSeeMoreButton = screen.getByRole("button", { name: "See more" });
      await userEvent.click(beforeSeeMoreButton);

      const afterImageCards = screen.getAllByAltText("LGTM");
      expect(afterImageCards.length).toBe(9);
      const afterSeeMoreButton = screen.getByRole("button", { name: "See more" });
      expect(afterSeeMoreButton).toHaveAttribute("disabled");
    });
    test("Show a failure modal, when a validation error occurs.", async () => {
      ImageService.prototype.getImages = jest.fn(async () => {
        const res: ErrorResponse = {
          name: VALIDATION_ERROR_NAME,
          message: VALIDATION_ERROR_MESAGE_KEYWORD,
          ok: false,
        };
        return res;
      });
      render(<ImageGallery initImages={INTI_IMAGES} />);

      const seeMoreButton = screen.getByRole("button", { name: "See more" });
      await userEvent.click(seeMoreButton);

      const modalMessage = screen.getByText(VALIDATION_ERROR_MESAGE_KEYWORD);
      expect(modalMessage).toBeInTheDocument();
    });
    test("Show a failure modal, when failed to get images.", async () => {
      ImageService.prototype.getImages = jest.fn().mockRejectedValue(new Error());
      render(<ImageGallery initImages={INTI_IMAGES} />);

      const seeMoreButton = screen.getByRole("button", { name: "See more" });
      await userEvent.click(seeMoreButton);

      const modalMessage = screen.getByText("Failed to get images. Please try again later.");
      expect(modalMessage).toBeInTheDocument();
    });
    test("Show a success modal, when copying to clipboard.", async () => {
      const clipboardWriteTextMock = jest.fn();
      ImageService.prototype.patchImage = jest.fn(async () => {
        const response: PatchImageSuccessResponse = { ok: true };
        return response;
      });
      Object.assign(navigator, {
        clipboard: {
          writeText: clipboardWriteTextMock,
        },
      });
      render(<ImageGallery initImages={INTI_IMAGES} />);

      const copyButton = screen.getAllByRole("button")[0];
      await userEvent.click(copyButton);

      expect(clipboardWriteTextMock).toHaveBeenCalledWith(`![LGTM](${INTI_IMAGES[0].url})`);
      const modalMessage = screen.getByText("Copied to clipboard!");
      expect(modalMessage).toBeInTheDocument();
    });
    test("Show a failure modal, when copying to clipboard fails.", async () => {
      ImageService.prototype.patchImage = jest.fn(async () => {
        const response: PatchImageSuccessResponse = { ok: true };
        return response;
      });
      Object.assign(navigator, {
        clipboard: {
          writeText: jest.fn(() => Promise.reject(new Error("Failed to copy"))),
        },
      });
      render(<ImageGallery initImages={INTI_IMAGES} />);

      const copyButton = screen.getAllByRole("button")[0];
      await userEvent.click(copyButton);

      const modalMessage = screen.getByText("Failed to copy clipboard. Please try again later.");
      expect(modalMessage).toBeInTheDocument();
    });
    test("ImageId is set to localstorage, when press favorite button for an unregistered image.", async () => {
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      render(<ImageGallery initImages={INTI_IMAGES} />);
      const favoriteButton = screen.getAllByRole("button")[1];
      await userEvent.click(favoriteButton);
      expect(localStorageMock.setItem).toBeCalledWith("favoriteImageIds", `["${IMAGE_ID}"]`);
    });
    test("ImageId is removed from localstorage, When press favorite button for a registered image.", async () => {
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      localStorageMock.getItem.mockReturnValue(`["${IMAGE_ID}"]`);
      render(<ImageGallery initImages={INTI_IMAGES} />);
      const favoriteButton = screen.getAllByRole("button")[1];
      await userEvent.click(favoriteButton);
      expect(localStorageMock.setItem).toBeCalledWith("favoriteImageIds", "[]");
    });
    test("Show a report modal, when press report button.", async () => {
      render(<ImageGallery initImages={INTI_IMAGES} />);
      const reportButton = screen.getAllByRole("button")[2];
      await userEvent.click(reportButton);
      const reportModal = screen.getByText(
        "Would you like to report an image that may be inappropriate or violate copyright/privacy?",
      );
      expect(reportModal).toBeInTheDocument();
    });
  });
});
