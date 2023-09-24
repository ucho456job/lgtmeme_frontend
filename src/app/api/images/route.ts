import { NextResponse } from "next/server";
import { decode } from "base64-arraybuffer";
import { v4 as uuid } from "uuid";
import { ActiveTabId } from "@/app/ImageGallery";
import { STORAGE_API_ENDPOINT } from "@/constants/endpoints";
import { MAX_IMAGES_FETCH_COUNT } from "@/constants/image";
import prisma from "@/utils/client";
import { uploadStorage } from "@/utils/supabase";

export const GET = async (req: Request) => {
  try {
    await prisma.$connect();
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page"));
    const keyword = String(searchParams.get("keyword"));
    const activeTabId = searchParams.get("activeTabId") as ActiveTabId;
    const favariteImageIds = (searchParams.get("favariteImageIds") || "").split(",");
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

    return NextResponse.json({ images }, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "GET request failed";
    return NextResponse.json({ errorMessage }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

type Payload = {
  image: string;
  keyword: string;
};

export const POST = async (req: Request) => {
  try {
    await prisma.$connect();
    const payload: Payload = await req.json();
    const base64 = payload.image.split(",")[1];
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
        keyword: payload.keyword,
      },
    });
    return NextResponse.json({ imageUrl: image.url }, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "POST request failed";
    return NextResponse.json({ errorMessage }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
