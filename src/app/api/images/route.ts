import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

const initPrisma = async () => {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("Failed: DB connection")
  }
}

export const GET = async (req: Request, res: NextResponse) => {
  try {
    await initPrisma();
    const images = await prisma.image.findMany();
    return NextResponse.json({ message: "Success", images }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Failed", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}