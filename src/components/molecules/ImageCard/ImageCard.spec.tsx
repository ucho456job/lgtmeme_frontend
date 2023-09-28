import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ImageCard from "@/components/molecules/ImageCard/ImageCard";

describe("ImageCard", () => {
  const imageData = {
    id: "1",
    url: "https://placehold.jp/300x300.png",
  };
  let onClickCopyMock: jest.Mock<any, any, any>;
  let onClickFavoriteMock: jest.Mock<any, any, any>;
  beforeEach(() => {
    onClickCopyMock = jest.fn();
    onClickFavoriteMock = jest.fn();
  });
  afterEach(() => {
    onClickCopyMock.mockReset();
    onClickFavoriteMock.mockReset();
  });
  describe("Render tests", () => {
    test("Renders with default props", () => {
      render(
        <ImageCard
          image={imageData}
          isFavorite={false}
          onClickCopy={onClickCopyMock}
          onClickFavorite={onClickFavoriteMock}
        />,
      );
      const image = screen.getByAltText("LGTM");
      const copyButton = screen.getAllByRole("button")[0];
      const favoriteButton = screen.getAllByRole("button")[1];
      // const reportButton = screen.getAllByRole("button")[2];
      expect(image).toBeInTheDocument();
      expect(copyButton).toBeInTheDocument();
      expect(favoriteButton).toBeInTheDocument();
      // expect(reportButton).toBeInTheDocument();
    });
  });
  describe("Event tests", () => {
    test("Calls onClickCopyMock", async () => {
      render(
        <ImageCard
          image={imageData}
          isFavorite={false}
          onClickCopy={onClickCopyMock}
          onClickFavorite={onClickFavoriteMock}
        />,
      );
      const copyButton = screen.getAllByRole("button")[0];
      await userEvent.click(copyButton);
      expect(onClickCopyMock).toHaveBeenCalledTimes(1);
    });
    test("Calls onClickFavoriteMock", async () => {
      render(
        <ImageCard
          image={imageData}
          isFavorite={false}
          onClickCopy={onClickCopyMock}
          onClickFavorite={onClickFavoriteMock}
        />,
      );
      const favoriteButton = screen.getAllByRole("button")[1];
      await userEvent.click(favoriteButton);
      expect(onClickFavoriteMock).toHaveBeenCalledTimes(1);
    });
  });
});
