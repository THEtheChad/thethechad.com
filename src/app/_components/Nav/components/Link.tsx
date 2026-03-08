import NextLink from "next/link";
export interface LinkProps {
  href: string;
  label: string;
}
export function Link({ href, label }: LinkProps) {
  return (
    <NextLink
      href={href}
      className="border border-line px-4 py-2 font-pixel text-[10px] text-soft transition-colors hover:border-accent-soft hover:text-body"
    >
      {label}
    </NextLink>
  );
}
