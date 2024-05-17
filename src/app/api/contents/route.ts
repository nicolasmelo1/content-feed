import z from "zod";

import envClientSchema from "../../../utils/constants";

export const schema = z.array(
  z.object({
    id: z.string(),
    imageUri: z.string(),
    metadata: z.object({ priority: z.number(), publishDate: z.string() }),
    comments: z.array(
      z.union([
        z.object({
          text: z.string(),
          likes: z.number(),
          profilePic: z.string(),
          author: z.string(),
        }),
        z.object({
          text: z.string(),
          profilePic: z.string(),
          author: z.string(),
          likes: z.number(),
        }),
        z.object({
          profilePic: z.string(),
          text: z.string(),
          author: z.string(),
          likes: z.number(),
        }),
        z.object({
          author: z.string(),
          profilePic: z.string(),
          text: z.string(),
          likes: z.number(),
        }),
      ])
    ),
    textData: z.object({
      author: z.object({ first: z.string(), last: z.string() }),
      body: z.string(),
      title: z.string(),
      subTitle: z.string(),
    }),
  })
);

export async function GET() {
  const url = new URL(
    envClientSchema.API_HOST + "/mocks/engine/fullstack-spec/52502230/content"
  );
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      Prefer: "code=200, dynamic=true",
    },
  });

  if (!response.ok)
    return Response.json({
      success: false,
      reason: "no_data",
      data: [],
    });

  const data = await response.json();
  const {
    success,
    error,
    data: parsedData,
  } = schema.safeParse(data?.contentCards || []);

  if (!success)
    return Response.json({
      success: false,
      reason: "invalid_data_from_api",
      data: [],
      error,
    });

  const orderedByPriority = parsedData
    .map((content) => {
      return {
        id: content.id,
        datetime: content.metadata.publishDate,
        imageUri: content.imageUri,
        content: content.textData.body,
        title: content?.textData?.title || "",
        subtitle: content?.textData?.subTitle || "",
        priority: content?.metadata?.priority,
        username: `${content?.textData?.author?.first} ${content?.textData?.author?.last || ""}`,
        comments: content.comments.map((comment) => ({
          text: comment.text,
          likes: comment.likes,
          imageUri: comment.profilePic,
          username: comment.author,
        })),
      };
    })
    .sort((a, b) => b.priority - a.priority);

  return Response.json({
    success: true,
    data: orderedByPriority,
  });
}
