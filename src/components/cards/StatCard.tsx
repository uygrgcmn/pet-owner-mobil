import { StyleSheet, Text, View } from "react-native";

import { colors } from "../../theme/colors";

type Props = {
  value: string;
  label: string;
};

export function StatCard({ value, label }: Props) {
  return (
    <View style={styles.card}>
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
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border
  },
  value: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.secondary
  },
  label: {
    marginTop: 8,
    fontSize: 13,
    color: colors.textMuted
  }
});
