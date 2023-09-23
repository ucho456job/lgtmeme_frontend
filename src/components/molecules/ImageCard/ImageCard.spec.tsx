import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ImageCard from "@/components/molecules/ImageCard/ImageCard";

describe("ImageCard", () => {
  const imageData = {
    id: "1",
    url: "https://placehold.jp/300x300.png",
  };
  let onClickCopyMock: jest.Mock<any, any, any>;
  let onClickFavariteMock: jest.Mock<any, any, any>;
  beforeEach(() => {
    onClickCopyMock = jest.fn();
    onClickFavariteMock = jest.fn();
  });
  afterEach(() => {
    onClickCopyMock.mockReset();
    onClickFavariteMock.mockReset();
  });
  describe("Render tests", () => {
    test("Renders with default props", () => {
      render(
        <ImageCard
          image={imageData}
          isFavarite={false}
          onClickCopy={onClickCopyMock}
          onClickFavarite={onClickFavariteMock}
        />,
      );
      const image = screen.getByAltText("LGTM");
      const copyButton = screen.getAllByRole("button")[0];
      const favariteButton = screen.getAllByRole("button")[1];
      // const reportButton = screen.getAllByRole("button")[2];
      expect(image).toBeInTheDocument();
      expect(copyButton).toBeInTheDocument();
      expect(favariteButton).toBeInTheDocument();
      // expect(reportButton).toBeInTheDocument();
    });
  });
  describe("Event tests", () => {
    test("Calls onClickCopyMock", async () => {
      render(
        <ImageCard
          image={imageData}
          isFavarite={false}
          onClickCopy={onClickCopyMock}
          onClickFavarite={onClickFavariteMock}
        />,
      );
      const copyButton = screen.getAllByRole("button")[0];
      await userEvent.click(copyButton);
      expect(onClickCopyMock).toHaveBeenCalledTimes(1);
    });
    test("Calls onClickFavariteMock", async () => {
      render(
        <ImageCard
          image={imageData}
          isFavarite={false}
          onClickCopy={onClickCopyMock}
          onClickFavarite={onClickFavariteMock}
        />,
      );
      const favariteButton = screen.getAllByRole("button")[1];
      await userEvent.click(favariteButton);
      expect(onClickFavariteMock).toHaveBeenCalledTimes(1);
    });
  });
});
