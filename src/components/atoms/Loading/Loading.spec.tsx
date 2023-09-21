import { render, screen } from "@testing-library/react";
import Loading from "@/components/atoms/Loading/Loading";

describe("Loading", () => {
  describe("Render tests", () => {
    test("Renders with default props", async () => {
      render(<Loading />);
      const loading = await screen.findByTestId("loading");
      expect(loading).toBeInTheDocument();
    });
  });
});
