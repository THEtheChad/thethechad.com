import { Text, View } from "@react-pdf/renderer";
import type { ReactNode } from "react";
import { s } from "../../../styles";

export function SidebarSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <View style={s.sidebarSection} wrap={false}>
      <Text style={s.sidebarSectionTitle}>{title}</Text>
      {children}
    </View>
  );
}
