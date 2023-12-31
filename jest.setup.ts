import { PrismaClient } from "@prisma/client";
import "@testing-library/jest-dom";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";
import prisma from "@/utils/prisma";

jest.mock("@/utils/prisma", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
  jest.clearAllMocks();
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
