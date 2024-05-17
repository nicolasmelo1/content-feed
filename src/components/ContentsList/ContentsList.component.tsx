import { useRef, useEffect, useState, Fragment } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

import ContentCard, {
  type Content,
} from "../ContentCard/ContentCard.component";

export default function ContentsList(props: {
  contents: Content[];
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}) {
  const [openedContent, setOpenedContent] = useState<Content | null>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: props.contents.length + 1,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 324,
    overscan: 5,
  });

  const items = rowVirtualizer.getVirtualItems();

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
              title={openedContent.title}
              subtitle={openedContent.subtitle}
              content={openedContent.content}
              comments={openedContent.comments}
              fullContent={true}
            />
          </div>
          <div
            className="absolute top-0 left-0 bottom-0 right-0 z-20 w-full h-full bg-black opacity-50"
            aria-label="Close content"
            role="button"
            onClick={() => setOpenedContent(null)}
          />
        </div>
      ) : null}
      <div
        ref={parentRef}
        className="flex flex-col items-center justify-center w-full h-[97vh] overflow-auto bg-yellow-100 scroll-smooth"
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
                      title={content.title}
                      subtitle={content.subtitle}
                      content={content.content}
                      comments={content.comments}
                      onClick={() => setOpenedContent(content)}
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
