"use client";
import { Avatar } from "@nextui-org/avatar";
import { User } from "@nextui-org/user";
import { useSession } from "next-auth/react";

export const UserCard = () => {
  const { data: session } = useSession();

  return (
    <>
      {session?.user ? (
        <>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: `${session.user.image ?? ""}`,
              alt: `${session.user.name ?? ""}`,
            }}
            className="hidden sm:flex"
            description={session.user.email}
            name={session.user.name}
          />
          <Avatar
            alt={`${session.user.name ?? ""}`}
            className="sm:hidden"
            size="sm"
            src={`${session.user.image ?? ""}`}
          />
        </>
      ) : (
        <Avatar />
      )}
    </>
  );
};
