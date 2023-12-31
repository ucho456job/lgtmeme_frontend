const { PrismaClient } = require("@prisma/client");
const { images } = require("./seed/images");

const prisma = new PrismaClient();

const createData = async () => {
  console.log("Start create seed data...");
  try {
    await prisma.$connect();
    await prisma.image.createMany({ data: images });
    console.log("Success!");
  } catch (e) {
    throw e;
  } finally {
    await prisma.$disconnect();
  }
};

createData().catch((e) => {
  console.error("Failed create db data: ", e);
  process.exit(1);
});
