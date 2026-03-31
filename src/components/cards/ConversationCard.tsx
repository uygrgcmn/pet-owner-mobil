import { StyleSheet, Text, View } from "react-native";

import { colors } from "../../theme/colors";
import { Conversation } from "../../types";

export function ConversationCard({ conversation }: { conversation: Conversation }) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{conversation.name.slice(0, 1)}</Text>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primarySoft
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.primary
  },
  body: {
    flex: 1,
    marginLeft: 12
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  name: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.text
  },
  time: {
    fontSize: 12,
    color: colors.textMuted
  },
  message: {
    marginTop: 6,
    fontSize: 13,
    color: colors.textMuted
  },
  unread: {
    minWidth: 26,
    height: 26,
    marginLeft: 10,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary
  },
  unreadText: {
    color: "#FFFFFF",
    fontWeight: "800"
  }
});
