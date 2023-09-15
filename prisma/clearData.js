const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const clearData = async () => {
  console.log("Start clear seed data...");
  try {
    await prisma.$connect();
    await prisma.image.deleteMany();
    console.log("Success!");
  } catch (e) {
    throw e;
  } finally {
    await prisma.$disconnect();
  }
};

clearData().catch((e) => {
  console.error("Failed clear db data: ", e);
  process.exit(1);
});
