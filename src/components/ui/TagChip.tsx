import { Pressable, StyleSheet, Text } from "react-native";

import { colors } from "../../theme/colors";
import { radii } from "../../theme/tokens";

type Props = {
  label: string;
  active?: boolean;
  dark?: boolean;
  onPress?: () => void;
};

export function TagChip({ label, active = false, dark = false, onPress }: Props) {
  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole={onPress ? "button" : "text"}
      disabled={!onPress}
      onPress={onPress}
      style={[styles.base, dark && styles.dark, active && styles.active]}
    >
      <Text style={[styles.text, dark && styles.darkText, active && styles.activeText]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border
  },
  dark: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderColor: "rgba(255,255,255,0.10)"
  },
  active: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  text: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.textMuted
  },
  darkText: {
    color: colors.white
  },
  activeText: {
    color: colors.white
  }
});
