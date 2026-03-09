import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { ReactNode } from "react";
import { c } from "@/components/ResumePdf/styles";

const s = StyleSheet.create({
  item: {
    marginBottom: 9,
  },
  label: {
    fontSize: 6.5,
    color: c.sidebarMuted,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 1,
  },
});

export interface ContactItemProps {
  label: string;
  children: ReactNode;
}

export function ContactItem({ label, children }: ContactItemProps) {
  return (
    <View style={s.item}>
      <Text style={s.label}>{label}</Text>
      {children}
    </View>
  );
}
