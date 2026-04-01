import { StyleSheet, Text, View } from "react-native";

import { colors } from "../../theme/colors";
import { headlineFont } from "../../theme/typography";
import { radii, spacing } from "../../theme/tokens";

type Props = {
  value: string;
  label: string;
};

export function StatCard({ value, label }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      <View style={styles.bar} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 92,
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: colors.surfaceMuted
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textMuted
  },
  value: {
    marginTop: spacing.sm,
    fontSize: 28,
    fontWeight: "700",
    fontFamily: headlineFont,
    color: colors.text
  },
  bar: {
    width: 26,
    height: 4,
    marginTop: spacing.sm,
    borderRadius: 999,
    backgroundColor: colors.primary
  }
});
