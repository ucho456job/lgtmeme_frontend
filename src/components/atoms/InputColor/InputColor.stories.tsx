import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import InputColor from "@/components/atoms/InputColor/InputColor";

const meta = {
  title: "atoms/InputColor",
  component: InputColor,
} satisfies Meta<typeof InputColor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "#ffffff",
  },
  render: function Component({ ...args }) {
    const [value, setValue] = useState("#ffffff");
    const handleOnChange = (value: string) => {
      setValue(value);
    };
    return <meta.component {...args} value={value} onChange={handleOnChange} />;
  },
};
