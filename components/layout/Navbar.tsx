"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

import { AvatarMenu } from "@/components/features/auth/AvatarMenu";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/shared/ThemeSwitch";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <NextUINavbar
      isBlurred
      classNames={{ wrapper: "px-4 lg:px-6" }}
      maxWidth="xl"
      position="sticky"
    >
      <NavbarContent as="div" className="basis-2/3 sm:basis-full" justify="start">
        <ul className="flex gap-3 lg:gap-4 justify-start">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "text-sm",
                  "lg:text-medium",
                  "decoration-2",
                  "data-[active=true]:underline",
                  "data-[active=true]:underline-offset-8",
                )}
                color="foreground"
                data-active={pathname.includes(item.href)}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent className="flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="flex gap-2">
          <AvatarMenu />
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
