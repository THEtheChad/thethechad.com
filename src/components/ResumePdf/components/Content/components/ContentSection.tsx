import { StyleSheet, Text, View } from "@react-pdf/renderer";
import type { ReactNode } from "react";
import { c } from "../../../styles";

const s = StyleSheet.create({
  section: {
    marginTop: 16,
  },
  title: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    letterSpacing: 2,
    color: c.ink,
    textTransform: "uppercase",
    marginBottom: 3,
  },
  rule: {
    height: 2,
    backgroundColor: c.accent,
    marginBottom: 10,
  },
});

export function ContentSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <View style={s.section}>
      <Text style={s.title}>{title}</Text>
      <View style={s.rule} />
      {children}
    </View>
  );
}
