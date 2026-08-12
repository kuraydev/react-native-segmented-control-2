import { Animated, StyleSheet } from "react-native";

const baseStyles = StyleSheet.create({
  container: {
    display: "flex",
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#F3F5F6",
  },
  tabsContainer: {
    flex: 1,
    flexDirection: "row",
  },
  // flexBasis/minWidth pin every tab to an equal share. Without them a tab
  // whose label is wider than its share can claim the extra space under the
  // New Architecture, leaving the tabs unevenly split.
  tab: {
    flex: 1,
    flexBasis: 0,
    minWidth: 0,
    paddingVertical: 8, // iOS Default
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    fontSize: 14, // iOS Default
    textAlign: "center",
    fontWeight: "500",
  },
});

const styles = {
  ...baseStyles,
  activeTab: (
    tabWidth: number,
    gap: number,
    activeTabColor: string,
    slideAnimation: Animated.Value,
  ) => ({
    position: "absolute" as const,
    top: gap,
    bottom: gap,
    start: gap,
    width: tabWidth,
    backgroundColor: activeTabColor,
    transform: [{ translateX: slideAnimation }],
    borderRadius: 6,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 4,
  }),
} as const;

export default styles;
