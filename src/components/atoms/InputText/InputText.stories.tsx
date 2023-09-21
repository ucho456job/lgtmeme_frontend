import type { Meta, StoryObj } from "@storybook/react";
import InputText from "@/components/atoms/InputText/InputText";
import SearchSvg from "@/components/svgs/SearchSvg";

const meta = {
  title: "atoms/InputText",
  component: InputText,
} satisfies Meta<typeof InputText>;

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
    icon: <SearchSvg />,
  },
};
