import type { Meta, StoryObj } from "@storybook/react";
import Button from "@/components/atoms/Button/Button";
import Svg from "@/components/atoms/Svg/Svg";
import { css } from "@@/styled-system/css";

const meta = {
  title: "atoms/Button",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithIcon: Story = {
  args: {
    icon: <Svg css={css({ marginRight: "1" })} icon="upload" color="white" />,
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
