"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
export interface LinkProps {
  href: string;
  label: string;
}
export function Link({ href, label }: LinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <NextLink
      href={href}
      className={`border px-4 py-2 font-pixel text-[10px] transition-colors hover:border-accent-soft hover:text-body ${
        isActive
          ? "border-accent-soft bg-accent/10 text-accent-soft"
          : "border-line text-soft"
      }`}
      style={isActive ? { boxShadow: "0 0 8px rgba(0,207,255,0.35)" } : undefined}
    >
      {label}
    </NextLink>
  );
}
