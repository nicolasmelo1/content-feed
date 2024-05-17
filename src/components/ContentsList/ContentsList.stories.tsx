import type { Meta, StoryObj } from "@storybook/react";
import { ComponentProps, useEffect, useState } from "react";

import ContentsList from "./ContentsList.component";
import { getMockedContents } from "../../utils";
import { Content } from "../ContentCard/ContentCard.component";

const Wrapper = () => {
  const [contents, setContents] = useState<
    ComponentProps<typeof ContentsList>["contents"]
  >(
    getMockedContents(10, 0, true, true) as ComponentProps<
      typeof ContentsList
    >["contents"]
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setContents(
        getMockedContents(100, 0, false, true) as ComponentProps<
          typeof ContentsList
        >["contents"]
      );
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <ContentsList
      contents={contents}
      fetchNextPage={() => {
        setIsLoading(true);
        setTimeout(() => {
          setContents((prevContents) => [
            ...prevContents,
            ...(getMockedContents(
              100,
              prevContents.length,
              false,
              true
            ) as ComponentProps<typeof ContentsList>["contents"]),
          ]);
          setIsLoading(false);
        }, 2000);
      }}
      isFetchingNextPage={isLoading}
    />
  );
};

const meta = {
  title: "Components/ContentsList",
  component: Wrapper,
} satisfies Meta<typeof Wrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
