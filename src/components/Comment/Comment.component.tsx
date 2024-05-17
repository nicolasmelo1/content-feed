import Image from "next/image";

export default function Comment(props: {
  username: string;
  imageUri: string;
  text: string;
  likes: number;
  isPreview?: boolean;
}) {
  return (
    <article
      className={`flex w-full flex-col ${props.isPreview ? "overflow-hidden flex-nowrap" : ""}`}
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
        <section
          className={`flex flex-col ml-3 w-full ${props.isPreview ? "overflow-hidden" : ""}`}
        >
          <h1 className="whitespace-nowrap text-ellipsis overflow-hidden font-bold">
            {props.username}
          </h1>
          <p
            className={`${props.isPreview ? "whitespace-nowrap text-ellipsis overflow-hidden" : ""}`}
          >
            {props.text}
          </p>
        </section>
      </div>
    </article>
  );
}
