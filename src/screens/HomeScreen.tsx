import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { SurfaceCard } from "../components/ui/SurfaceCard";
import { TagChip } from "../components/ui/TagChip";
import { getPetImage, getPostImage, getSitterImage, ownerProfileImage } from "../data/mockImages";
import { useMockApp } from "../store/mockAppStore";
import { colors } from "../theme/colors";
import { headlineFont } from "../theme/typography";
import { radii, spacing, shadows } from "../theme/tokens";
import { ScreenActions } from "../types";

const quickFilters = ["Bugun musait", "Evde bakim", "Kedi", "Kopek", "Haritada kesfet"];

export function ExploreScreen({ navigate, switchTab }: ScreenActions) {
  const { communityPosts, ownerRequestAds, petSitters } = useMockApp();
  const sortedCommunityPosts = [...communityPosts].sort(
    (left, right) => new Date(right.openedAt).getTime() - new Date(left.openedAt).getTime()
  );
  const latestCommunityPost = sortedCommunityPosts[0];

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.topBar}>
        <View style={styles.topCopy}>
          <Text style={styles.topEyebrow}>Istanbul / Pet care marketplace</Text>
          <Text style={styles.topTitle}>Evcil dostun icin dogru bakiciyi ya da dogru talebi hizla kesfet.</Text>
        </View>
        <Image source={ownerProfileImage} style={styles.avatar} />
      </View>

      <SurfaceCard elevated style={styles.searchShell}>
        <View style={styles.searchRow}>
          <View style={styles.searchIcon} />
          <View style={styles.searchTextWrap}>
            <Text style={styles.searchTitle}>Bakici, konum veya hizmet ara</Text>
            <Text style={styles.searchSubtitle}>Kadikoy, evde bakim, kedi bakicisi...</Text>
          </View>
          <View style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Ara</Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {quickFilters.map((filter) => {
            const isMap = filter === "Haritada kesfet";

            return (
              <TagChip
                key={filter}
                active={isMap}
                label={filter}
                onPress={isMap ? () => navigate({ screen: "discovery-map" }) : undefined}
              />
            );
          })}
        </ScrollView>
      </SurfaceCard>

      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>Bakicilar</Text>
          <Text style={styles.sectionMeta}>Dogrulanmis, puanli ve hemen incelenebilir profiller.</Text>
        </View>
        <Pressable onPress={() => navigate({ screen: "sitter-directory" })}>
          <Text style={styles.sectionLink}>Tumunu gor</Text>
        </Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.rail}>
        {petSitters.map((sitter, index) => (
          <Pressable key={sitter.id} onPress={() => navigate({ screen: "sitter-detail", sitterId: sitter.id })}>
            <View style={[styles.sitterCard, index === petSitters.length - 1 && styles.lastCard]}>
              <Image source={getSitterImage(sitter.id)} style={styles.sitterImage} />
              <View style={styles.sitterContent}>
                <View style={styles.sitterTopRow}>
                  <Text style={styles.cardTitle}>{sitter.name}</Text>
                  <Text style={styles.ratingText}>{sitter.rating.toFixed(1)}</Text>
                </View>
                <Text style={styles.cardMeta}>{sitter.city}</Text>
                <Text style={styles.priceText}>{sitter.price}</Text>
                <View style={styles.inlineTagRow}>
                  {sitter.tags.slice(0, 2).map((tag) => (
                    <TagChip key={tag} label={tag} />
                  ))}
                </View>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>Bakici arayanlar</Text>
          <Text style={styles.sectionMeta}>Takvim, butce ve ihtiyac bilgisi net owner request ilanlari.</Text>
        </View>
        <Pressable onPress={() => switchTab("create")}>
          <Text style={styles.sectionLink}>Ilan ver</Text>
        </Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.rail}>
        {ownerRequestAds.map((request, index) => (
          <Pressable key={request.id} onPress={() => switchTab("create")}>
            <View style={[styles.requestCard, index === ownerRequestAds.length - 1 && styles.lastCard]}>
              <Image source={getPetImage(request.imageId)} style={styles.requestImage} />
              <View style={styles.requestBody}>
                <Text style={styles.requestOwner}>{request.ownerName}</Text>
                <Text numberOfLines={2} style={styles.requestTitle}>{request.title}</Text>
                <Text numberOfLines={2} style={styles.requestSummary}>{request.summary}</Text>
                <View style={styles.requestMetaRow}>
                  <Text style={styles.requestMetaText}>{request.location}</Text>
                  <Text style={styles.requestMetaDivider}>/</Text>
                  <Text style={styles.requestMetaText}>{request.schedule}</Text>
                </View>
                <Text style={styles.requestBudget}>{request.budget}</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.communityHeader}>
        <View>
          <Text style={styles.sectionTitle}>Topluluk akisi</Text>
          <Text style={styles.sectionMeta}>En son acilan ilanlar ve guncel destek postlari.</Text>
        </View>
        {latestCommunityPost ? (
          <Pressable onPress={() => navigate({ screen: "community-post-detail", postId: latestCommunityPost.id })}>
            <Text style={styles.sectionLink}>Son ilana git</Text>
          </Pressable>
        ) : null}
      </View>

      <View style={styles.communityStack}>
        {sortedCommunityPosts.map((post) => (
          <Pressable key={post.id} onPress={() => navigate({ screen: "community-post-detail", postId: post.id })}>
            <SurfaceCard style={styles.communityCard}>
              <Image source={getPostImage(post.id)} style={styles.communityImage} />
              <View style={styles.communityBody}>
                <View style={styles.communityTopRow}>
                  <Text style={styles.communityBadge}>{post.badge}</Text>
                  <Text style={styles.communityTime}>{formatOpenedAt(post.openedAt)}</Text>
                </View>
                <Text numberOfLines={2} style={styles.communityTitle}>{post.title}</Text>
                <Text numberOfLines={2} style={styles.communityDescription}>{post.description}</Text>
                <Text style={styles.communityMeta}>{post.category} / {post.author}</Text>
              </View>
            </SurfaceCard>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

function formatOpenedAt(value: string) {
  const date = new Date(value);
  const now = new Date();
  const hours = Math.max(1, Math.round((now.getTime() - date.getTime()) / (1000 * 60 * 60)));

  if (hours < 24) {
    return `${hours} sa once`;
  }

  return `${Math.round(hours / 24)} gun once`;
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
    gap: spacing.md,
    marginBottom: spacing.lg
  },
  topCopy: {
    flex: 1
  },
  topEyebrow: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.textMuted
  },
  topTitle: {
    marginTop: spacing.xs,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "700",
    fontFamily: headlineFont,
    color: colors.text
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 18,
    ...shadows.soft
  },
  searchShell: {
    padding: spacing.md,
    marginBottom: spacing.xl
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm
  },
  searchIcon: {
    width: 14,
    height: 14,
    borderRadius: radii.pill,
    backgroundColor: colors.text
  },
  searchTextWrap: {
    flex: 1
  },
  searchTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text
  },
  searchSubtitle: {
    marginTop: 2,
    fontSize: 12,
    color: colors.textMuted
  },
  searchButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: radii.pill,
    backgroundColor: colors.primary
  },
  searchButtonText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.white
  },
  filterRow: {
    gap: spacing.xs,
    paddingRight: spacing.sm,
    marginTop: spacing.md
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: spacing.md,
    marginBottom: spacing.md
  },
  sectionTitle: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "700",
    fontFamily: headlineFont,
    color: colors.text
  },
  sectionMeta: {
    marginTop: 2,
    fontSize: 13,
    lineHeight: 19,
    color: colors.textMuted
  },
  sectionLink: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.brand
  },
  rail: {
    paddingRight: spacing.lg,
    marginBottom: spacing.xl
  },
  sitterCard: {
    width: 280,
    marginRight: spacing.sm,
    borderRadius: radii.lg,
    overflow: "hidden",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border
  },
  lastCard: {
    marginRight: 0
  },
  sitterImage: {
    width: "100%",
    height: 204
  },
  sitterContent: {
    padding: spacing.md
  },
  sitterTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.sm
  },
  cardTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    fontFamily: headlineFont,
    color: colors.text
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.text
  },
  cardMeta: {
    marginTop: spacing.xs,
    fontSize: 13,
    color: colors.textMuted
  },
  priceText: {
    marginTop: spacing.xs,
    fontSize: 14,
    fontWeight: "700",
    color: colors.text
  },
  inlineTagRow: {
    flexDirection: "row",
    gap: spacing.xs,
    marginTop: spacing.md
  },
  requestCard: {
    width: 308,
    marginRight: spacing.sm,
    borderRadius: radii.lg,
    overflow: "hidden",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border
  },
  requestImage: {
    width: "100%",
    height: 180
  },
  requestBody: {
    padding: spacing.md
  },
  requestOwner: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.textMuted
  },
  requestTitle: {
    marginTop: spacing.xs,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
    fontFamily: headlineFont,
    color: colors.text
  },
  requestSummary: {
    marginTop: spacing.xs,
    fontSize: 13,
    lineHeight: 20,
    color: colors.textMuted
  },
  requestMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginTop: spacing.md
  },
  requestMetaText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.text
  },
  requestMetaDivider: {
    fontSize: 12,
    color: colors.textMuted
  },
  requestBudget: {
    marginTop: spacing.xs,
    fontSize: 14,
    fontWeight: "700",
    color: colors.primary
  },
  communityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: spacing.md,
    marginBottom: spacing.md
  },
  communityStack: {
    gap: spacing.sm
  },
  communityCard: {
    flexDirection: "row",
    padding: 0,
    overflow: "hidden"
  },
  communityImage: {
    width: 122,
    height: 122
  },
  communityBody: {
    flex: 1,
    padding: spacing.md
  },
  communityTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.sm
  },
  communityBadge: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.primary
  },
  communityTime: {
    fontSize: 11,
    color: colors.textMuted
  },
  communityTitle: {
    marginTop: spacing.sm,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
    fontFamily: headlineFont,
    color: colors.text
  },
  communityDescription: {
    marginTop: spacing.xs,
    fontSize: 13,
    lineHeight: 19,
    color: colors.textMuted
  },
  communityMeta: {
    marginTop: spacing.sm,
    fontSize: 12,
    fontWeight: "700",
    color: colors.textMuted
  }
});
