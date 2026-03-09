import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { SIDEBAR_WIDTH } from "@/components/ResumePdf/constants";
import { c } from "../../../styles";

const TRACK_WIDTH = SIDEBAR_WIDTH - 40; // sidebar content width: SIDEBAR_WIDTH - 2 * paddingHorizontal(20)

const s = StyleSheet.create({
  item: {
    marginBottom: 7,
  },
  label: {
    fontSize: 8,
    color: c.sidebarText,
    marginBottom: 2.5,
  },
  track: {
    width: TRACK_WIDTH,
    height: 3,
    backgroundColor: "rgba(255,255,255,0.1)",
    position: "relative",
  },
  fill: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 3,
    backgroundColor: c.accent,
  },
});

export function ProficiencyItem({
  label,
  proficiency,
}: {
  label: string;
  proficiency: number;
}) {
  return (
    <View style={s.item}>
      <Text style={s.label}>{label}</Text>
      <View style={s.track}>
        <View style={[s.fill, { width: TRACK_WIDTH * (proficiency / 10) }]} />
      </View>
    </View>
  );
}
