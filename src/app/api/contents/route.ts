import z from "zod";

import envClientSchema from "../../../utils/constants";

const schema = z.array(
  z.object({
    id: z.string(),
    imageUri: z.string(),
    metadata: z.object({ priority: z.number(), publishDate: z.string() }),
    comments: z.array(
      z.object({
        text: z.string(),
        likes: z.number(),
        profilePic: z.string(),
        author: z.string(),
      })
    ),
    textData: z.object({
      author: z.object({ first: z.string(), last: z.string() }),
      body: z.string(),
      title: z.string(),
      subTitle: z.string(),
    }),
  })
);

/**
 * @swagger
 * /api/contents:
 *   get:
 *     description: Returns the contents from the external API sorted by priority and formatted for the frontend.
 *     responses:
 *       200:
 *         description: A list of contents alongside if the request was successful or not.
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  description: If the request was successful or not.
 *                  example: true
 *                data:
 *                  type: array
 *                  description: The list of contents.
 *                  example: [{ id: "ffdac74b-1d25-3250-08b4-91f58905dc4a", datetime: "2021-09-01T00:00:00.000Z", imageUri: "https://example.com/image.jpg", content: "This is the content", title: "Title", subtitle: "Subtitle", priority: 1, username: "John Doe", comments: [{ text: "This is a comment", likes: 1, imageUri: "https://example.com/image.jpg", username: "Jane Doe" }] }]
 *
 */
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

  try {
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
  } catch (error) {
    return Response.json({
      success: false,
      reason: "invalid_data_from_api",
      data: [],
      error,
    });
  }
}
