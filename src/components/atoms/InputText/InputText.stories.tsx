import type { Meta, StoryObj } from "@storybook/react";
import InputText from "@/components/atoms/InputText/InputText";
import Svg from "@/components/atoms/Svg/Svg";

const meta = {
  title: "atoms/InputText",
  component: InputText,
} satisfies Meta<typeof InputText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithIcon: Story = {
  args: {
    placeholder: "Placeholder",
    icon: <Svg icon="search" size="md" />,
  },
};
