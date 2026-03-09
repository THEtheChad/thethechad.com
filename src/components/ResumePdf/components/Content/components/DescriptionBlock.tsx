import { StyleSheet, Text, View } from "@react-pdf/renderer";

const s = StyleSheet.create({
  block: {
    marginTop: 2,
  },
  line: {
    fontSize: 8.5,
    lineHeight: 1.5,
    color: "#3a3a5a",
  },
});

export function DescriptionBlock({ text }: { text: string }) {
  return (
    <View style={s.block} wrap={false}>
      {text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static ordered content
          <Text key={i} style={s.line}>
            {line}
          </Text>
        ))}
    </View>
  );
}
