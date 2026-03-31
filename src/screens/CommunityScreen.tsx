import { ScrollView, StyleSheet, View } from "react-native";

import { PostCard } from "../components/cards/PostCard";
import { communityPosts } from "../data/mockData";

export function CommunityScreen() {
  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View>
        {communityPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingBottom: 24
  }
});
