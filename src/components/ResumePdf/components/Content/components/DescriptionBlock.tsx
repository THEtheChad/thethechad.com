import { StyleSheet, Text, View } from "@react-pdf/renderer";
import Markdown from "react-markdown";

const s = StyleSheet.create({
  block: {
    marginTop: 2,
  },
  p: {
    fontSize: 8.5,
    lineHeight: 1.5,
    color: "#3a3a5a",
    marginBottom: 4,
  },
  ul: {
    marginBottom: 4,
  },
  li: {
    flexDirection: "row",
    marginBottom: 2,
  },
  bullet: {
    fontSize: 8.5,
    lineHeight: 1.5,
    color: "#3a3a5a",
    width: 10,
  },
  liText: {
    fontSize: 8.5,
    lineHeight: 1.5,
    color: "#3a3a5a",
    flex: 1,
  },
  strong: {
    fontWeight: "bold",
  },
});

export function DescriptionBlock({ text }: { text: string }) {
  return (
    <View style={s.block} wrap={false}>
      <Markdown
        components={{
          p: ({ children }) => <Text style={s.p}>{children}</Text>,
          ul: ({ children }) => <View style={s.ul}>{children}</View>,
          li: ({ children }) => (
            <View style={s.li}>
              <Text style={s.bullet}>•</Text>
              <Text style={s.liText}>{children}</Text>
            </View>
          ),
          strong: ({ children }) => <Text style={s.strong}>{children}</Text>,
        }}
      >
        {text}
      </Markdown>
    </View>
  );
}
