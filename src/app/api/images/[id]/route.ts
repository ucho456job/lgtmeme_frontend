import { NextResponse } from "next/server";
import { OK_STATUS } from "@/constants/exceptions";
import {
  PATCH_IMAGE_REQUEST_TYPE_AUTH_CHECK,
  PATCH_IMAGE_REQUEST_TYPE_COPY,
  PATCH_IMAGE_REQUEST_TYPE_REPORT,
  VALIDATION_ERROR_MESAGE_REQUEST_TYPE,
} from "@/constants/image";
import { NotFoundError, ValidationError, adjustErrorResponse } from "@/utils/exceptions";
import { verifyAuth } from "@/utils/jwt";
import { handleErrorLogging } from "@/utils/logger";
import prisma from "@/utils/prisma";
import { storage } from "@/utils/supabase";

const validatePatchRequestBody = (reqBody: PatchImageRequestBody): string | null => {
  const { requestType } = reqBody;
  const requestTypes = [
    PATCH_IMAGE_REQUEST_TYPE_COPY,
    PATCH_IMAGE_REQUEST_TYPE_REPORT,
    PATCH_IMAGE_REQUEST_TYPE_AUTH_CHECK,
  ];
  if (!requestTypes.includes(requestType)) {
    return VALIDATION_ERROR_MESAGE_REQUEST_TYPE;
  }
  return null;
};

export const PATCH = async (req: Request) => {
  try {
    await prisma.$connect();
    const reqBody: PatchImageRequestBody = await req.json();
    const validateMessage = validatePatchRequestBody(reqBody);
    if (validateMessage) throw new ValidationError(validateMessage);
    const id = req.url.split("/images/")[1];
    const image = await prisma.image.findUnique({ select: { usedCount: true }, where: { id } });
    if (!image) throw new NotFoundError();
    let updateData: { usedCount: number } | { reported: true } | { confirmed: true };
    switch (reqBody.requestType) {
      case PATCH_IMAGE_REQUEST_TYPE_COPY:
        updateData = { usedCount: image.usedCount + 1 };
        break;
      case PATCH_IMAGE_REQUEST_TYPE_REPORT:
        updateData = { reported: true };
        break;
      case PATCH_IMAGE_REQUEST_TYPE_AUTH_CHECK:
        updateData = { confirmed: true };
        break;
    }
    await prisma.image.update({ where: { id }, data: updateData });
    return NextResponse.json({}, { status: OK_STATUS });
  } catch (error) {
    const { name, message, status } = adjustErrorResponse(error);
    handleErrorLogging(status, error);
    return NextResponse.json({ name, message }, { status });
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = async (req: Request) => {
  try {
    verifyAuth(req);
    const id = req.url.split("/images/")[1];
    await prisma.$connect();
    await prisma.image.delete({ where: { id } });
    await storage.remove([id]);
    return NextResponse.json({});
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "DELETE request failed";
    return NextResponse.json({ errorMessage }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
