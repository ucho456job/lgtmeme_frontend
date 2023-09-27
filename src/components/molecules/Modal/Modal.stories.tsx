import type { Meta, StoryObj } from "@storybook/react";
import Modal from "@/components/molecules/Modal/Modal";

const meta = {
  title: "molecules/Modal",
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: "Success! Create LGTM image!",
    show: true,
  },
};
