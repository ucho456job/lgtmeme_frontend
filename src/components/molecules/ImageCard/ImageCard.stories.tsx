import type { Meta, StoryObj } from "@storybook/react";
import ImageCard from "@/components/molecules/ImageCard/ImageCard";

const meta = {
  title: "molecules/ImageCard",
  component: ImageCard,
} satisfies Meta<typeof ImageCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const commonArgs = {
  isFavarite: false,
  onClickCopy: () => alert("Click copy button!"),
  onClickFavarite: () => alert("Click favarite button!"),
};

export const Square: Story = {
  args: {
    image: {
      id: "1",
      url: "https://placehold.jp/300x300.png",
    },
    ...commonArgs,
  },
};

export const Horizontal: Story = {
  args: {
    image: {
      id: "1",
      url: "https://placehold.jp/350x250.png",
    },
    ...commonArgs,
  },
};

export const Vertical: Story = {
  args: {
    image: {
      id: "1",
      url: "https://placehold.jp/250x350.png",
    },
    ...commonArgs,
  },
};

export const Mini: Story = {
  args: {
    image: {
      id: "1",
      url: "https://placehold.jp/200x200.png",
    },
    ...commonArgs,
  },
};
