import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../theme/colors";
import { TabId } from "../types";

const tabs: Array<{ id: TabId; label: string; icon: string }> = [
  { id: "home", label: "Ana Sayfa", icon: "O" },
  { id: "community", label: "Topluluk", icon: "[]" },
  { id: "create", label: "Ilan", icon: "+" },
  { id: "messages", label: "Mesaj", icon: "//" },
  { id: "profile", label: "Profil", icon: ":)" }
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
            style={[styles.item, active && styles.activeItem]}
          >
            <Text style={[styles.icon, active && styles.activeText]}>{tab.icon}</Text>
            <Text style={[styles.label, active && styles.activeText]}>{tab.label}</Text>
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
    borderRadius: 24,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border
  },
  item: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 16
  },
  activeItem: {
    backgroundColor: colors.primarySoft
  },
  icon: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textMuted
  },
  label: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: "600",
    color: colors.textMuted
  },
  activeText: {
    color: colors.primary
  }
});
