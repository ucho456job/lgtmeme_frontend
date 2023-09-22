import type { Meta, StoryObj } from "@storybook/react";
import Svg from "@/components/atoms/Svg/Svg";

const meta = {
  title: "atoms/Svg",
  component: Svg,
} satisfies Meta<typeof Svg>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Search: Story = {
  args: {
    icon: "search",
  },
};

export const Copy: Story = {
  args: {
    icon: "copy",
    size: "lg",
  },
};

export const Flag: Story = {
  args: {
    icon: "flag",
  },
};

export const HeartOutline: Story = {
  args: {
    icon: "heart",
    color: "pink",
  },
};

export const HeartSolid: Story = {
  args: {
    icon: "heart",
    color: "pink",
    fillStyle: "solid",
  },
};

export const Plus: Story = {
  args: {
    icon: "plus",
  },
};

export const Upload: Story = {
  args: {
    icon: "upload",
  },
};
