import { StyleSheet, Text, View } from "react-native";

import { CommunityPost } from "../../types";
import { colors } from "../../theme/colors";

export function PostCard({ post }: { post: CommunityPost }) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.category}>{post.category}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{post.badge}</Text>
        </View>
      </View>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.description}>{post.description}</Text>
      <Text style={styles.author}>Paylasan: {post.author}</Text>
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
    alignItems: "center"
  },
  category: {
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    color: colors.secondary
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: colors.primarySoft
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.primary
  },
  title: {
    marginTop: 14,
    fontSize: 18,
    fontWeight: "800",
    color: colors.text
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textMuted
  },
  author: {
    marginTop: 14,
    fontSize: 12,
    fontWeight: "700",
    color: colors.text
  }
});
