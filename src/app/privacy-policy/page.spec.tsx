import { render, screen } from "@testing-library/react";
import PrivacyPolicy from "@/app/privacy-policy/page";

describe("Privacy policy page", () => {
  describe("Render tests", () => {
    test("Renders with default props", () => {
      render(<PrivacyPolicy />);
      const headings = screen.getAllByRole("heading");
      expect(headings.length).toBeGreaterThanOrEqual(1);
    });
  });
});
