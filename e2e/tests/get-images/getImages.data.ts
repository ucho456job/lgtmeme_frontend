import prisma from "../../../src/utils/prisma";
import { v4 as uuid } from "uuid";

const createImages = (imageCount: number) => {
  const commonProp = {
    url: "https://placehold.jp/300x300.png",
    usedCount: 0,
    keyword: "thanks",
    reported: false,
  };
  const images = Array(imageCount)
    .fill(null)
    .map((_, i) => ({
      ...commonProp,
      id: uuid(),
      createdAt: new Date(2023, 7, i + 1),
    }));
  return images;
};

export const prepareData = {
  case1: async () => {
    const images = createImages(10);
    await prisma.image.createMany({ data: images });
  },
  case2: async () => {
    const images = createImages(18);
    await prisma.image.createMany({ data: images });
  },
  case3: async () => {
    const images = createImages(2);
    images[1].keyword = "happy";
    await prisma.image.createMany({ data: images });
  },
  case4: async () => {
    const images = createImages(2);
    images[0].url = "https://placehold.jp/200x200.png";
    images[0].usedCount = 1;
    await prisma.image.createMany({ data: images });
  },
  case5_6_7: async () => {
    const images = createImages(1);
    await prisma.image.createMany({ data: images });
  },
};
