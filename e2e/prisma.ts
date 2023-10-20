import secret from "../secret.json";
import { PrismaClient } from "@prisma/client";

process.env.DATABASE_URL = secret.preview.DATABASE_URL;
const prisma = new PrismaClient();
export default prisma;
