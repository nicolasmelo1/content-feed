import { ComponentProps, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within, expect, queries } from "@storybook/test";

import ContentPage from "./ContentPage.layout";
import { getMockedContents } from "../../utils";

const Wrapper = (props: {
  contents?: ComponentProps<typeof ContentPage>["contents"];
}) => {
  const [contents, setContents] = useState<
    ComponentProps<typeof ContentPage>["contents"]
  >(
    (props.contents ||
      getMockedContents(100, 0, false, true)) as ComponentProps<
      typeof ContentPage
    >["contents"]
  );

  return (
    <ContentPage
      contents={contents}
      __devIsStorybook={true}
      fetchMoreContents={() => {
        return new Promise((resolve, reject) =>
          setTimeout(() => {
            setContents((prevContents) => [
              ...prevContents,
              ...(getMockedContents(
                100,
                prevContents.length,
                false,
                true
              ) as ComponentProps<typeof ContentPage>["contents"]),
            ]);
            resolve();
          }, 2000)
        );
      }}
    />
  );
};

const meta = {
  title: "pages/ContentPage",
  component: Wrapper,
} satisfies Meta<typeof Wrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Empty: Story = {
  args: {
    contents: [],
  },
};

export const WithTests: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement, {
      ...queries,
      getAllByTag: (container: HTMLElement, tag: string) =>
        container.querySelectorAll(tag),
      scrollToBottom: (container: HTMLElement) => {
        (container as any).firstChild.scrollTo(
          0,
          (container as any).firstChild.scrollHeight
        );
        return new Promise((resolve) => setTimeout(resolve, 1000));
      },
    });

    const contentsContainer = canvas.getAllByTag("div")[0];
    await userEvent.click(canvas.getAllByRole("button")[0]);

    await expect(canvas.getAllByText("Content 1")[0].tagName).toBe("H1");
    await expect(canvas.getAllByText("Content 1")[1].tagName).toBe("P");
    await expect(canvas.getAllByTag("div")[0]).not.toBe(contentsContainer);
    await userEvent.keyboard("{Escape}");

    await expect(canvas.getAllByTag("div")[0]).toBe(contentsContainer);

    for (let i = 0; i < 18; i++) {
      await canvas.scrollToBottom();
    }

    await expect(
      canvas.getAllByRole("button")[0].querySelector("h1")?.textContent
    ).toBe("Content 96");
  },
};
