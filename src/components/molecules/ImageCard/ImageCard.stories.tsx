import type { Meta, StoryObj } from "@storybook/react";
import ImageCard from "@/components/molecules/ImageCard";

const meta = {
  title: "molecules/ImageCard",
  component: ImageCard,
} satisfies Meta<typeof ImageCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Square: Story = {
  args: {
    image: {
      id: 1,
      url: "https://placehold.jp/300x300.png",
      width: 300,
      height: 300,
    },
    favariteImageIds: [],
  },
};

export const Horizontal: Story = {
  args: {
    image: {
      id: 1,
      url: "https://placehold.jp/350x250.png",
      width: 350,
      height: 250,
    },
    favariteImageIds: [],
  },
};

export const Vertical: Story = {
  args: {
    image: {
      id: 1,
      url: "https://placehold.jp/250x350.png",
      width: 250,
      height: 350,
    },
    favariteImageIds: [],
  },
};

export const Mini: Story = {
  args: {
    image: {
      id: 1,
      url: "https://placehold.jp/200x200.png",
      width: 200,
      height: 200,
    },
    favariteImageIds: [],
  },
};
