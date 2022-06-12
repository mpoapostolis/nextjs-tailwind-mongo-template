import jwt_decode from "jwt-decode";
import * as jwt from "jsonwebtoken";

export async function getLoginResponse(obj: Record<string, any>) {
  const { password, _id, ...infos } = obj;
  const token = await generateToken(obj, "1d");
  const rToken = await generateToken(obj, "2d");
  return {
    ...infos,
    token,
    rToken,
  };
}
export function generateToken(obj: Record<string, any>, duration: string) {
  const { _id, permissions } = obj;
  const tkn = process.env["TOKEN"];
  return jwt.sign({ _id, permissions }, `${tkn}`, {
    expiresIn: duration,
  });
}

export const getIdFromToken = (s: string | string[] | undefined) => {
  const t = `${s}`;
  const [_, tkn] = t.split(" ");
  if (!tkn || tkn === "undefined") return false;
  return jwt_decode<{ _id: string }>(tkn)._id;
};
