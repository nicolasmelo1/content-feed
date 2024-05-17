import Image from "next/image";
import { Fragment, useMemo } from "react";

import Comment from "../Comment/Comment.component";
import { getDifferenceBetweenDates } from "../../utils";

export type Content = {
  username: string;
  datetime: Date;
  imageUri: string;
  content: string;
  title: string;
  subtitle?: string;
  isSkeleton?: boolean;
  comments?: {
    text: string;
    username: string;
    imageUri: string;
    likes: number;
  }[];
};

export default function ContentCard(
  props: (
    | Content
    | {
        isSkeleton: boolean;
      }
  ) & {
    onClick?: () => void;
    fullContent?: boolean;
  }
) {
  const now = useMemo(() => new Date(), []);
  const propsAsContent = props as Content;
  const propsAsSkeleton = props as { isSkeleton: boolean };

  function getComments() {
    const shouldNotRenderComments =
      propsAsSkeleton.isSkeleton === true ||
      Array.isArray(propsAsContent.comments) === false ||
      propsAsContent.comments.length === 0;
    if (shouldNotRenderComments) return null;

    const propsAsContentComments =
      propsAsContent.comments as Required<Content>["comments"];

    if (props.fullContent)
      return propsAsContentComments.map((comment, index) => (
        <section key={index} className="mt-3">
          <Comment
            imageUri={comment.imageUri}
            likes={comment.likes}
            text={comment.text}
            username={comment.username}
          />
        </section>
      ));

    return (
      <section className="mt-3">
        <Comment
          imageUri={propsAsContentComments[0].imageUri}
          likes={propsAsContentComments[0].likes}
          text={propsAsContentComments[0].text}
          username={propsAsContentComments[0].username}
          isPreview={true}
        />
      </section>
    );
  }

  return (
    <button
      className={`text-start ${props.fullContent ? "max-h-[80vh] overflow-auto rounded-md" : "mt-3"} ${props.onClick === undefined ? "cursor-default" : ""}`}
      type="button"
      onClick={(e) => {
        e.preventDefault();
        if (propsAsSkeleton.isSkeleton) return;
        props?.onClick?.();
      }}
    >
      <article
        aria-label={`Post from ${propsAsContent.username} on ${Intl.DateTimeFormat("en-US").format(propsAsContent.datetime)}`}
        className={`bg-white flex justify-center flex-col p-3 rounded-md ${props.fullContent ? "w-[80vw] sm:w-[95vw] overflow-auto h-full" : "border-gray-200 border-[1px] max-w-96 min-w-96 max-h-[682px] overflow-hidden"} ${propsAsSkeleton.isSkeleton ? "animate-pulse" : ""}`}
      >
        <section className="flex flex-row w-full justify-between items-center">
          <h4
            className={`text-gray-800 font-bold text-sm ${propsAsSkeleton.isSkeleton ? "h-6 bg-slate-300 w-24 rounded-lg" : ""}`}
          >
            {propsAsSkeleton.isSkeleton ? "" : propsAsContent.username}
          </h4>
          <p
            className={`font-thin ${propsAsSkeleton.isSkeleton ? "h-6 bg-slate-300 w-16 rounded-lg" : ""}`}
          >
            {propsAsSkeleton.isSkeleton
              ? ""
              : `${getDifferenceBetweenDates(now, propsAsContent.datetime)} ago`}
          </p>
        </section>
        <section
          className={`w-full h-96 min-h-96 mt-3 rounded-3xl relative justify-center items-center ${propsAsSkeleton.isSkeleton ? "bg-slate-300" : ""}`}
        >
          {propsAsSkeleton.isSkeleton ? null : (
            <Image
              src={propsAsContent.imageUri}
              alt="Content"
              layout="fill"
              objectFit={props.fullContent ? "contain" : "cover"}
              className="rounded-3xl"
            />
          )}
        </section>
        <section className="flex flex-col w-full mt-3">
          <h1
            className={`font-bold text-lg ${propsAsSkeleton.isSkeleton ? "h-5 bg-slate-300 w-24 rounded-lg" : ""}`}
          >
            {propsAsSkeleton.isSkeleton ? "" : propsAsContent.title}
          </h1>
          <h2
            className={`flex w-full font-size italic text-sm ${propsAsSkeleton.isSkeleton ? "mt-2 h-4 bg-slate-300 w-32 rounded-md" : ""}`}
          >
            {propsAsSkeleton.isSkeleton ? "" : propsAsContent.subtitle}
          </h2>
        </section>
        <section className="mt-3">
          {propsAsSkeleton.isSkeleton ? (
            <Fragment>
              <div
                className={` ${propsAsSkeleton.isSkeleton ? "h-6 bg-slate-300 w-full rounded-lg" : ""}`}
              />
              <div
                className={` ${propsAsSkeleton.isSkeleton ? "mt-1 h-6 bg-slate-300 w-3/4 rounded-lg" : ""}`}
              />
            </Fragment>
          ) : (
            <p
              className={`${props.fullContent ? "" : "max-h-[4.5rem] overflow-hidden"} font-light`}
            >
              {propsAsSkeleton.isSkeleton ? "" : propsAsContent.content}
            </p>
          )}
        </section>
        {getComments()}
      </article>
    </button>
  );
}
