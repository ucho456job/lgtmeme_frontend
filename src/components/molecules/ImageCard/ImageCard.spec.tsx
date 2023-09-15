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
  describe("Render tests", () => {
    test("Renders with default props", () => {
      render(<ImageCard image={imageData} />);
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
    // test("Calls the onClick handler when clicked favarite button", async () => {
    //   render(<ImageCard image={imageData} />);
    //   const favariteButton = screen.getAllByRole("button")[1]
    //   await userEvent.click(favariteButton);
    // });
    // test("Calls the onClick handler when clicked report button", async () => {
    //   render(<ImageCard image={imageData} />);
    //   const reportButton = screen.getAllByRole("button")[2]
    //   await userEvent.click(reportButton);
    // });
  });
});
