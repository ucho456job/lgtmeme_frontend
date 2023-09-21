import type { Meta, StoryObj } from "@storybook/react";
import InputFile from "@/components/atoms/InputFile/InputFile";

const meta = {
  title: "atoms/InputFile",
  component: InputFile,
} satisfies Meta<typeof InputFile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
