import { render, screen } from "@testing-library/react";
import Header from "@/components/organisms/Header";

describe("Header", () => {
  describe("Render tests", () => {
    test("Renders with default props", () => {
      render(<Header />);
      const h1 = screen.getByRole("heading", { name: "LGTMeme" });
      expect(h1).toBeInTheDocument();
    });
  });
});
