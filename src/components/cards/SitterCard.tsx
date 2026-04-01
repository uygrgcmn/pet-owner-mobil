import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { getSitterImage } from "../../data/mockImages";
import { colors } from "../../theme/colors";
import { headlineFont } from "../../theme/typography";
import { radii, spacing } from "../../theme/tokens";
import { PetSitter } from "../../types";

type Props = {
  sitter: PetSitter;
  onOpen?: () => void;
};

export function SitterCard({ sitter, onOpen }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.identity}>
          <View style={styles.avatar}>
            <Image source={getSitterImage(sitter.id)} style={styles.avatarImage} />
          </View>
          <View style={styles.identityBody}>
            <Text style={styles.name}>{sitter.name}</Text>
            <Text style={styles.meta}>
              {sitter.city} / {sitter.rating.toFixed(1)} puan / Hizli yanit
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
        <Text style={styles.footerText}>Dogrulanmis profil, duzenli foto raporu ve hizli mesaj yaniti.</Text>
        <Pressable accessibilityLabel={`${sitter.name} profilini gor`} accessibilityRole="button" onPress={onOpen} style={styles.cta}>
          <Text style={styles.ctaText}>Profili gor</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.lg,
    borderRadius: radii.lg,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.sm
  },
  identity: {
    flexDirection: "row",
    flex: 1
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: colors.surfaceStrong
  },
  avatarImage: {
    width: "100%",
    height: "100%"
  },
  identityBody: {
    flex: 1,
    marginLeft: spacing.sm
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: headlineFont,
    color: colors.text
  },
  meta: {
    marginTop: spacing.xs,
    fontSize: 13,
    lineHeight: 20,
    color: colors.textMuted
  },
  priceBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.sm,
    paddingVertical: 10,
    borderRadius: radii.pill,
    backgroundColor: colors.primarySoft
  },
  price: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.primary
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
    marginTop: spacing.md
  },
  tag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border
  },
  tagText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.text
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border
  },
  footerText: {
    flex: 1,
    marginRight: spacing.sm,
    fontSize: 12,
    lineHeight: 19,
    color: colors.textMuted
  },
  cta: {
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: radii.pill,
    backgroundColor: colors.secondary
  },
  ctaText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.white
  }
});
