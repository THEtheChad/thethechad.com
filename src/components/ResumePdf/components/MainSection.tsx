import { Text, View } from "@react-pdf/renderer";
import type { ReactNode } from "react";
import { s } from "../styles";

export function MainSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <View style={s.section}>
      <Text style={s.sectionTitle}>{title}</Text>
      <View style={s.sectionRule} />
      {children}
    </View>
  );
}
