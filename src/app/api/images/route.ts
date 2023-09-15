import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const LIMIT = 9;

export const GET = async (req: Request, res: NextResponse) => {
  try {
    await prisma.$connect();
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page"));
    const skip = page * LIMIT;
    const images = await prisma.image.findMany({
      select: { id: true, url: true, width: true, height: true },
      skip,
      take: LIMIT,
    });
    return NextResponse.json({ message: "Success", images }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Failed", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
