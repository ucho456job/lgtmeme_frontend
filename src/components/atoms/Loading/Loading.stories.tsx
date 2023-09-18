import type { Meta, StoryObj } from "@storybook/react";
import Loading from "@/components/atoms/Loading";

const meta = {
  title: "atoms/Loading",
  component: Loading,
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
