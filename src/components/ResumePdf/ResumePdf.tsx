import { Document, Page, StyleSheet, View } from "@react-pdf/renderer";
import { profile } from "@/data/resume";
import { Content } from "./components/Content/Content";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { SIDEBAR_WIDTH } from "./constants";
import { c } from "./styles";

const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    backgroundColor: c.white,
    // Page-level padding repeats on every page, including continuations.
    // paddingLeft clears the fixed sidebar column.
    paddingTop: 44,
    paddingBottom: 44,
    paddingLeft: SIDEBAR_WIDTH + 32,
    paddingRight: 40,
  },
});

export function ResumePdf() {
  return (
    <Document
      title={`${profile.firstName} ${profile.lastName} — Resume`}
      author={`${profile.firstName} ${profile.lastName}`}
    >
      <Page size="LETTER" style={s.page}>
        {/* Dark sidebar background — fixed so it renders on every page */}
        <View
          fixed
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: SIDEBAR_WIDTH,
            bottom: 0,
            backgroundColor: c.sidebarBg,
          }}
        />

        <Sidebar />
        <Content />
      </Page>
    </Document>
  );
}
