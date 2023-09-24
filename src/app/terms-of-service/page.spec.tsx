import { render, screen } from "@testing-library/react";
import TermsOfService from "@/app/terms-of-service/page";

describe("Terms of service page", () => {
  describe("Render tests", () => {
    test("Renders with default props", () => {
      render(<TermsOfService />);
      const headings = screen.getAllByRole("heading");
      expect(headings.length).toBeGreaterThanOrEqual(1);
    });
  });
});
