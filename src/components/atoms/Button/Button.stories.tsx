import type { Meta, StoryObj } from "@storybook/react";
import Button from "@/components/atoms/Button/Button";

const meta = {
  title: "atoms/Button",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Solid: Story = {
  args: {
    visual: "solid",
    color: "black",
    size: "md",
    disabled: false,
    children: "Upload",
    onClick: () => alert("Click!"),
  },
};

export const WithIcon: Story = {
  args: {
    iconPath: "/images/upload.svg",
    children: "Upload",
    onClick: () => alert("Click!"),
  },
};

export const OnlyText: Story = {
  args: {
    visual: "text",
    children: "Upload",
    onClick: () => alert("Click!"),
  },
};

export const OnlyIcon: Story = {
  args: {
    iconPath: "/images/upload.svg",
    onClick: () => alert("Click!"),
  },
};
