import { StyleSheet, Text, View } from "react-native";

import { PetSitter } from "../../types";
import { colors } from "../../theme/colors";

export function SitterCard({ sitter }: { sitter: PetSitter }) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View>
          <Text style={styles.name}>{sitter.name}</Text>
          <Text style={styles.meta}>
            {sitter.city} • {sitter.rating.toFixed(1)} puan
          </Text>
        </View>
        <View style={styles.priceBadge}>
          <Text style={styles.price}>{sitter.price}</Text>
        </View>
      </View>
      <View style={styles.tags}>
        {sitter.tags.map((tag) => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 18,
    borderRadius: 22,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12
  },
  name: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.text
  },
  meta: {
    marginTop: 6,
    fontSize: 13,
    color: colors.textMuted
  },
  priceBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: colors.primarySoft
  },
  price: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.primary
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 16
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#EEF4EE"
  },
  tagText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.accent
  }
});
