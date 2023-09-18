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
    // test("Calls the onClick handler when clicked copy button", async () => {
    //   render(<ImageCard image={imageData} />);
    //   const copyButton = screen.getAllByRole("button")[0]
    //   await userEvent.click(copyButton);
    // });
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
    // test("Calls the onClick handler when clicked report button", async () => {
    //   render(<ImageCard image={imageData} />);
    //   const reportButton = screen.getAllByRole("button")[2]
    //   await userEvent.click(reportButton);
    // });
  });
});
