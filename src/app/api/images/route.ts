import { NextResponse } from "next/server";
import { decode } from "base64-arraybuffer";
import { v4 as uuid } from "uuid";
import { ActiveTabId } from "@/app/ImageGallery";
import prisma from "@/utils/client";
import { uploadStorage } from "@/utils/supabase";

const LIMIT = 9;

export const GET = async (req: Request) => {
  try {
    await prisma.$connect();
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page"));
    const keyword = String(searchParams.get("keyword"));
    const activeTabId = searchParams.get("activeTabId") as ActiveTabId;
    const favariteImageIds = (searchParams.get("favariteImageIds") || "")
      .split(",")
      .map((id) => Number(id));
    const skip = page * LIMIT;

    const images = await prisma.image.findMany({
      select: { id: true, url: true, width: true, height: true },
      skip,
      take: LIMIT,
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
    await prisma.image.create({
      data: {
        url: `${process.env.SUPABASE_URL}/storage/v1/object/public/images/${id}`,
        width: 300,
        height: 300,
        keyword: "keyword",
      },
    });
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "POST request failed";
    return NextResponse.json({ errorMessage }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
