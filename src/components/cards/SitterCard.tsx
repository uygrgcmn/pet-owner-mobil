import { StyleSheet, Text, View } from "react-native";

import { colors } from "../../theme/colors";
import { PetSitter } from "../../types";

export function SitterCard({ sitter }: { sitter: PetSitter }) {
  const initials = sitter.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.identity}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View style={styles.identityBody}>
            <Text style={styles.name}>{sitter.name}</Text>
            <Text style={styles.meta}>
              {sitter.city} / {sitter.rating.toFixed(1)} puan
            </Text>
          </View>
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

      <View style={styles.footer}>
        <Text style={styles.footerText}>Hizli cevap veren profesyonel bakici</Text>
        <View style={styles.cta}>
          <Text style={styles.ctaText}>Profili incele</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 18,
    borderRadius: 26,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 10
    },
    elevation: 4
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12
  },
  identity: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center"
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.secondary
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.white
  },
  identityBody: {
    flex: 1,
    marginLeft: 12
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
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 16,
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
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 18,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border
  },
  footerText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: colors.textMuted
  },
  cta: {
    marginLeft: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: colors.secondary
  },
  ctaText: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.white
  }
});
