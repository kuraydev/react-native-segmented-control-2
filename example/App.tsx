import React from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import SegmentedControl from "react-native-segmented-control-2";

const bolt = require("./assets/bolt.png");
const stars = require("./assets/stars-2.png");
const book = require("./assets/book.png");
const glasses = require("./assets/glasses.png");
const history = require("./assets/history.png");

type Palette = {
  background: string;
  card: string;
  title: string;
  text: string;
  muted: string;
  track: string;
  thumb: string;
  border: string;
  accent: string;
};

const LIGHT: Palette = {
  background: "#F2F3F7",
  card: "#FFFFFF",
  title: "#111319",
  text: "#3A3F4B",
  muted: "#8A8F9C",
  track: "#E8EAF0",
  thumb: "#FFFFFF",
  border: "rgba(17, 19, 25, 0.06)",
  accent: "#0A84FF",
};

const DARK: Palette = {
  background: "#0E1015",
  card: "#181B22",
  title: "#F4F5F7",
  text: "#C9CDD6",
  muted: "#7C8190",
  track: "#232732",
  thumb: "#3A4050",
  border: "rgba(255, 255, 255, 0.07)",
  accent: "#0A84FF",
};

const ACCENTS = [
  { name: "Ocean", color: "#0A84FF", track: "#D6E9FF" },
  { name: "Emerald", color: "#2FB380", track: "#D8F3E8" },
  { name: "Sunset", color: "#FF6B57", track: "#FFE3DE" },
];

const Section = ({
  title,
  caption,
  badge,
  palette,
  children,
}: {
  title: string;
  caption?: string;
  badge?: string;
  palette: Palette;
  children: React.ReactNode;
}) => (
  <View
    style={[
      styles.card,
      { backgroundColor: palette.card, borderColor: palette.border },
    ]}
  >
    <View style={styles.cardHeader}>
      <Text style={[styles.cardTitle, { color: palette.title }]}>{title}</Text>
      {badge ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      ) : null}
    </View>
    {caption ? (
      <Text style={[styles.cardCaption, { color: palette.muted }]}>
        {caption}
      </Text>
    ) : null}
    <View style={styles.cardBody}>{children}</View>
  </View>
);

const IconTab = ({
  source,
  tint,
  size = 20,
}: {
  source: number;
  tint?: string;
  size?: number;
}) => (
  <Image
    resizeMode="contain"
    source={source}
    style={{ width: size, height: size, tintColor: tint }}
  />
);

const ModelTab = ({
  icon,
  label,
  active,
  activeTint,
  palette,
}: {
  icon: number;
  label: string;
  active: boolean;
  activeTint: string;
  palette: Palette;
}) => (
  <View style={styles.modelTab}>
    <IconTab
      source={icon}
      size={16}
      tint={active ? activeTint : palette.muted}
    />
    <Text
      style={[
        styles.modelTabText,
        { color: active ? palette.title : palette.muted },
      ]}
    >
      {label}
    </Text>
  </View>
);

