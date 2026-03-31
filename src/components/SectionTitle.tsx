import { StyleSheet, Text, View } from "react-native";

import { colors } from "../theme/colors";

type Props = {
  title: string;
  action?: string;
};

export function SectionTitle({ title, action }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      {action ? <Text style={styles.action}>{action}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.2,
    color: colors.text
  },
  action: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.secondary
  }
});
