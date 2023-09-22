import type { Meta, StoryObj } from "@storybook/react";
import InputColor from "@/components/atoms/InputColor/InputColor";
import SelectBox from "@/components/atoms/SelectBox/SelectBox";
import Form from "@/components/molecules/Form/Form";

const meta = {
  title: "molecules/Form",
  component: Form,
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

const textSizeOptions = [
  { value: 36, label: "Small" },
  { value: 60, label: "Medium" },
  { value: 84, label: "Large" },
];

export const Color: Story = {
  args: {
    label: "Label",
    isUnderLine: true,
    children: <InputColor value={"#ffffff"} onChange={() => {}} />,
  },
};

export const Select: Story = {
  args: {
    label: "Label",
    isUnderLine: true,
    children: <SelectBox value="36" options={textSizeOptions} onChange={() => {}} />,
  },
};
