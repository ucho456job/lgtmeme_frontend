import { render, screen } from "@testing-library/react";
import Header from "@/components/organisms/Header/Header";
import { HOME_ENDPOINT } from "@/constants/endpoints";

describe("Header", () => {
  describe("Render tests", () => {
    test("Renders with default props", () => {
      render(<Header />);
      const h1 = screen.getByRole("heading", { name: "LGTMeme" });
      const link = screen.getByText("LGTMeme");
      expect(h1).toBeInTheDocument();
      expect(link).toHaveAttribute("href", HOME_ENDPOINT);
    });
  });
});
