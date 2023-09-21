import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Tabs from "@/components/atoms/Tabs/Tabs";

const meta = {
  title: "atoms/Tabs",
  component: Tabs,
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tabs: [
      { id: "timeLine", label: "Time line" },
      { id: "popular", label: "Popular" },
      { id: "favorite", label: "Favorite" },
    ],
    value: "",
  },
  render: function Component({ ...args }) {
    const [value, setValue] = useState("timeLine");
    return <meta.component {...args} value={value} onClick={setValue} />;
  },
};
