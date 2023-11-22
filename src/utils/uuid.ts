import { createHash } from "crypto";
import { v4 as uuid } from "uuid";

export const generateRandomUuid = () => uuid();

const generateSha256Hash = (arg: number | string, start: number, stop?: number): string => {
  return createHash("sha256")
    .update(typeof arg === "string" ? arg : arg.toString())
    .digest("hex")
    .slice(start, stop);
};

export const generateStaticUUID = (arg: number | string): string => {
  return (
    generateSha256Hash(arg, 0, 8) +
    "-" +
    generateSha256Hash(arg, 8, 12) +
    "-" +
    "4" +
    generateSha256Hash(arg, 12, 15) +
    "-" +
    "8" +
    generateSha256Hash(arg, 15, 18) +
    "-" +
    generateSha256Hash(arg, -12)
  );
};

export const isUuid = (id: string): boolean => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
};
