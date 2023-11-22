import { NextResponse } from "next/server";
import { decode } from "base64-arraybuffer";
import { STORAGE_API_ENDPOINT } from "@/constants/endpoints";
import { GET_IMAGES_VALIDATION_ERROR, SUCCESS_STATUS } from "@/constants/exceptions";
import { ACTIVE_TAB_ID, CONFIRM, MAX_IMAGES_FETCH_COUNT } from "@/constants/image";
import { ValidationError, commonErrorHandler } from "@/utils/exceptions";
import prisma from "@/utils/prisma";
import { storage } from "@/utils/supabase";
import { generateRandomUuid, isUuid } from "@/utils/uuid";

const validateGetQuery = (query: GetImagesQuery) => {
  const { page, keyword, activeTabId, favoriteImageIds, confirm } = query;
  if (!Number.isInteger(page) || page < 0) {
    throw new ValidationError(GET_IMAGES_VALIDATION_ERROR.pageMessage);
  }
  if (keyword.length > 50) {
    throw new ValidationError(GET_IMAGES_VALIDATION_ERROR.keywordMessage);
  }
  if (!Object.values(ACTIVE_TAB_ID).includes(activeTabId)) {
    throw new ValidationError(GET_IMAGES_VALIDATION_ERROR.activeTabIdMessage);
  }
  if (!favoriteImageIds.every((id) => isUuid(id) || id === "")) {
    throw new ValidationError(GET_IMAGES_VALIDATION_ERROR.favoriteImageIdsMessage);
  }
  if (confirm !== CONFIRM.true && confirm !== CONFIRM.false) {
    throw new ValidationError(GET_IMAGES_VALIDATION_ERROR.confirmMessage);
  }
};

export const GET = async (req: Request) => {
  try {
    await prisma.$connect();
    const { searchParams } = new URL(req.url);
    const query: GetImagesQuery = {
      page: Number(searchParams.get("page")),
      keyword: String(searchParams.get("keyword")),
      activeTabId: searchParams.get("activeTabId") as ActiveTabId,
      favoriteImageIds: (searchParams.get("favoriteImageIds") || "").split(","),
      confirm: searchParams.get("confirm") as ImageConfirm,
    };
    validateGetQuery(query);
    const { page, keyword, activeTabId, favoriteImageIds, confirm } = query;
    const skip = page * MAX_IMAGES_FETCH_COUNT;

    const images = await prisma.image.findMany({
      select: { id: true, url: true, reported: true },
      skip,
      take: MAX_IMAGES_FETCH_COUNT,
      orderBy:
        activeTabId === ACTIVE_TAB_ID.popular
          ? [{ usedCount: "desc" }, { createdAt: "desc" }]
          : { createdAt: "desc" },
      where: {
        keyword: { contains: keyword },
        id: activeTabId === ACTIVE_TAB_ID.favorite ? { in: favoriteImageIds } : undefined,
        confirmed: confirm === CONFIRM.true ? false : undefined,
        reported: confirm === CONFIRM.true ? true : undefined,
      },
    });
    const resBody: GetImagesResBody = { images };
    return NextResponse.json(resBody, { status: SUCCESS_STATUS });
  } catch (error) {
    return commonErrorHandler(error);
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: Request) => {
  try {
    await prisma.$connect();
    const reqBody: PostImageReqBody = await req.json();
    const base64 = reqBody.image.split(",")[1];
    const id = generateRandomUuid();

    const { error } = await storage.upload(id, decode(base64), {
      contentType: "image/webp",
    });
    if (error) throw new Error("Image upload failed");

    const image = await prisma.image.create({
      select: { url: true },
      data: {
        id,
        url: process.env.NEXT_PUBLIC_SUPABASE_URL + STORAGE_API_ENDPOINT + "/" + id,
        keyword: reqBody.keyword,
      },
    });
    const resBody: PostImageResBody = { imageUrl: image.url };
    return NextResponse.json(resBody);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "POST request failed";
    return NextResponse.json({ errorMessage }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
