import prisma from "../prisma";
import { v4 as uuid } from "uuid";

const createImages = (keywordMap: Record<string, number>) => {
  const commonProp = {
    url: "https://placehold.jp/300x300.png",
    usedCount: 0,
    reported: false,
    createdAt: new Date(2023, 7, 1),
  };
  const images = Object.entries(keywordMap).flatMap(([keyword, count]) =>
    Array(count)
      .fill(null)
      .map(() => ({
        ...commonProp,
        id: uuid(),
        keyword,
      })),
  );
  return images;
};

export const prepareData = {
  case1: async () => {
    const keywordMap = { thanks: 10 };
    const images = createImages(keywordMap);
    await prisma.image.createMany({ data: images });
  },
  case2: async () => {
    const keywordMap = { thanks: 18 };
    const images = createImages(keywordMap);
    await prisma.image.createMany({ data: images });
  },
  case3: async () => {
    const keywordMap = { thanks: 1, happy: 1 };
    const images = createImages(keywordMap);
    await prisma.image.createMany({ data: images });
  },
};
