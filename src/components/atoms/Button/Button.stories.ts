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
    visual: "contained",
    color: "black",
    size: "md",
    disabled: false,
    children: "Upload",
    onClick: () => alert("Click!"),
  },
};

export const DefaultWithIcon: Story = {
  args: {
    iconPath: "/images/upload.svg",
    children: "Upload",
    onClick: () => alert("Click!"),
  },
};

export const Text: Story = {
  args: {
    visual: "text",
    children: "Upload",
    onClick: () => alert("Click!"),
  },
};

export const Icon: Story = {
  args: {
    iconPath: "/images/upload.svg",
    onClick: () => alert("Click!"),
  },
};
