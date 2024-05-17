import Image from "next/image";

import { formatNumberIntoReadableString } from "../../utils";

export default function Comment(props: {
  username: string;
  imageUri: string;
  text: string;
  likes: number;
  isPreview?: boolean;
}) {
  return (
    <article
      className={`flex  flex-col ${props.isPreview ? "overflow-hidden flex-nowrap w-full" : "w-11/12 sm:w-full"}`}
    >
      <div
        className={`flex flex-row justify-start p-3 bg-gray-100 rounded-3xl ${props.isPreview ? "items-center" : "items-start"}`}
      >
        <div className="relative min-w-10 max-w-10 min-h-10 max-h-10 bg-blue-400 rounded-full">
          <Image
            src={props.imageUri}
            alt="User"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <div className="flex flex-row items-start justify-between w-full">
          <section
            className={`flex flex-col ml-3 w-full ${props.isPreview ? "overflow-hidden" : ""}`}
          >
            <h1 className="whitespace-nowrap text-ellipsis overflow-hidden font-bold">
              {props.username}
            </h1>
            <p
              className={`font-light ${props.isPreview ? "whitespace-nowrap text-ellipsis overflow-hidden" : ""}`}
            >
              {props.text}
            </p>
          </section>
          {props.isPreview ? null : (
            <section className="flex flex-row items-center justify-between">
              <p className="mr-2 text-sm font-thin">
                {formatNumberIntoReadableString(props.likes)}
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 100 100"
                stroke={"red"}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke={"red"}
                  strokeWidth={6}
                  d="m 31,11.375 c -14.986319,0 -25,12.30467 -25,26 0,12.8493 7.296975,23.9547 16.21875,32.7188 8.921775,8.764 19.568704,15.2612 26.875,19.0312 a 2.0002,2.0002 0 0 0 1.8125,0 c 7.306296,-3.77 17.953225,-10.2672 26.875,-19.0312 C 86.703025,61.3297 94,50.2243 94,37.375 c 0,-13.69533 -10.013684,-26 -25,-26 -8.834204,0 -14.702885,4.50444 -19,10.59375 C 45.702885,15.87944 39.834204,11.375 31,11.375 z"
                />
              </svg>
            </section>
          )}
        </div>
      </div>
    </article>
  );
}
