import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { getPostImage } from "../../data/mockImages";
import { colors } from "../../theme/colors";
import { headlineFont } from "../../theme/typography";
import { radii, spacing } from "../../theme/tokens";
import { CommunityPost } from "../../types";

type Props = {
  post: CommunityPost;
  onOpen?: () => void;
};

export function PostCard({ post, onOpen }: Props) {
  return (
    <View style={styles.card}>
      <Image source={getPostImage(post.id)} style={styles.previewImage} />
      <View style={styles.header}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{post.category}</Text>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{post.badge}</Text>
        </View>
      </View>

      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.description}>{post.description}</Text>

      <View style={styles.footer}>
        <View>
          <Text style={styles.authorLabel}>Paylasan</Text>
          <Text style={styles.author}>{post.author}</Text>
        </View>
        {onOpen ? (
          <Pressable accessibilityLabel={`${post.title} detayini ac`} accessibilityRole="button" onPress={onOpen} style={styles.cta}>
            <Text style={styles.ctaText}>Detay</Text>
          </Pressable>
        ) : null}
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
  previewImage: {
    width: "100%",
    height: 236,
    marginBottom: spacing.md,
    borderRadius: radii.md
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border
  },
  categoryText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.text
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: radii.pill,
    backgroundColor: colors.primarySoft
  },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.primary
  },
  title: {
    marginTop: spacing.sm,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "700",
    fontFamily: headlineFont,
    color: colors.text
  },
  description: {
    marginTop: spacing.sm,
    fontSize: 15,
    lineHeight: 23,
    color: colors.textMuted
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border
  },
  authorLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.textMuted
  },
  author: {
    marginTop: 3,
    fontSize: 14,
    fontWeight: "700",
    color: colors.text
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
