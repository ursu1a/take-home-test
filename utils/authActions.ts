import { signIn, signOut } from "next-auth/react";

export const loginWithGoogle = () => {
  return signIn("google");
};

export const logout = () => {
  return signOut();
};
