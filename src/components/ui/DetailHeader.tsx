import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../../theme/colors";
import { headlineFont } from "../../theme/typography";
import { radii, spacing } from "../../theme/tokens";

type Props = {
  title: string;
  subtitle?: string;
  onBack: () => void;
};

export function DetailHeader({ title, subtitle, onBack }: Props) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.topRow}>
        <Pressable accessibilityLabel="Geri don" accessibilityRole="button" onPress={onBack} style={styles.backButton}>
          <View style={styles.backArrow} />
        </Pressable>
      </View>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.xl
  },
  topRow: {
    marginBottom: spacing.md
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: radii.pill,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border
  },
  backArrow: {
    width: 11,
    height: 11,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: colors.text,
    transform: [{ rotate: "45deg" }]
  },
  title: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "700",
    fontFamily: headlineFont,
    color: colors.text
  },
  subtitle: {
    marginTop: spacing.xs,
    fontSize: 15,
    lineHeight: 24,
    color: colors.textMuted
  }
});
