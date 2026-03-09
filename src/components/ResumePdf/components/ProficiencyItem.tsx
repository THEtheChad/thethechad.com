import { Text, View } from "@react-pdf/renderer";
import { c, s } from "../styles";

export function ProficiencyItem({
  label,
  level,
}: {
  label: string;
  level: number;
}) {
  return (
    <View style={s.proficiencyItem}>
      <Text style={s.proficiencyLabel}>{label}</Text>
      <View style={s.proficiencyTrack}>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 165 * (level / 10),
            height: 3,
            backgroundColor: c.accent,
          }}
        />
      </View>
    </View>
  );
}
