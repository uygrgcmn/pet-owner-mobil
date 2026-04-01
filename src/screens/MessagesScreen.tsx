import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ConversationCard } from "../components/cards/ConversationCard";
import { SurfaceCard } from "../components/ui/SurfaceCard";
import { getSitterImage } from "../data/mockImages";
import { useMockApp } from "../store/mockAppStore";
import { colors } from "../theme/colors";
import { headlineFont } from "../theme/typography";
import { radii, spacing } from "../theme/tokens";
import { ScreenActions } from "../types";

export function MessagesScreen({ navigate }: ScreenActions) {
  const { conversations, openConversation, petSitters } = useMockApp();

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.eyebrow}>INBOX / PRIORITY</Text>
          <Text style={styles.title}>Mesajlari hizli, net ve operasyonel bir duzende yonet.</Text>
        </View>
        <View style={styles.unreadPill}>
          <Text style={styles.unreadPillText}>3 yeni</Text>
        </View>
      </View>

      <SurfaceCard style={styles.searchCard}>
        <View style={styles.searchIcon} />
        <Text style={styles.searchText}>Bakici, mesaj veya topluluk bildirimi ara</Text>
      </SurfaceCard>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionEyebrow}>Hizli erisim</Text>
        <Text style={styles.sectionTitle}>Son aktif bakicilar</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recentRow}>
        {petSitters.map((sitter, index) => (
          <Pressable
            key={sitter.id}
            onPress={() => navigate({ screen: "sitter-detail", sitterId: sitter.id })}
            style={[styles.recentCard, index === 0 && styles.recentCardPrimary]}
          >
            <Image source={getSitterImage(sitter.id)} style={styles.recentAvatar} />
            <Text style={styles.recentName}>{sitter.name}</Text>
            <Text style={styles.recentMeta}>{index === 0 ? "Simdi aktif" : "Ortalama cevap 12 dk"}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <SurfaceCard tone="dark" style={styles.summaryCard}>
        <Text style={styles.summaryEyebrow}>Bugunku durum</Text>
        <Text style={styles.summaryTitle}>2 gorusmede tarih teyidi, 1 gorusmede yeni teklif bekleniyor.</Text>
      </SurfaceCard>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionEyebrow}>Tum konusmalar</Text>
        <Text style={styles.sectionTitle}>Oncelikli inbox</Text>
      </View>

      {conversations.map((conversation) => (
        <ConversationCard
          key={conversation.id}
          conversation={conversation}
          onOpen={() => {
            openConversation(conversation.id);
            navigate({ screen: "conversation-detail", conversationId: conversation.id });
          }}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.xl,
    gap: spacing.sm
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    color: colors.textMuted
  },
  title: {
    width: 260,
    marginTop: spacing.sm,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "700",
    fontFamily: headlineFont,
    color: colors.text
  },
  unreadPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: radii.pill,
    backgroundColor: colors.primarySoft
  },
  unreadPillText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.primary
  },
  searchCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.lg,
    marginBottom: spacing.xl
  },
  searchIcon: {
    width: 12,
    height: 12,
    borderRadius: 999,
    backgroundColor: colors.textMuted
  },
  searchText: {
    fontSize: 14,
    color: colors.textMuted
  },
  sectionHeader: {
    marginBottom: spacing.lg
  },
  sectionEyebrow: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.1,
    color: colors.textMuted
  },
  sectionTitle: {
    marginTop: spacing.xs,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "700",
    fontFamily: headlineFont,
    color: colors.text
  },
  recentRow: {
    paddingRight: spacing.lg,
    gap: spacing.sm,
    marginBottom: spacing.xl
  },
  recentCard: {
    width: 160,
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border
  },
  recentCardPrimary: {
    backgroundColor: colors.infoSurfaceSoft
  },
  recentAvatar: {
    width: "100%",
    height: 148,
    borderRadius: radii.md,
    marginBottom: spacing.md
  },
  recentName: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: headlineFont,
    color: colors.text
  },
  recentMeta: {
    marginTop: spacing.xs,
    fontSize: 12,
    lineHeight: 18,
    color: colors.textMuted
  },
  summaryCard: {
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderColor: "rgba(255,255,255,0.08)"
  },
  summaryEyebrow: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.1,
    color: colors.primary
  },
  summaryTitle: {
    marginTop: spacing.sm,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "700",
    fontFamily: headlineFont,
    color: colors.white
  }
});
