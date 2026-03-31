import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../theme/colors";
import { TabId } from "../types";

const tabs: Array<{ id: TabId; label: string; icon: string }> = [
  { id: "home", label: "Ana Sayfa", icon: "H" },
  { id: "community", label: "Topluluk", icon: "T" },
  { id: "create", label: "Ilan", icon: "+" },
  { id: "messages", label: "Mesaj", icon: "M" },
  { id: "profile", label: "Profil", icon: "P" }
];

type Props = {
  activeTab: TabId;
  onChange: (tab: TabId) => void;
};

export function BottomTabBar({ activeTab, onChange }: Props) {
  return (
    <View style={styles.wrapper}>
      {tabs.map((tab) => {
        const active = tab.id === activeTab;

        return (
          <Pressable
            key={tab.id}
            onPress={() => onChange(tab.id)}
            style={[styles.item, tab.id === "create" && styles.createItem, active && styles.activeItem]}
          >
            <Text style={[styles.icon, tab.id === "create" && styles.createIcon, active && styles.activeText]}>
              {tab.icon}
            </Text>
            <Text style={[styles.label, tab.id === "create" && styles.createLabel, active && styles.activeText]}>
              {tab.label}
            </Text>
            {active ? <View style={styles.activeDot} /> : null}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 28,
    backgroundColor: "rgba(255, 253, 252, 0.96)",
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 10
    },
    elevation: 8
  },
  item: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 18
  },
  createItem: {
    marginTop: -18,
    paddingVertical: 14,
    backgroundColor: colors.secondary
  },
  activeItem: {
    backgroundColor: colors.primarySoft
  },
  icon: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textMuted
  },
  createIcon: {
    color: colors.white
  },
  label: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: "700",
    color: colors.textMuted
  },
  createLabel: {
    color: colors.white
  },
  activeText: {
    color: colors.primary
  },
  activeDot: {
    width: 5,
    height: 5,
    marginTop: 6,
    borderRadius: 999,
    backgroundColor: colors.primary
  }
});
