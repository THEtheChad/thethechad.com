import { StyleSheet, Text, View } from "@react-pdf/renderer";
import type { ReactNode } from "react";
import { c } from "../../../styles";

const s = StyleSheet.create({
  section: {
    marginTop: 18,
  },
  title: {
    fontFamily: "Helvetica-Bold",
    fontSize: 7,
    letterSpacing: 2,
    color: c.sidebarText,
    textTransform: "uppercase",
    paddingBottom: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: c.accent,
    borderBottomStyle: "solid",
    marginBottom: 8,
  },
});

export function SidebarSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <View style={s.section} wrap={false}>
      <Text style={s.title}>{title}</Text>
      {children}
    </View>
  );
}
