import { render, screen } from "@testing-library/react";
import Footer from "@/components/organisms/Footer/Footer";
import {
  HOME_ENDPOINT,
  PRIVACY_POLICY_ENDPOINT,
  TERMS_OF_SERVICE_ENDPOINT,
} from "@/constants/endpoints";
import packageJson from "@@/package.json";

describe("Footer", () => {
  describe("Render tests", () => {
    test("Renders with default props", () => {
      render(<Footer />);
      const homeButton = screen.getByRole("button", { name: "Home" });
      const homeLink = homeButton.closest("a");
      const termsOfServiceButton = screen.getByRole("button", { name: "Terms of service" });
      const termsOfServiceLink = termsOfServiceButton.closest("a");
      const privacyPolicyButton = screen.getByRole("button", { name: "Privacy policy" });
      const privacyPolicyLink = privacyPolicyButton.closest("a");
      const copyrightText = screen.getByText(`©2023 LGTMeme version ${packageJson.version}`);
      expect(homeButton).toBeInTheDocument();
      expect(homeLink).toHaveAttribute("href", HOME_ENDPOINT);
      expect(termsOfServiceButton).toBeInTheDocument();
      expect(termsOfServiceLink).toHaveAttribute("href", TERMS_OF_SERVICE_ENDPOINT);
      expect(privacyPolicyButton).toBeInTheDocument();
      expect(privacyPolicyLink).toHaveAttribute("href", PRIVACY_POLICY_ENDPOINT);
      expect(copyrightText).toBeInTheDocument();
    });
  });
});
