import { render, screen } from "@testing-library/react";
import Header from "@/components/organisms/Header";

describe("Header", () => {
  describe("Render tests", () => {
    test("Renders with default props", () => {
      render(<Header />);
      const h1 = screen.getByRole("heading", { name: "LGTMeme" });
      const h1Link = h1.closest("a");
      expect(h1).toBeInTheDocument();
      expect(h1Link).toHaveAttribute("href", "/");
    });
  });
});
