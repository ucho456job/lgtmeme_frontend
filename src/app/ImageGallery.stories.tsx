import type { Meta, StoryObj } from "@storybook/react";
import ImageGallery from "@/app/ImageGallery";
import { css } from "@@/styled-system/css";

const meta = {
  title: "app/ImageGallery",
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
        url: "https://placehold.jp/300x300.png",
        width: 300,
        height: 300,
      },
      {
        id: 2,
        url: "https://placehold.jp/300x300.png",
        width: 300,
        height: 300,
      },
      {
        id: 3,
        url: "https://placehold.jp/300x300.png",
        width: 300,
        height: 300,
      },
      {
        id: 4,
        url: "https://placehold.jp/300x300.png",
        width: 300,
        height: 300,
      },
      {
        id: 5,
        url: "https://placehold.jp/300x300.png",
        width: 300,
        height: 300,
      },
      {
        id: 6,
        url: "https://placehold.jp/300x300.png",
        width: 300,
        height: 300,
      },
    ],
  },
};
