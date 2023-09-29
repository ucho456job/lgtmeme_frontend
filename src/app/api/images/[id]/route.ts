import { NextResponse } from "next/server";
import { PATCH_IMAGE_REQUEST_TYPE } from "@/constants/image";
import prisma from "@/utils/client";

export const PATCH = async (req: Request) => {
  try {
    const id = req.url.split("/images/")[1];
    await prisma.$connect();
    const reqBody: PatchImageReqBody = await req.json();
    let updateData: { usedCount: number } | { reported: true } | undefined;
    switch (reqBody.requestType) {
      case PATCH_IMAGE_REQUEST_TYPE.copy:
        const image = await prisma.image.findUnique({ select: { usedCount: true }, where: { id } });
        updateData = image ? { usedCount: image.usedCount + 1 } : undefined;
        break;
      case PATCH_IMAGE_REQUEST_TYPE.report:
        updateData = { reported: true };
        break;
    }
    if (!updateData) throw new Error("Bad request");
    await prisma.image.update({ where: { id }, data: updateData });
    return NextResponse.json({});
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "PATCH request failed";
    return NextResponse.json({ errorMessage }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
