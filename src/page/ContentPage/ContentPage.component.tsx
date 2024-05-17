"use client";

import { ComponentProps, useState } from "react";

import ContentPageLayout from "./ContentPage.layout";

import type { ContentsList } from "../../components";

export default function ContentPage(
  props: Pick<ComponentProps<typeof ContentsList>, "contents"> & {
    openedContent?: string | null;
  }
) {
  const [contents, setContents] = useState(props.contents);

  async function fetchMoreContents() {
    const data = await fetch("/api/contents", { cache: "no-cache" }).then(
      (res) => res.json()
    );

    setContents((prevContents) => [...prevContents, ...(data?.data || [])]);
  }

  return (
    <ContentPageLayout
      contents={contents}
      openedContent={props.openedContent}
      fetchMoreContents={fetchMoreContents}
    />
  );
}
