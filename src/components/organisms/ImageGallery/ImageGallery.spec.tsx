import { render, screen } from "@testing-library/react";
import ImageGallery from "@/components/organisms/ImageGallery";

describe("ImageGallery", () => {
  const images = [
    {
      id: 1,
      title: "Square",
      url: "https://placehold.jp/300x300.png",
      width: 300,
      height: 300,
    },
  ];
  describe("Render tests", () => {
    test("Renders with default props", () => {
      render(<ImageGallery initImages={images} />);
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
    //
  });
});
