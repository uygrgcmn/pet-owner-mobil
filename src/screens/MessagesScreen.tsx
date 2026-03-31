import { ScrollView, StyleSheet } from "react-native";

import { ConversationCard } from "../components/cards/ConversationCard";
import { conversations } from "../data/mockData";

export function MessagesScreen() {
  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {conversations.map((conversation) => (
        <ConversationCard key={conversation.id} conversation={conversation} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingBottom: 24
  }
});
