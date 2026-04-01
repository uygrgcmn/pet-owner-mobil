import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { getConversationImage } from "../../data/mockImages";
import { colors } from "../../theme/colors";
import { headlineFont } from "../../theme/typography";
import { radii, spacing } from "../../theme/tokens";
import { Conversation } from "../../types";

type Props = {
  conversation: Conversation;
  onOpen?: () => void;
};

export function ConversationCard({ conversation, onOpen }: Props) {
  return (
    <Pressable accessibilityLabel={`${conversation.name} konusmasini ac`} accessibilityRole="button" onPress={onOpen} style={styles.card}>
      <View style={styles.avatar}>
        <Image source={getConversationImage(conversation.id)} style={styles.avatarImage} />
      </View>
      <View style={styles.body}>
        <View style={styles.header}>
          <Text style={styles.name}>{conversation.name}</Text>
          <Text style={styles.time}>{conversation.time}</Text>
        </View>
        <Text style={styles.message}>{conversation.lastMessage}</Text>
      </View>
      {conversation.unread > 0 ? (
        <View style={styles.unread}>
          <Text style={styles.unreadText}>{conversation.unread}</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: colors.surfaceStrong
  },
  avatarImage: {
    width: "100%",
    height: "100%"
  },
  body: {
    flex: 1,
    marginLeft: spacing.sm
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: headlineFont,
    color: colors.text
  },
  time: {
    fontSize: 12,
    color: colors.textMuted
  },
  message: {
    marginTop: spacing.xs,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textMuted
  },
  unread: {
    minWidth: 30,
    height: 30,
    marginLeft: spacing.sm,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary
  },
  unreadText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.white
  }
});
