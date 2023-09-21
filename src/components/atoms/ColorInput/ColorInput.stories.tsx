import type { Meta, StoryObj } from "@storybook/react";
import ColorInput from "@/components/atoms/ColorInput/ColorInput";

const meta = {
  title: "atoms/ColorInput",
  component: ColorInput,
} satisfies Meta<typeof ColorInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "",
  },
};
