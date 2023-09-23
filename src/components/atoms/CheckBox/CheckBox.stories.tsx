import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import CheckBox from "@/components/atoms/CheckBox/CheckBox";

const meta = {
  title: "atoms/CheckBox",
  component: CheckBox,
} satisfies Meta<typeof CheckBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Label",
    checked: false,
  },
  render: function Component({ ...args }) {
    const [value, setValue] = useState(false);
    const handleOnChange = () => {
      setValue((prev) => !prev);
    };
    return <meta.component {...args} checked={value} onChange={handleOnChange} />;
  },
};