const App = () => {
  const [themeIndex, setThemeIndex] = React.useState(0);
  const [basicIndex, setBasicIndex] = React.useState(0);
  const [libraryIndex, setLibraryIndex] = React.useState(0);
  const [model, setModel] = React.useState(1);
  const [accent, setAccent] = React.useState(0);
  const [controlled, setControlled] = React.useState(1);
  const [locked, setLocked] = React.useState(false);
  const [lockedIndex, setLockedIndex] = React.useState(0);

  const dark = themeIndex === 1;
  const palette = dark ? DARK : LIGHT;
  const accentTheme = ACCENTS[accent];
  const periods = ["Day", "Week", "Month"];

  return (
    <View style={[styles.screen, { backgroundColor: palette.background }]}>
      <StatusBar style={dark ? "light" : "dark"} />
      <SafeAreaView style={styles.screen}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.headerText}>
              <Text style={[styles.title, { color: palette.title }]}>
                Segmented Control
              </Text>
              <Text style={[styles.subtitle, { color: palette.muted }]}>
                react-native-segmented-control-2 · v2.2.0
              </Text>
            </View>
            <SegmentedControl
              tabs={["Light", "Dark"]}
              value={themeIndex}
              onChange={setThemeIndex}
              style={[styles.themeSwitch, { backgroundColor: palette.track }]}
              activeTabColor={palette.thumb}
              activeTextColor={palette.title}
              textStyle={[styles.smallTabText, { color: palette.muted }]}
            />
          </View>

          <Section
            title="Basic"
            caption="Strings in, index out. The whole API in one line."
            palette={palette}
          >
            <SegmentedControl
              tabs={periods}
              value={basicIndex}
              onChange={setBasicIndex}
              style={[styles.control, { backgroundColor: palette.track }]}
              activeTabColor={palette.thumb}
              activeTextColor={palette.title}
              textStyle={{ color: palette.muted }}
            />
            <Text style={[styles.readout, { color: palette.muted }]}>
              Showing stats for{" "}
              <Text style={{ color: palette.title, fontWeight: "600" }}>
                {periods[basicIndex].toLowerCase()}
              </Text>
            </Text>
          </Section>

          <Section
            title="Inset shadow"
            caption="Recess the track so the indicator visually sits inside it."
            badge="NEW"
            palette={palette}
          >
            <SegmentedControl
              tabs={["Inbox", "Archive", "Trash"]}
              insetShadow
              onChange={() => undefined}
              style={[styles.control, { backgroundColor: palette.track }]}
              activeTabColor={palette.thumb}
              activeTextColor={palette.title}
              textStyle={{ color: palette.muted }}
            />
            <SegmentedControl
              tabs={["Custom", "Shadow", "String"]}
              insetShadow="inset 0 3px 8px rgba(0, 0, 0, 0.35)"
              onChange={() => undefined}
              style={[
                styles.control,
                styles.spaced,
                { backgroundColor: palette.track },
              ]}
              activeTabColor={palette.thumb}
              activeTextColor={palette.title}
              textStyle={{ color: palette.muted }}
            />
          </Section>

          <Section
            title="Icons"
            caption="Any React element works as a tab."
            palette={palette}
          >
            <SegmentedControl
              tabs={[
                <IconTab
                  key="book"
                  source={book}
                  tint={libraryIndex === 0 ? palette.title : palette.muted}
                />,
                <IconTab
                  key="glasses"
                  source={glasses}
                  size={26}
                  tint={libraryIndex === 1 ? palette.title : palette.muted}
                />,
                <IconTab
                  key="history"
                  source={history}
                  tint={libraryIndex === 2 ? palette.title : palette.muted}
                />,
              ]}
              value={libraryIndex}
              onChange={setLibraryIndex}
              style={[
                styles.control,
                { height: 40, backgroundColor: palette.track },
              ]}
              activeTabColor={palette.thumb}
            />
          </Section>

          <Section
            title="Icon + label"
            caption="Composed tabs, like a model picker."
            palette={palette}
          >
            <SegmentedControl
              tabs={[
                <ModelTab
                  key="fast"
                  icon={bolt}
                  label="Fast"
                  active={model === 0}
                  activeTint="#FFB020"
                  palette={palette}
                />,
                <ModelTab
                  key="smart"
                  icon={stars}
                  label="Smart"
                  active={model === 1}
                  activeTint="#A26BF7"
                  palette={palette}
                />,
              ]}
              value={model}
              onChange={setModel}
              gap={4}
              style={[
                styles.control,
                { height: 52, backgroundColor: palette.track },
              ]}
              activeTabColor={palette.thumb}
            />
          </Section>

          <Section
            title="Theming"
            caption="Track, indicator, and text colors are all yours."
            palette={palette}
          >
            <SegmentedControl
              tabs={ACCENTS.map((a) => a.name)}
              value={accent}
              onChange={setAccent}
              style={[
                styles.control,
                { backgroundColor: dark ? palette.track : accentTheme.track },
              ]}
              activeTabColor={accentTheme.color}
              activeTextColor="#FFFFFF"
              textStyle={{
                color: dark ? palette.muted : accentTheme.color,
              }}
            />
          </Section>

          <Section
            title="Controlled"
            caption="Drive the selection from outside via the value prop."
            palette={palette}
          >
            <SegmentedControl
              tabs={["One", "Two", "Three"]}
              value={controlled}
              onChange={setControlled}
              style={[styles.control, { backgroundColor: palette.track }]}
              activeTabColor={palette.thumb}
              activeTextColor={palette.title}
              textStyle={{ color: palette.muted }}
            />
            <View style={styles.row}>
              <Pressable
                onPress={() => setControlled((i) => Math.max(0, i - 1))}
                style={[styles.button, { backgroundColor: palette.track }]}
              >
                <Text style={[styles.buttonText, { color: palette.title }]}>
                  ← Prev
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setControlled((i) => Math.min(2, i + 1))}
                style={[styles.button, { backgroundColor: palette.track }]}
              >
                <Text style={[styles.buttonText, { color: palette.title }]}>
                  Next →
                </Text>
              </Pressable>
            </View>
          </Section>

          <Section
            title="Disabled"
            caption="Freeze the control while keeping its state visible."
            palette={palette}
          >
            <SegmentedControl
              tabs={["Draft", "Published"]}
              value={lockedIndex}
              onChange={setLockedIndex}
              disabled={locked}
              style={[
                styles.control,
                { backgroundColor: palette.track, opacity: locked ? 0.55 : 1 },
              ]}
              activeTabColor={palette.thumb}
              activeTextColor={palette.title}
              textStyle={{ color: palette.muted }}
            />
            <View style={[styles.row, styles.rowBetween]}>
              <Text style={[styles.readout, { color: palette.muted }]}>
                Lock the control
              </Text>
              <Switch
                value={locked}
                onValueChange={setLocked}
                trackColor={{ true: palette.accent }}
              />
            </View>
          </Section>

          <Text style={[styles.footer, { color: palette.muted }]}>
            Every control above is the same component — just props.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 48,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 12,
    paddingBottom: 20,
  },
  headerText: {
    flexShrink: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 12,
    marginTop: 3,
  },
  themeSwitch: {
    width: 128,
    height: 34,
  },
  smallTabText: {
    fontSize: 12,
  },
  control: {
    width: "100%",
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 14,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: -0.2,
  },
  badge: {
    marginLeft: 8,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: "#2FB380",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  cardCaption: {
    fontSize: 12.5,
    lineHeight: 17,
    marginTop: 3,
  },
  cardBody: {
    marginTop: 14,
  },
  spaced: {
    marginTop: 12,
  },
  readout: {
    fontSize: 13,
    marginTop: 12,
  },
  row: {
    flexDirection: "row",
    marginTop: 12,
    gap: 10,
  },
  rowBetween: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  footer: {
    fontSize: 12.5,
    textAlign: "center",
    marginTop: 8,
  },
  modelTab: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  modelTabText: {
    fontSize: 14,
    fontWeight: "600",
  },
});

export default App;
