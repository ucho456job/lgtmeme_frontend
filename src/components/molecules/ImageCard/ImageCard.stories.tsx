import type { Meta, StoryObj } from "@storybook/react";
import ImageCard from "@/components/molecules/ImageCard/ImageCard";

const meta = {
  title: "molecules/ImageCard",
  component: ImageCard,
} satisfies Meta<typeof ImageCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const commonArgs = {
  isFavorite: false,
  onClickCopy: () => alert("Click copy button!"),
  onClickFavorite: () => alert("Click favorite button!"),
};

export const Default: Story = {
  args: {
    image: {
      id: "1",
      url: "https://placehold.jp/300x300.png",
      reported: false,
    },
    ...commonArgs,
  },
};
