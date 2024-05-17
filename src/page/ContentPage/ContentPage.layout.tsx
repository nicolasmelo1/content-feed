"use client";

import { ComponentProps, lazy, useState } from "react";

import { ContentsList } from "../../components";

const ContentsListLayout = lazy(
  () => import("../../components/ContentsList/ContentsList.layout")
);
export default function ContentPageLayout(
  props: Pick<ComponentProps<typeof ContentsList>, "contents"> & {
    __devIsStorybook?: boolean;
    openedContent?: string | null;
    fetchMoreContents: () => Promise<void>;
  }
) {
  const ContentsListToUse = ContentsListLayout || ContentsList;
  const [isLoading, setIsLoading] = useState(false);

  function fetchMoreContents() {
    setIsLoading(true);
    props
      .fetchMoreContents()
      .then(() => setIsLoading(false))
      .then(() => setIsLoading(false));
  }

  return props.contents.length <= 0 ? (
    <div className="flex flex-col items-center justify-center w-full h-[100vh] bg-yellow-100">
      <p>{"No content to show"}</p>
      <button
        className={isLoading ? "animate-pulse" : ""}
        style={{
          backgroundColor: "gray",
          color: "#fff",
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          borderRadius: "0.5rem",
        }}
        type={"button"}
        disabled={isLoading}
        onClick={(e) => {
          e.preventDefault();
          fetchMoreContents();
        }}
      >
        {"Retry"}
      </button>
    </div>
  ) : (
    <ContentsListToUse
      contents={props.contents}
      fetchNextPage={() => {
        setIsLoading(true);
        props
          .fetchMoreContents()
          .then(() => setIsLoading(false))
          .then(() => setIsLoading(false));
      }}
      isFetchingNextPage={isLoading}
      openedContent={props.openedContent}
    />
  );
}
