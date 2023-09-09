import type { Meta, StoryObj } from "@storybook/react";
import Button from "@/components/atoms/Button";

const meta = {
  title: "Button",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "contained",
    color: "black",
    size: "md",
    disabled: false,
    children: "Button",
    onClick: () => alert("Click!"),
  },
};
