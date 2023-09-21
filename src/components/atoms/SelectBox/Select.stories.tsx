import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import SelectBox from "@/components/atoms/SelectBox/SelectBox";

const meta = {
  title: "atoms/SelectBox",
  component: SelectBox,
} satisfies Meta<typeof SelectBox>;

export default meta;
type Story = StoryObj<typeof meta>;

const textSizeOptions = [
  { value: 36, label: "Small" },
  { value: 60, label: "Medium" },
  { value: 84, label: "Large" },
];

export const Default: Story = {
  args: {
    value: "",
    options: textSizeOptions,
    onChange: () => {},
  },
  render: function Component({ ...args }) {
    const [value, setValue] = useState(36);
    const handleOnChange = (value: string) => {
      setValue(Number(value));
    };
    return <meta.component {...args} value={value} onChange={handleOnChange} />;
  },
};
