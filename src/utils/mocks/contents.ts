import { use } from "react";
import { getRandomInt } from "../random";

export default function getMockedContents(
  numberOfContents = 10,
  from = 0,
  isSkeleton = false
) {
  return Array.from({ length: numberOfContents }, (_, i) => {
    const index = i + from;
    return {
      id: index,
      title: `Content ${index + 1}`,
      imageUri: `https://picsum.photos/seed/${index}/200/300`,
      datetime: new Date(Date.now() - getRandomInt(1000000000)),
      username: `User ${index + 1}`,
      isSkeleton: isSkeleton ? true : false,
      content: `Content ${index + 1}`,
      comments: Array.from({ length: getRandomInt(10) }, (_, commentIndex) => ({
        id: commentIndex,
        text: `Comment ${commentIndex + 1} for Content ${index + 1}`,
        imageUri: `https://picsum.photos/seed/${commentIndex}/200/300`,
        username: `User ${commentIndex + 1}`,
        likes: commentIndex + 1,
      })),
    };
  });
}
