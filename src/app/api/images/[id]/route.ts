import { NextResponse } from "next/server";
import prisma from "@/utils/client";

export const PATCH = async (req: Request) => {
  try {
    const id = req.url.split("/images/")[1];
    await prisma.$connect();
    const image = await prisma.image.findUnique({ select: { usedCount: true }, where: { id } });
    if (image) {
      await prisma.image.update({
        where: { id },
        data: { usedCount: image.usedCount + 1 },
      });
    }
    return NextResponse.json({});
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "PATCH request failed";
    return NextResponse.json({ errorMessage }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
