import { Text, View } from "@react-pdf/renderer";
import { s } from "../styles";

export function DescriptionBlock({ text }: { text: string }) {
  return (
    <View style={s.descBlock} wrap={false}>
      {text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static ordered content
          <Text key={i} style={s.descLine}>
            {line}
          </Text>
        ))}
    </View>
  );
}
