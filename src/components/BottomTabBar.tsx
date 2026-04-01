import { useEffect, useRef, useState } from "react";
import { Animated, Easing, LayoutChangeEvent, Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../theme/colors";
import { headlineFont } from "../theme/typography";
import { radii, spacing, shadows } from "../theme/tokens";
import { TabId } from "../types";

const tabs: Array<{ id: TabId; label: string; shortLabel: string }> = [
  { id: "explore", label: "Kesfet", shortLabel: "Kesfet" },
  { id: "create", label: "Ilan", shortLabel: "Ilan" },
  { id: "messages", label: "Mesaj", shortLabel: "Mesaj" },
  { id: "profile", label: "Profil", shortLabel: "Profil" }
];

type Props = {
  activeTab: TabId;
  onChange: (tab: TabId) => void;
};

function tabIndex(tab: TabId) {
  return tabs.findIndex((item) => item.id === tab);
}

function activeOffset(width: number, activeIndex: number) {
  if (!width || activeIndex < 0) {
    return 0;
  }

  const slotWidth = width / tabs.length;
  return slotWidth * activeIndex;
}

function ExploreIcon({ color }: { color: string }) {
  return (
    <View style={styles.iconFrame}>
      <View style={[styles.exploreRing, { borderColor: color }]} />
      <View style={[styles.exploreNeedle, { backgroundColor: color }]} />
      <View style={[styles.exploreNeedleHead, { borderBottomColor: color }]} />
      <View style={[styles.exploreCenterDot, { backgroundColor: color }]} />
    </View>
  );
}

function CreateIcon({ color }: { color: string }) {
  return (
    <View style={styles.iconFrame}>
      <View style={[styles.createCircle, { borderColor: color }]} />
      <View style={[styles.createVertical, { backgroundColor: color }]} />
      <View style={[styles.createHorizontal, { backgroundColor: color }]} />
    </View>
  );
}

function MessagesIcon({ color }: { color: string }) {
  return (
    <View style={styles.iconFrame}>
      <View style={[styles.messageBubble, { borderColor: color }]} />
      <View style={[styles.messageTail, { borderTopColor: color }]} />
      <View style={[styles.messageLine, styles.messageLineTop, { backgroundColor: color }]} />
      <View style={[styles.messageLine, styles.messageLineBottom, { backgroundColor: color }]} />
    </View>
  );
}

function ProfileIcon({ color }: { color: string }) {
  return (
    <View style={styles.iconFrame}>
      <View style={[styles.profileHead, { borderColor: color }]} />
      <View style={[styles.profileShoulders, { borderColor: color }]} />
    </View>
  );
}

function TabIcon({ tab, active }: { tab: TabId; active: boolean }) {
  const color = active ? colors.white : "rgba(255,255,255,0.58)";

  if (tab === "explore") {
    return <ExploreIcon color={color} />;
  }

  if (tab === "create") {
    return <CreateIcon color={color} />;
  }

  if (tab === "messages") {
    return <MessagesIcon color={color} />;
  }

  return <ProfileIcon color={color} />;
}

export function BottomTabBar({ activeTab, onChange }: Props) {
  const [barWidth, setBarWidth] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!barWidth) {
      return;
    }

    Animated.timing(translateX, {
      toValue: activeOffset(barWidth, tabIndex(activeTab)),
      duration: 240,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true
    }).start();
  }, [activeTab, barWidth, translateX]);

  function handleLayout(event: LayoutChangeEvent) {
    const nextWidth = event.nativeEvent.layout.width;

    if (!nextWidth || nextWidth === barWidth) {
      return;
    }

    setBarWidth(nextWidth);
    translateX.setValue(activeOffset(nextWidth, tabIndex(activeTab)));
  }

  const slotWidth = barWidth ? barWidth / tabs.length : 0;
  const indicatorWidth = slotWidth ? Math.max(slotWidth - 10, 0) : 0;

  return (
    <View style={styles.wrapper}>
      <View onLayout={handleLayout} style={styles.bar}>
        {indicatorWidth ? (
          <Animated.View
            pointerEvents="none"
            style={[styles.activePill, { width: indicatorWidth, transform: [{ translateX }] }]}
          >
            <View style={styles.activeGlow} />
          </Animated.View>
        ) : null}

        <View style={styles.row}>
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;

            return (
              <Pressable
                accessibilityLabel={tab.label}
                accessibilityRole="button"
                key={tab.id}
                onPress={() => onChange(tab.id)}
                style={({ pressed }) => [styles.item, pressed && styles.pressedItem]}
              >
                <View style={styles.itemInner}>
                  <TabIcon active={isActive} tab={tab.id} />
                  <Text numberOfLines={1} style={[styles.label, isActive && styles.activeLabel]}>
                    {tab.shortLabel}
                  </Text>
                </View>
                <View style={[styles.dot, isActive && styles.activeDot]} />
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.nav,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm
  },
  bar: {
    position: "relative",
    padding: 5,
    borderRadius: 30,
    backgroundColor: colors.navSurface,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    ...shadows.strong
  },
  activePill: {
    position: "absolute",
    top: 5,
    bottom: 5,
    left: 5,
    borderRadius: 26,
    backgroundColor: "rgba(255,255,255,0.08)",
    overflow: "hidden"
  },
  activeGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(245,139,64,0.18)"
  },
  row: {
    flexDirection: "row",
    alignItems: "stretch"
  },
  item: {
    flex: 1,
    minHeight: 72,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24
  },
  pressedItem: {
    opacity: 0.8
  },
  itemInner: {
    alignItems: "center",
    justifyContent: "center",
    gap: 6
  },
  label: {
    fontSize: 10,
    fontWeight: "700",
    fontFamily: headlineFont,
    color: "rgba(255,255,255,0.42)"
  },
  activeLabel: {
    color: colors.white
  },
  dot: {
    marginTop: 3,
    width: 4,
    height: 4,
    borderRadius: radii.pill,
    backgroundColor: "transparent"
  },
  activeDot: {
    backgroundColor: colors.primary
  },
  iconFrame: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center"
  },
  exploreRing: {
    width: 20,
    height: 20,
    borderWidth: 1.8,
    borderRadius: 10
  },
  exploreNeedle: {
    position: "absolute",
    width: 2,
    height: 10,
    borderRadius: radii.pill,
    transform: [{ rotate: "32deg" }]
  },
  exploreNeedleHead: {
    position: "absolute",
    top: 3,
    right: 4,
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderBottomWidth: 6,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    transform: [{ rotate: "32deg" }]
  },
  exploreCenterDot: {
    position: "absolute",
    width: 4,
    height: 4,
    borderRadius: radii.pill
  },
  createCircle: {
    width: 21,
    height: 21,
    borderWidth: 1.8,
    borderRadius: 11
  },
  createVertical: {
    position: "absolute",
    width: 2,
    height: 10,
    borderRadius: radii.pill
  },
  createHorizontal: {
    position: "absolute",
    width: 10,
    height: 2,
    borderRadius: radii.pill
  },
  messageBubble: {
    width: 21,
    height: 15,
    borderWidth: 1.8,
    borderRadius: 6
  },
  messageTail: {
    position: "absolute",
    left: 4,
    bottom: 2,
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderTopWidth: 6,
    borderLeftColor: "transparent"
  },
  messageLine: {
    position: "absolute",
    left: 7,
    height: 1.8,
    borderRadius: radii.pill
  },
  messageLineTop: {
    top: 8,
    width: 9
  },
  messageLineBottom: {
    top: 12,
    width: 6
  },
  profileHead: {
    position: "absolute",
    top: 2,
    width: 8,
    height: 8,
    borderWidth: 1.8,
    borderRadius: radii.pill
  },
  profileShoulders: {
    position: "absolute",
    bottom: 2,
    width: 17,
    height: 10,
    borderWidth: 1.8,
    borderBottomWidth: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  }
});
