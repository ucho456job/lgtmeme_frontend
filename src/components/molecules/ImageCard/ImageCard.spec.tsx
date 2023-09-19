import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ImageCard from "@/components/molecules/ImageCard";

describe("ImageCard", () => {
  const imageData = {
    id: 1,
    url: "https://placehold.jp/300x300.png",
    width: 300,
    height: 300,
  };
  const favariteImageIds = [1];
  let setFavariteImageIdsMock: jest.Mock<any, any, any>;
  beforeEach(() => {
    setFavariteImageIdsMock = jest.fn();
  });
  afterEach(() => {
    setFavariteImageIdsMock.mockReset();
  });
  describe("Render tests", () => {
    test("Renders with default props", () => {
      render(
        <ImageCard
          image={imageData}
          favariteImageIds={favariteImageIds}
          setFavariteImageIds={setFavariteImageIdsMock}
        />,
      );
      const image = screen.getByAltText("LGTM");
      const copyButton = screen.getAllByRole("button")[0];
      const favariteButton = screen.getAllByRole("button")[1];
      const reportButton = screen.getAllByRole("button")[2];
      expect(image).toBeInTheDocument();
      expect(copyButton).toBeInTheDocument();
      expect(favariteButton).toBeInTheDocument();
      expect(reportButton).toBeInTheDocument();
    });
  });
  describe("Event tests", () => {
    let alertMock: jest.SpyInstance<void, [message?: any], any>;
    beforeEach(() => {
      alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
    });
    afterEach(() => {
      alertMock.mockClear();
    });
    test("When copying to clipboard succeeds, it should show a success alert", async () => {
      const clipboardWriteTextMock = jest.fn();
      Object.assign(navigator, {
        clipboard: {
          writeText: clipboardWriteTextMock,
        },
      });
      render(
        <ImageCard
          image={imageData}
          favariteImageIds={favariteImageIds}
          setFavariteImageIds={setFavariteImageIdsMock}
        />,
      );

      const copyButton = screen.getAllByRole("button")[0];
      await userEvent.click(copyButton);

      expect(clipboardWriteTextMock).toHaveBeenCalledWith(`![LGTM](${imageData.url})`);
      expect(alertMock).toHaveBeenCalledWith("Success! Copied to clipboard");
    });
    test("When copying to clipboard fails, it should show a failure alert", async () => {
      Object.assign(navigator, {
        clipboard: {
          writeText: jest.fn(() => Promise.reject(new Error("Failed to copy"))),
        },
      });
      render(
        <ImageCard
          image={imageData}
          favariteImageIds={favariteImageIds}
          setFavariteImageIds={setFavariteImageIdsMock}
        />,
      );

      const copyButton = screen.getAllByRole("button")[0];
      await userEvent.click(copyButton);

      expect(alertMock).toHaveBeenCalledWith("Failed to copy to clipboard");
    });
    test("When press favarite button, it will be added to favorites", async () => {
      render(
        <ImageCard
          image={imageData}
          favariteImageIds={[]}
          setFavariteImageIds={setFavariteImageIdsMock}
        />,
      );
      const favariteButton = screen.getAllByRole("button")[1];
      const favariteIcon = screen.getAllByAltText("icon")[1];
      expect(favariteIcon).toHaveAttribute("src", "/images/heart-outline.svg");
      await userEvent.click(favariteButton);
      expect(setFavariteImageIdsMock).toBeCalledWith([1]);
      expect(favariteIcon).toHaveAttribute("src", "/images/heart-solid.svg");
    });
    test("When press favarite button when it's already a favorite, it will be removed from favorites", async () => {
      render(
        <ImageCard
          image={imageData}
          favariteImageIds={favariteImageIds}
          setFavariteImageIds={setFavariteImageIdsMock}
        />,
      );
      const favariteButton = screen.getAllByRole("button")[1];
      const favariteIcon = screen.getAllByAltText("icon")[1];
      expect(favariteIcon).toHaveAttribute("src", "/images/heart-solid.svg");
      await userEvent.click(favariteButton);
      expect(setFavariteImageIdsMock).toBeCalledWith([]);
      expect(favariteIcon).toHaveAttribute("src", "/images/heart-outline.svg");
    });
  });
});
