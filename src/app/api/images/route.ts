import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (req: Request, res: NextResponse) => {
  try {
    await prisma.$connect();
    const images = await prisma.image.findMany();
    return NextResponse.json({ message: "Success", images }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Failed", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
