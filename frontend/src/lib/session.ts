import { getSession } from "next-auth/react";

export const sessionData = async () => {
  const session = await getSession ();
  return session
};
