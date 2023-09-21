import type { Meta, StoryObj } from "@storybook/react";
import FileInput from "@/components/atoms/FileInput/FileInput";

const meta = {
  title: "atoms/FileInput",
  component: FileInput,
} satisfies Meta<typeof FileInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
