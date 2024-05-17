"use client";

import ContentsListLayout from "./ContentsList.layout";
import { type Content } from "../ContentCard/ContentCard.component";
import { useRouter } from "next/navigation";

export default function ContentsList(props: {
  openedContent?: string | null;
  contents: (Omit<Content, "datetime"> & { datetime: string })[];
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}) {
  const router = useRouter();
  return (
    <ContentsListLayout
      {...props}
      onOpenContent={(content) => {
        const url = new URL(window.location.href);
        if (content === undefined) {
          url.searchParams.delete("content");
          router.replace(url.href);
          return;
        }

        url.searchParams.append(
          "content",
          window.btoa(JSON.stringify(content))
        );
        router.push(url.href);
      }}
      openedContent={props.openedContent}
    />
  );
}
