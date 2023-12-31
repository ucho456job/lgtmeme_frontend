import { NextResponse } from "next/server";
import { StorageError } from "@supabase/storage-js";
import { decode } from "base64-arraybuffer";
import { STORAGE_API_ENDPOINT } from "@/constants/endpoints";
import { CREATED_STATUS, OK_STATUS } from "@/constants/exceptions";
import {
  ACTIVE_TAB_ID_FAVORITE,
  ACTIVE_TAB_ID_POPULAR,
  ACTIVE_TAB_ID_TIME_LINE,
  MAX_IMAGES_FETCH_COUNT,
  MAX_KEYWORD_LENGTH,
  VALIDATION_ERROR_MESAGE_ACTIVE_TAB_ID,
  VALIDATION_ERROR_MESAGE_FAVORITE_IMAGE_IDS,
  VALIDATION_ERROR_MESAGE_IMAGE,
  VALIDATION_ERROR_MESAGE_KEYWORD,
  VALIDATION_ERROR_MESAGE_PAGE,
} from "@/constants/image";
import { ValidationError, adjustErrorResponse } from "@/utils/exceptions";
import { handleErrorLogging } from "@/utils/logger";
import prisma from "@/utils/prisma";
import { storage } from "@/utils/supabase";
import { generateRandomUuid, isUuid } from "@/utils/uuid";

const validateGetQuery = (query: GetImagesQuery): string | null => {
  const { page, keyword, activeTabId, favoriteImageIds } = query;
  if (!Number.isInteger(page) || page < 0) {
    return VALIDATION_ERROR_MESAGE_PAGE;
  }
  if (keyword.length > MAX_KEYWORD_LENGTH) {
    return VALIDATION_ERROR_MESAGE_KEYWORD;
  }
  if (
    ![ACTIVE_TAB_ID_TIME_LINE, ACTIVE_TAB_ID_POPULAR, ACTIVE_TAB_ID_FAVORITE].includes(activeTabId)
  ) {
    return VALIDATION_ERROR_MESAGE_ACTIVE_TAB_ID;
  }
  if (!favoriteImageIds.every((id) => isUuid(id) || id === "")) {
    return VALIDATION_ERROR_MESAGE_FAVORITE_IMAGE_IDS;
  }
  return null;
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
      isAuthCheck: searchParams.get("isAuthCheck") ? true : false,
    };
    const validateMessage = validateGetQuery(query);
    if (validateMessage) throw new ValidationError(validateMessage);
    const { page, keyword, activeTabId, favoriteImageIds, isAuthCheck } = query;
    const skip = page * MAX_IMAGES_FETCH_COUNT;

    const images = await prisma.image.findMany({
      select: { id: true, url: true, reported: true },
      skip,
      take: MAX_IMAGES_FETCH_COUNT,
      orderBy:
        activeTabId === ACTIVE_TAB_ID_POPULAR
          ? [{ usedCount: "desc" }, { createdAt: "desc" }]
          : { createdAt: "desc" },
      where: {
        keyword: { contains: keyword },
        id: activeTabId === ACTIVE_TAB_ID_FAVORITE ? { in: favoriteImageIds } : undefined,
        confirmed: isAuthCheck ? false : undefined,
        reported: isAuthCheck ? true : undefined,
      },
    });
    const resBody: GetImagesResponseBody = { images };
    return NextResponse.json(resBody, { status: OK_STATUS });
  } catch (error) {
    const { name, message, status } = adjustErrorResponse(error);
    handleErrorLogging(status, error);
    return NextResponse.json({ name, message }, { status });
  } finally {
    await prisma.$disconnect();
  }
};

const validatePostRequestBody = (reqBody: PostImageRequestBody): string | null => {
  const { image, keyword } = reqBody;
  if (typeof image !== "string" || !image.startsWith("data:image/webp;base64")) {
    return VALIDATION_ERROR_MESAGE_IMAGE;
  }
  if (typeof keyword !== "string" || keyword.length > MAX_KEYWORD_LENGTH) {
    return VALIDATION_ERROR_MESAGE_KEYWORD;
  }
  return null;
};

export const POST = async (req: Request) => {
  try {
    await prisma.$connect();
    const reqBody: PostImageRequestBody = await req.json();
    const validateMessage = validatePostRequestBody(reqBody);
    if (validateMessage) throw new ValidationError(validateMessage);
    const base64 = reqBody.image.split(",")[1];
    const id = generateRandomUuid();

    const { error: storageError } = await storage.upload(id, decode(base64), {
      contentType: "image/webp",
    });
    if (storageError) {
      const { name, message, status } = adjustErrorResponse(storageError);
      handleErrorLogging(status, storageError);
      return NextResponse.json({ name, message }, { status });
    }

    try {
      const image = await prisma.image.create({
        select: { url: true },
        data: {
          id,
          url: process.env.NEXT_PUBLIC_SUPABASE_URL + STORAGE_API_ENDPOINT + "/" + id,
          keyword: reqBody.keyword,
        },
      });
      const resBody: PostImageResponseBody = { imageUrl: image.url };
      return NextResponse.json(resBody, { status: CREATED_STATUS });
    } catch (prismaError) {
      const { error: storageError } = await storage.remove([`${id}`]);
      const { name, message, status } = adjustErrorResponse(storageError || prismaError);
      handleErrorLogging(status, storageError || prismaError);
      return NextResponse.json({ name, message }, { status });
    }
  } catch (error) {
    const { name, message, status } = adjustErrorResponse(error);
    handleErrorLogging(status, error);
    return NextResponse.json({ name, message }, { status });
  } finally {
    await prisma.$disconnect();
  }
};
