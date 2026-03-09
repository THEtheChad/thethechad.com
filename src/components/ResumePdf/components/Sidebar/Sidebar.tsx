import { View } from "@react-pdf/renderer";

import type { ReactNode } from "react";

export const SIDEBAR_WIDTH = 205;
export interface SidebarProps {
  children: ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: SIDEBAR_WIDTH,
        paddingBottom: 36,
      }}
    >
      {children}
    </View>
  );
}
