import type { Meta, StoryObj } from "@storybook/react";
import TextBox from "@/components/atoms/TextBox";

const meta = {
  title: "atoms/TextBox",
  component: TextBox,
} satisfies Meta<typeof TextBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Placeholder",
    onEnterPress: () => window.alert("Press enter key!"),
  },
};

export const WithIcon: Story = {
  args: {
    placeholder: "Placeholder",
    iconPath: "/images/search.svg",
  },
};
