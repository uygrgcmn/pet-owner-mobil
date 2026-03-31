import { StyleSheet, Text, View } from "react-native";

import { colors } from "../../theme/colors";

type Props = {
  value: string;
  label: string;
};

export function StatCard({ value, label }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.topBar} />
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 92,
    padding: 16,
    borderRadius: 24,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 8
    },
    elevation: 4
  },
  topBar: {
    width: 28,
    height: 4,
    borderRadius: 999,
    marginBottom: 14,
    backgroundColor: colors.gold
  },
  value: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.secondary
  },
  label: {
    marginTop: 8,
    fontSize: 13,
    color: colors.textMuted
  }
});
