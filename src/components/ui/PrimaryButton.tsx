import { GestureResponderEvent, Pressable, StyleProp, StyleSheet, Text, ViewStyle } from "react-native";

import { colors } from "../../theme/colors";
import { headlineFont } from "../../theme/typography";
import { radii, spacing } from "../../theme/tokens";

type Props = {
  label: string;
  tone?: "primary" | "secondary";
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
};

export function PrimaryButton({ label, tone = "secondary", style, disabled = false, onPress }: Props) {
  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.base,
        tone === "primary" ? styles.primary : styles.secondary,
        disabled && styles.disabled,
        style
      ]}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 52,
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
    borderRadius: radii.md
  },
  primary: {
    backgroundColor: colors.primary
  },
  secondary: {
    backgroundColor: colors.secondary
  },
  disabled: {
    opacity: 0.5
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    fontFamily: headlineFont,
    color: colors.white
  }
});
