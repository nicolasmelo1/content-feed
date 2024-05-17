"use client";

import { useRef, useEffect, useState, Fragment, useMemo } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

import ContentCard, {
  type Content,
} from "../ContentCard/ContentCard.component";

export default function ContentsListLayout(props: {
  openedContent?: string | null;
  onOpenContent?: (
    content?: Omit<Content, "datetime"> & { datetime: string }
  ) => void;
  contents: (Omit<Content, "datetime"> & { datetime: string })[];
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}) {
  const openedContentParsed = useMemo(() => {
    if (!props.openedContent) return null;
    const parsedAfterDecode =
      typeof window !== "undefined"
        ? window.atob(props.openedContent)
        : Buffer.from(props.openedContent, "base64").toString();
    try {
      return JSON.parse(parsedAfterDecode);
    } catch {
      return null;
    }
  }, [props.openedContent]);
  const [openedContent, setOpenedContent] = useState<
    (Omit<Content, "datetime"> & { datetime: string }) | null
  >(openedContentParsed);
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: props.contents.length + 1,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 324,
    overscan: 5,
  });

  const items = rowVirtualizer.getVirtualItems();

  function onCloseContent() {
    setOpenedContent(null);
    props.onOpenContent?.();
  }

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseContent();
    };
    if (openedContent) document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openedContent, props.onOpenContent]);

  useEffect(() => {
    const [lastItem] = [...items].reverse();

    if (!lastItem) return;
    if (
      lastItem.index >= props.contents.length - 1 &&
      !props.isFetchingNextPage
    ) {
      props.fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.isFetchingNextPage,
    props.fetchNextPage,
    props.contents.length,
    items,
  ]);

  return (
    <Fragment>
      {openedContent ? (
        <div className="absolute z-10 top-0 left-0 bottom-0 w-full h-full flex items-center justify-center">
          <div className="absolute z-30 flex items-center justify-center">
            <ContentCard
              {...openedContent}
              datetime={new Date(openedContent.datetime)}
              onClose={() => onCloseContent()}
              fullContent={true}
            />
          </div>
          <div
            className="absolute top-0 left-0 bottom-0 right-0 z-20 w-full h-full bg-black opacity-50"
            aria-label="Close content"
            role="button"
            onClick={() => onCloseContent()}
          />
        </div>
      ) : null}
      <div
        ref={parentRef}
        className="flex flex-col items-center justify-center w-full h-[100vh] overflow-auto bg-yellow-100 scroll-smooth"
      >
        <div
          className={`w-full relative`}
          style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
        >
          <div
            className={`absolute top-0 left-0 w-full flex flex-col items-center justify-center`}
            style={{
              transform: `translateY(${items[0]?.start ?? 0}px)`,
            }}
          >
            {items.map((virtualRow) => {
              const content = props.contents[virtualRow.index];
              return (
                <div
                  key={virtualRow.key}
                  data-index={virtualRow.index}
                  ref={rowVirtualizer.measureElement}
                >
                  {content ? (
                    <ContentCard
                      {...content}
                      datetime={new Date(content.datetime)}
                      onClick={() => {
                        setOpenedContent(content);
                        props.onOpenContent?.(content);
                      }}
                    />
                  ) : (
                    <ContentCard isSkeleton={true} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
