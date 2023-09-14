import { render, screen } from "@testing-library/react";
import Footer from "@/components/organisms/Footer";

describe("Footer", () => {
  describe("Render tests", () => {
    test("Renders with default props", () => {
      render(<Footer />);
      const termsOfServiceButton = screen.getByRole("button", { name: "Terms of service" });
      const termsOfServiceLink = termsOfServiceButton.closest("a");
      const privacyPolicyButton = screen.getByRole("button", { name: "Privacy policy" });
      const privacyPolicyLink = privacyPolicyButton.closest("a");
      const copyrightText = screen.queryByText("©2023 LGTMeme");
      expect(termsOfServiceButton).toBeInTheDocument();
      expect(termsOfServiceLink).toHaveAttribute("href", "/terms-of-service");
      expect(privacyPolicyButton).toBeInTheDocument();
      expect(privacyPolicyLink).toHaveAttribute("href", "/privacy-policy");
      expect(copyrightText).toBeInTheDocument();
    });
  });
});
