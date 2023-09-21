import { render, screen } from "@testing-library/react";
import Form from "@/components/molecules/Form/Form";

describe("Form", () => {
  describe("Render tests", () => {
    test("Renders with default props", () => {
      render(
        <Form label="test label">
          <div>test component</div>
        </Form>,
      );
      const label = screen.getByText("test label");
      const children = screen.getByText("test component");
      expect(label).toBeInTheDocument();
      expect(children).toBeInTheDocument();
    });
  });
});
