"use client";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

import { UserCard } from "./UserCard";

import { siteConfig as strings } from "@/config/site";
import { loginWithGoogle, logout } from "@/utils/authActions";
import { GoogleIcon } from "@/components/shared/icons";

export const AvatarMenu = () => {
  const { data: session, status } = useSession();

  const userInfo = useMemo(
    () => (
      <>
        <p className="font-bold">{strings.account.signed_in_as}</p>
        <p className="font-bold">{session?.user?.email}</p>
      </>
    ),
    [session]
  );

  return (
    <Dropdown>
      <DropdownTrigger>
        <div>
          <UserCard />
        </div>
      </DropdownTrigger>
      <DropdownMenu variant="flat">
        <>
          {status === "authenticated" ? (
            <>
              <DropdownSection showDivider>
                <DropdownItem key="profile" className="gap-2" href="/">
                  {userInfo}
                </DropdownItem>
              </DropdownSection>
              <DropdownItem key="logout" onPress={logout}>
                {strings.account.logout}
              </DropdownItem>
            </>
          ) : (
            <DropdownItem
              key="login"
              startContent={<GoogleIcon />}
              onPress={loginWithGoogle}
            >
              {strings.account.loginGoole}
            </DropdownItem>
          )}
        </>
      </DropdownMenu>
    </Dropdown>
  );
};
