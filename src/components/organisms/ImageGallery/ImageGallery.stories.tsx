import type { Meta, StoryObj } from "@storybook/react";
import ImageGallery from "@/components/organisms/ImageGallery";
import { css } from "@@/styled-system/css";

const meta = {
  title: "organisms/ImageGallery",
  component: ImageGallery,
} satisfies Meta<typeof ImageGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    css: css({ maxWidth: "1090px", margin: "auto" }),
    initImages: [
      {
        id: 1,
        title: "Square 1",
        url: "https://placehold.jp/300x300.png",
        width: 300,
        height: 300,
      },
      {
        id: 2,
        title: "Square 2",
        url: "https://placehold.jp/300x300.png",
        width: 300,
        height: 300,
      },
      {
        id: 3,
        title: "Square 3",
        url: "https://placehold.jp/300x300.png",
        width: 300,
        height: 300,
      },
      {
        id: 4,
        title: "Square 4",
        url: "https://placehold.jp/300x300.png",
        width: 300,
        height: 300,
      },
      {
        id: 5,
        title: "Square 5",
        url: "https://placehold.jp/300x300.png",
        width: 300,
        height: 300,
      },
      {
        id: 6,
        title: "Square 6",
        url: "https://placehold.jp/300x300.png",
        width: 300,
        height: 300,
      },
    ],
  },
};
