"use client";
import { ComponentProps, useState } from "react";

import { ContentsList } from "../../components";

export default function ContentPage(
  props: Pick<ComponentProps<typeof ContentsList>, "contents">
) {
  const [contents, setContents] = useState(props.contents);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchMoreContents() {
    const data = await fetch("/api/contents", { cache: "no-cache" }).then(
      (res) => res.json()
    );

    setContents((prevContents) => [...prevContents, ...(data?.data || [])]);
  }

  return (
    <ContentsList
      contents={contents}
      fetchNextPage={() => {
        setIsLoading(true);
        console.log("fetching more contents...");
        fetchMoreContents().then(() => setIsLoading(false));
      }}
      isFetchingNextPage={isLoading}
    />
  );
}
