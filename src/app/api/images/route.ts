import { NextResponse } from "next/server";
import { decode } from "base64-arraybuffer";
import { v4 as uuid } from "uuid";
import { STORAGE_API_ENDPOINT } from "@/constants/endpoints";
import { MAX_IMAGES_FETCH_COUNT } from "@/constants/image";
import prisma from "@/utils/client";
import { uploadStorage } from "@/utils/supabase";

export const GET = async (req: Request) => {
  try {
    await prisma.$connect();
    const { searchParams } = new URL(req.url);
    const query: GetImageQuery = {
      page: Number(searchParams.get("page")),
      keyword: String(searchParams.get("keyword")),
      activeTabId: searchParams.get("activeTabId") as ActiveTabId,
      favariteImageIds: (searchParams.get("favariteImageIds") || "").split(","),
    };
    const { page, keyword, activeTabId, favariteImageIds } = query;
    const skip = page * MAX_IMAGES_FETCH_COUNT;

    const images = await prisma.image.findMany({
      select: { id: true, url: true },
      skip,
      take: MAX_IMAGES_FETCH_COUNT,
      orderBy:
        activeTabId === "popular"
          ? [{ usedCount: "desc" }, { createdAt: "desc" }]
          : { createdAt: "desc" },
      where: {
        keyword: { contains: keyword },
        id: activeTabId === "favorite" ? { in: favariteImageIds } : undefined,
      },
    });
    const resBody: GetImageResBody = { images };
    return NextResponse.json(resBody);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "GET request failed";
    return NextResponse.json({ errorMessage }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: Request) => {
  try {
    await prisma.$connect();
    const reqBody: PostImageReqBody = await req.json();
    const base64 = reqBody.image.split(",")[1];
    const id = uuid();

    const { error } = await uploadStorage.upload(id, decode(base64), {
      contentType: "image/webp",
    });
    if (error) throw new Error("Image upload failed");

    const image = await prisma.image.create({
      select: { url: true },
      data: {
        id,
        url: process.env.SUPABASE_URL + STORAGE_API_ENDPOINT + "/" + id,
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
