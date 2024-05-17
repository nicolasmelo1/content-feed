import type { Meta, StoryObj } from "@storybook/react";

import Comment from "./Comment.component";

const meta = {
  title: "Components/Comment",
  component: Comment,
} satisfies Meta<typeof Comment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    username: "John Doe",
    imageUri: "https://picsum.photos/1024/1024",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget scelerisque quam, quis sagittis purus. Duis lobortis mauris a tortor eleifend posuere. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam ullamcorper ut est vel euismod. In id tincidunt eros. Pellentesque ante lectus, facilisis sed gravida malesuada, lacinia rutrum enim. Pellentesque ultricies eros id nibh eleifend accumsan. Aenean maximus hendrerit dignissim.",
    likes: 2,
  },
};

export const Preview: Story = {
  args: {
    username: "John Doe",
    imageUri: "https://picsum.photos/1024/1024",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget scelerisque quam, quis sagittis purus. Duis lobortis mauris a tortor eleifend posuere. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam ullamcorper ut est vel euismod. In id tincidunt eros. Pellentesque ante lectus, facilisis sed gravida malesuada, lacinia rutrum enim. Pellentesque ultricies eros id nibh eleifend accumsan. Aenean maximus hendrerit dignissim.",
    likes: 2,
    isPreview: true,
  },
};
