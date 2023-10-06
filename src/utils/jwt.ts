import { verify } from "jsonwebtoken";

export const verifyAuth = (req: Request): void => {
  const accessToken = String(req.headers.get("authorization")).slice(7);
  const payload = verify(accessToken, process.env.JWT_SECRET);
  if (payload.sub !== process.env.AUTH_USER_ID) throw new Error("Authorization error");
};
