import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { SurfaceCard } from "../components/ui/SurfaceCard";
import { getPetImage, ownerProfileImage } from "../data/mockImages";
import { useMockApp } from "../store/mockAppStore";
import { colors } from "../theme/colors";
import { headlineFont } from "../theme/typography";
import { radii, spacing } from "../theme/tokens";
import { ScreenActions } from "../types";

export function ProfileScreen({ navigate }: ScreenActions) {
  const { profilePets, profileUser, userAds } = useMockApp();
  const featuredAd = userAds[0];
  const secondaryAds = userAds.slice(1, 3);

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <SurfaceCard elevated tone="dark" style={styles.heroCard}>
        <View style={styles.heroTop}>
          <View style={styles.identityBlock}>
            <Text style={styles.heroEyebrow}>OWNER PROFILE</Text>
            <Text style={styles.heroName}>{profileUser.name}</Text>
            <Text style={styles.heroBio}>{profileUser.bio}</Text>
          </View>
          <Image source={ownerProfileImage} style={styles.heroAvatar} />
        </View>

        <View style={styles.metricRow}>
          <View style={styles.metricCell}>
            <Text style={styles.metricValue}>{profileUser.rating}</Text>
            <Text style={styles.metricLabel}>Puan</Text>
          </View>
          <View style={styles.metricCell}>
            <Text style={styles.metricValue}>{profileUser.reviews}</Text>
            <Text style={styles.metricLabel}>Yorum</Text>
          </View>
          <View style={styles.metricCell}>
            <Text style={styles.metricValue}>{profileUser.years}</Text>
            <Text style={styles.metricLabel}>Yil</Text>
          </View>
        </View>
      </SurfaceCard>

      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionEyebrow}>Pet portfolio</Text>
          <Text style={styles.sectionTitle}>Evcil dostlarim</Text>
        </View>
        <Pressable onPress={() => navigate({ screen: "profile-settings" })}>
          <Text style={styles.sectionLink}>Ayarlari ac</Text>
        </Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.petRow}>
        {profilePets.map((pet, index) => (
          <Pressable key={pet.id} onPress={() => navigate({ screen: "pet-detail", petId: pet.id })}>
            <SurfaceCard style={[styles.petCard, index === profilePets.length - 1 && styles.petCardLast]}>
              <Image source={getPetImage(pet.id)} style={styles.petImage} />
              <Text style={styles.petName}>{pet.name}</Text>
              <Text style={styles.petInfo}>{pet.info}</Text>
            </SurfaceCard>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionEyebrow}>Ilan portfoyu</Text>
          <Text style={styles.sectionTitle}>Yayinlanan ilanlar</Text>
        </View>
      </View>

      {featuredAd ? (
        <Pressable onPress={() => navigate({ screen: "ad-detail", adId: featuredAd.id })}>
          <SurfaceCard style={styles.primaryAdCard}>
            <Text style={styles.adBadge}>{featuredAd.badge}</Text>
            <Text style={styles.primaryAdTitle}>{featuredAd.title}</Text>
            <Text style={styles.primaryAdMeta}>{featuredAd.meta}</Text>
            <Image source={getPetImage(featuredAd.imageId)} style={styles.primaryAdImage} />
          </SurfaceCard>
        </Pressable>
      ) : null}

      <View style={styles.adGrid}>
        {secondaryAds.map((ad, index) => (
          <Pressable key={ad.id} onPress={() => navigate({ screen: "ad-detail", adId: ad.id })} style={styles.adGridItem}>
            <SurfaceCard style={[styles.secondaryAdCard, index === 1 && styles.secondaryAdMint]}>
              <Text style={styles.secondaryAdBadge}>{ad.badge}</Text>
              <Text style={styles.secondaryAdTitle}>{ad.title}</Text>
              <Text style={styles.secondaryAdMeta}>{ad.meta}</Text>
            </SurfaceCard>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl
  },
  heroCard: {
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderColor: "rgba(255,255,255,0.08)"
  },
  heroTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: spacing.md
  },
  identityBlock: {
    flex: 1
  },
  heroEyebrow: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.1,
    color: colors.primary
  },
  heroName: {
    marginTop: spacing.sm,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "700",
    fontFamily: headlineFont,
    color: colors.white
  },
  heroBio: {
    marginTop: spacing.sm,
    fontSize: 14,
    lineHeight: 22,
    color: "rgba(255,255,255,0.74)"
  },
  heroAvatar: {
    width: 96,
    height: 96,
    borderRadius: 28
  },
  metricRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.xl
  },
  metricCell: {
    flex: 1,
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: "rgba(255,255,255,0.06)"
  },
  metricValue: {
    fontSize: 24,
    fontWeight: "700",
    fontFamily: headlineFont,
    color: colors.white
  },
  metricLabel: {
    marginTop: spacing.xs,
    fontSize: 12,
    color: "rgba(255,255,255,0.66)"
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
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
  sectionLink: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.brand
  },
  petRow: {
    paddingRight: spacing.lg,
    gap: spacing.sm,
    marginBottom: spacing.xl
  },
  petCard: {
    width: 220,
    padding: spacing.md
  },
  petCardLast: {
    marginRight: 0
  },
  petImage: {
    width: "100%",
    height: 220,
    borderRadius: radii.md,
    marginBottom: spacing.md
  },
  petName: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: headlineFont,
    color: colors.text
  },
  petInfo: {
    marginTop: spacing.xs,
    fontSize: 13,
    color: colors.textMuted
  },
  primaryAdCard: {
    padding: spacing.lg,
    marginBottom: spacing.sm,
    overflow: "hidden",
    backgroundColor: colors.primarySoft,
    borderColor: "rgba(245, 139, 64, 0.12)"
  },
  adBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
    borderRadius: radii.pill,
    fontSize: 11,
    fontWeight: "700",
    color: colors.primary,
    backgroundColor: colors.white
  },
  primaryAdTitle: {
    width: "70%",
    marginTop: spacing.lg,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "700",
    fontFamily: headlineFont,
    color: colors.text
  },
  primaryAdMeta: {
    marginTop: spacing.sm,
    fontSize: 14,
    lineHeight: 22,
    color: colors.textMuted
  },
  primaryAdImage: {
    position: "absolute",
    right: spacing.lg,
    top: spacing.lg,
    width: 90,
    height: 90,
    borderRadius: 28
  },
  adGrid: {
    flexDirection: "row",
    gap: spacing.sm
  },
  adGridItem: {
    flex: 1
  },
  secondaryAdCard: {
    padding: spacing.lg
  },
  secondaryAdBadge: {
    alignSelf: "flex-start",
    marginBottom: spacing.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
    borderRadius: radii.pill,
    fontSize: 10,
    fontWeight: "700",
    color: colors.brandStrong,
    backgroundColor: colors.canvasRaised
  },
  secondaryAdMint: {
    backgroundColor: colors.discoverySurface,
    borderColor: "rgba(26, 140, 132, 0.08)"
  },
  secondaryAdTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
    fontFamily: headlineFont,
    color: colors.text
  },
  secondaryAdMeta: {
    marginTop: spacing.xs,
    fontSize: 13,
    lineHeight: 20,
    color: colors.textMuted
  }
});
