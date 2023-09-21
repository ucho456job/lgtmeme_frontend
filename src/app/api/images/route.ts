import { NextResponse } from "next/server";
import { ActiveTabId } from "@/app/ImageGallery";
import prisma from "@/utils/client";

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
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
