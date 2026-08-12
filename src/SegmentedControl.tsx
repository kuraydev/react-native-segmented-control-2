import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  I18nManager,
} from "react-native";
import type {
  StyleProp,
  ViewStyle,
  TextStyle,
  LayoutChangeEvent,
} from "react-native";
import styles from "./SegmentedControl.style";

export type TabItem = string | React.ReactElement;

export interface SegmentedControlProps {
  tabs: TabItem[];
  initialIndex?: number;
  activeTextColor?: string;
  activeTabColor?: string;
  gap?: number;
  disabled?: boolean;
  testID?: string;
  style?: StyleProp<ViewStyle>;
  tabStyle?: StyleProp<ViewStyle> | ((index: number) => StyleProp<ViewStyle>);
  textStyle?: StyleProp<TextStyle>;
  activeTextStyle?: StyleProp<TextStyle>;
  selectedTabStyle?: StyleProp<ViewStyle>;
  onChange: (index: number) => void;
  value?: number;
  // Recess the track with an inner shadow. `true` applies a sensible default;
  // pass a CSS-like `boxShadow` string to fully customize it. Requires the
  // React Native `boxShadow` style support (RN 0.76+); ignored on older versions.
  insetShadow?: boolean | string;
}

const DEFAULT_INSET_SHADOW = "inset 0px 2px 4px rgba(0, 0, 0, 0.15)";

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  style,
  tabs,
  onChange,
  value,
  tabStyle,
  textStyle,
  activeTextStyle,
  selectedTabStyle,
  testID,
  disabled = false,
  initialIndex = 0,
  gap = 2,
  activeTextColor = "#000",
  activeTabColor = "#fff",
  insetShadow = false,
}) => {
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const [localCurrentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const [trackWidth, setTrackWidth] = useState(0);

  const isControlled = value !== undefined;
  const currentIndex = isControlled ? value : localCurrentIndex;

  // Every tab is an equal slice of the track, so the indicator never has to
  // wait on a per-tab onLayout to know where it belongs. Measuring each tab
  // separately let the New Architecture report them one frame apart, which is
  // what made the indicator land on a stale offset.
  const tabWidth = tabs.length > 0 ? trackWidth / tabs.length : 0;

  const handleTabPress = useCallback(
    (index: number) => {
      if (!isControlled) {
        setCurrentIndex(index);
      }
      onChange(index);
    },
    [isControlled, onChange],
  );

  const onLayoutTrack = useCallback(
    ({ nativeEvent }: LayoutChangeEvent) => {
      setTrackWidth(Math.max(0, nativeEvent.layout.width - gap * 2));
    },
    [gap],
  );

  // Jump to the starting offset once measured, then animate on later changes,
  // so the indicator does not slide in from the left on first paint.
  const hasPositioned = useRef(false);
  useEffect(() => {
    if (tabWidth === 0) return;

    const toValue = (I18nManager.isRTL ? -1 : 1) * currentIndex * tabWidth;

    if (!hasPositioned.current) {
      hasPositioned.current = true;
      slideAnimation.setValue(toValue);
      return;
    }

    Animated.spring(slideAnimation, {
      toValue,
      stiffness: 180,
      damping: 25,
      mass: 1,
      useNativeDriver: true,
    }).start();
  }, [currentIndex, slideAnimation, tabWidth]);

  const tabSpecificStyle = useCallback(
    (tabIndex: number) => {
      if (typeof tabStyle === "function") {
        return tabStyle(tabIndex);
      }

      return tabStyle;
    },
    [tabStyle],
  );

  const indicatorStyle = useMemo(
    () => styles.activeTab(tabWidth, gap, activeTabColor, slideAnimation),
    [tabWidth, gap, activeTabColor, slideAnimation],
  );

  const insetShadowStyle = useMemo<ViewStyle | undefined>(() => {
    if (!insetShadow) return undefined;
    return {
      boxShadow:
        typeof insetShadow === "string" ? insetShadow : DEFAULT_INSET_SHADOW,
    };
  }, [insetShadow]);

  const renderTab = (tab: TabItem, index: number) => {
    const isActiveTab = currentIndex === index;
    const isTabText = typeof tab === "string";
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.5}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityState={{ selected: isActiveTab, disabled }}
        testID={testID ? `${testID}-tab-${index}` : undefined}
        style={[styles.tab, tabSpecificStyle(index)]}
        onPress={() => handleTabPress(index)}
      >
        {!isTabText ? (
          tab
        ) : (
          <Text
            numberOfLines={1}
            style={[
              styles.textStyle,
              textStyle,
              isActiveTab && activeTextStyle,
              isActiveTab && { color: activeTextColor },
            ]}
          >
            {tab}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View
      testID={testID}
      onLayout={onLayoutTrack}
      style={[styles.container, insetShadowStyle, style]}
    >
      {tabWidth > 0 && (
        <Animated.View
          pointerEvents="none"
          style={[indicatorStyle, selectedTabStyle]}
        />
      )}
      <View style={[styles.tabsContainer, { marginHorizontal: gap }]}>
        {tabs.map((tab, index: number) => renderTab(tab, index))}
      </View>
    </View>
  );
};

export default SegmentedControl;
