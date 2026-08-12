import React from "react";
import { Text } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";

import SegmentedControl from "../SegmentedControl";

const TABS = ["First", "Second", "Third"];

const layoutTrack = (
  getByTestId: (id: string) => unknown,
  width = 300,
): void => {
  fireEvent(getByTestId("sc") as never, "layout", {
    nativeEvent: { layout: { x: 0, y: 0, width, height: 40 } },
  });
};

describe("SegmentedControl", () => {
  it("renders every tab label", () => {
    const { getByText } = render(
      <SegmentedControl tabs={TABS} onChange={jest.fn()} />,
    );
    TABS.forEach((tab) => expect(getByText(tab)).toBeTruthy());
  });

  it("calls onChange with the pressed tab index", () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <SegmentedControl tabs={TABS} onChange={onChange} testID="sc" />,
    );
    layoutTrack(getByTestId);

    fireEvent.press(getByTestId("sc-tab-2"));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it("marks the active tab as selected for accessibility", () => {
    const { getByTestId } = render(
      <SegmentedControl
        tabs={TABS}
        onChange={jest.fn()}
        testID="sc"
        initialIndex={1}
      />,
    );
    layoutTrack(getByTestId);

    expect(getByTestId("sc-tab-1").props.accessibilityState.selected).toBe(
      true,
    );
    expect(getByTestId("sc-tab-0").props.accessibilityState.selected).toBe(
      false,
    );
  });

  it("moves the selection on press when uncontrolled", () => {
    const { getByTestId } = render(
      <SegmentedControl tabs={TABS} onChange={jest.fn()} testID="sc" />,
    );
    layoutTrack(getByTestId);

    fireEvent.press(getByTestId("sc-tab-1"));
    expect(getByTestId("sc-tab-1").props.accessibilityState.selected).toBe(
      true,
    );
  });

  it("follows the value prop when controlled", () => {
    const onChange = jest.fn();
    const { getByTestId, rerender } = render(
      <SegmentedControl
        tabs={TABS}
        onChange={onChange}
        testID="sc"
        value={0}
      />,
    );
    layoutTrack(getByTestId);

    fireEvent.press(getByTestId("sc-tab-2"));
    expect(onChange).toHaveBeenCalledWith(2);
    expect(getByTestId("sc-tab-2").props.accessibilityState.selected).toBe(
      false,
    );

    rerender(
      <SegmentedControl
        tabs={TABS}
        onChange={onChange}
        testID="sc"
        value={2}
      />,
    );
    expect(getByTestId("sc-tab-2").props.accessibilityState.selected).toBe(
      true,
    );
  });

  it("does not respond to presses when disabled", () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <SegmentedControl tabs={TABS} onChange={onChange} testID="sc" disabled />,
    );
    layoutTrack(getByTestId);

    fireEvent.press(getByTestId("sc-tab-0"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders custom element tabs as-is", () => {
    const { getByTestId } = render(
      <SegmentedControl
        tabs={[
          <Text key="a" testID="custom-tab">
            A
          </Text>,
          "B",
        ]}
        onChange={jest.fn()}
      />,
    );
    expect(getByTestId("custom-tab")).toBeTruthy();
  });

  it("applies per-tab styles from a tabStyle function", () => {
    const tabStyle = jest.fn(() => ({ opacity: 0.5 }));
    const { getByTestId } = render(
      <SegmentedControl
        tabs={TABS}
        onChange={jest.fn()}
        testID="sc"
        tabStyle={tabStyle}
      />,
    );
    layoutTrack(getByTestId);
    expect(tabStyle).toHaveBeenCalledWith(0);
    expect(tabStyle).toHaveBeenCalledWith(2);
  });

  it("recesses the track when insetShadow is set", () => {
    const { getByTestId } = render(
      <SegmentedControl
        tabs={TABS}
        onChange={jest.fn()}
        testID="sc"
        insetShadow
      />,
    );
    layoutTrack(getByTestId);
    const flattened = ([] as unknown[]).concat(
      ...([getByTestId("sc").props.style] as never[]),
    );
    expect(
      flattened.some(
        (s) => s && typeof (s as { boxShadow?: string }).boxShadow === "string",
      ),
    ).toBe(true);
  });
});
