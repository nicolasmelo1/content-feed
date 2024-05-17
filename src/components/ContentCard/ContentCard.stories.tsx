import type { Meta, StoryObj } from "@storybook/react";

import ContentCard from "./ContentCard.component";

const meta = {
  title: "Components/ContentCard",
  component: ContentCard,
} satisfies Meta<typeof ContentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    username: "John Doe",
    datetime: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - 2,
      23,
      13,
      34
    ),
    imageUri: "https://picsum.photos/1024/1024",
    content: "Content Card component",
    title: "Title",
    subtitle: "Subtitle",
    comments: [
      {
        username: "Barack Obama",
        imageUri: "https://picsum.photos/1024/1024",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget scelerisque quam, quis sagittis purus. Duis lobortis mauris a tortor eleifend posuere. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam ullamcorper ut est vel euismod. In id tincidunt eros. Pellentesque ante lectus, facilisis sed gravida malesuada, lacinia rutrum enim. Pellentesque ultricies eros id nibh eleifend accumsan. Aenean maximus hendrerit dignissim.",
        likes: 2,
      },
    ],
  },
};

export const WithoutComment: Story = {
  args: {
    username: "John Doe",
    datetime: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - 2,
      23,
      13,
      34
    ),
    imageUri: "https://picsum.photos/1024/1024",
    content: "Content Card component",
    title: "Title",
    subtitle: "Subtitle",
  },
};

export const Skeleton: Story = {
  args: {
    isSkeleton: true,
  },
};

export const FullContent: Story = {
  args: {
    username: "John Doe",
    datetime: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - 2,
      23,
      13,
      34
    ),
    imageUri: "https://picsum.photos/1024/1024",
    content: "Content Card component",
    title: "Title",
    subtitle: "Subtitle",
    fullContent: true,
  },
};
