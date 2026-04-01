import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { PrimaryButton } from "../components/ui/PrimaryButton";
import { SurfaceCard } from "../components/ui/SurfaceCard";
import { TagChip } from "../components/ui/TagChip";
import { getPetImage } from "../data/mockImages";
import { useMockApp } from "../store/mockAppStore";
import { colors } from "../theme/colors";
import { headlineFont } from "../theme/typography";
import { radii, spacing } from "../theme/tokens";
import { CommunityListingType, ListingCategory, ScreenActions } from "../types";
import { getCommunityListingTypeLabel, getListingCategoryLabel } from "../utils/listing";

const categoryOptions: Array<{
  id: ListingCategory;
  title: string;
  description: string;
}> = [
  {
    id: "owner_request",
    title: "Bakici Ariyorum",
    description: "Bakici arayan hayvan sahipleri icin takvim, butce ve beklenti odakli ilan."
  },
  {
    id: "caregiver_offer",
    title: "Bakiciyim",
    description: "Bakicilarin uzmanligini, hizmet alanini ve ucretini gosteren public ilan."
  },
  {
    id: "community",
    title: "Topluluk Ilani",
    description: "Mama destegi, sahiplendirme ve diger topluluk ihtiyaclari icin duyuru akisi."
  }
];

const communityTypeOptions: Array<{ id: CommunityListingType; description: string }> = [
  {
    id: "food_support",
    description: "Mama veya temel ihtiyac destegi duyurusu"
  },
  {
    id: "adoption",
    description: "Sahiplendirme ve yeni yuva arayisi"
  },
  {
    id: "general",
    description: "Diger topluluk paylasimi veya destek ilani"
  }
];

const imageOptions = ["1", "2"];

type FieldConfig = {
  petTypeLabel: string;
  petTypePlaceholder: string;
  serviceLabel: string;
  servicePlaceholder: string;
  scheduleLabel: string;
  schedulePlaceholder: string;
  priceLabel: string;
  pricePlaceholder: string;
  descriptionPlaceholder: string;
};

export function CreateListingScreen({ navigate }: ScreenActions) {
  const { communityQuote, listingForm, listingTips, prepareListingPreview, saveDraft, updateListingField } = useMockApp();

  const selectedCategory = categoryOptions.find((option) => option.id === listingForm.category) ?? null;
  const isCommunity = listingForm.category === "community";
  const hasCommunitySubtype = !isCommunity || Boolean(listingForm.communityType);
  const canSaveDraft = Boolean(listingForm.category && hasCommunitySubtype);
  const canPreview = Boolean(canSaveDraft && listingForm.title.trim() && listingForm.location.trim());
  const fieldConfig = getFieldConfig(listingForm.category, listingForm.communityType);
  const qualityNotes = getQualityNotes(listingForm.category, listingForm.communityType, listingTips);

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.eyebrow}>CREATE / MULTI-LISTING</Text>
      <Text style={styles.title}>Tek yerden profesyonel bir ilan olustur.</Text>
      <Text style={styles.subtitle}>
        Bakici arayanlar, bakicilar ve topluluk ilanlari icin ayni akista calisan net bir create deneyimi.
      </Text>

      <View style={styles.categoryGrid}>
        {categoryOptions.map((option) => {
          const isActive = option.id === listingForm.category;

          return (
            <Pressable key={option.id} onPress={() => updateListingField("category", option.id)}>
              <SurfaceCard style={[styles.categoryCard, isActive && styles.categoryCardActive]} tone={isActive ? "dark" : "default"}>
                <Text style={[styles.categoryTitle, isActive && styles.categoryTitleActive]}>{option.title}</Text>
                <Text style={[styles.categoryDescription, isActive && styles.categoryDescriptionActive]}>
                  {option.description}
                </Text>
              </SurfaceCard>
            </Pressable>
          );
        })}
      </View>

      {selectedCategory ? (
        <>
          <SurfaceCard elevated tone="dark" style={styles.heroCard}>
            <Image source={getPetImage(listingForm.imageId)} style={styles.heroImage} />
            <View style={styles.heroBody}>
              <Text style={styles.heroPill}>{getListingCategoryLabel(selectedCategory.id)}</Text>
              <Text style={styles.heroTitle}>
                {listingForm.title.trim() || `${selectedCategory.title} icin guven veren bir baslik yaz`}
              </Text>
              <Text style={styles.heroText}>{selectedCategory.description}</Text>
            </View>
          </SurfaceCard>

          {isCommunity ? (
            <SurfaceCard style={styles.sectionCard}>
              <Text style={styles.sectionEyebrow}>Topluluk tipi</Text>
              <Text style={styles.sectionTitle}>Ilanin ne icin acildigini sec</Text>
              <View style={styles.chipRow}>
                {communityTypeOptions.map((option) => (
                  <TagChip
                    key={option.id}
                    active={listingForm.communityType === option.id}
                    label={getCommunityListingTypeLabel(option.id)}
                    onPress={() => updateListingField("communityType", option.id)}
                  />
                ))}
              </View>
              <Text style={styles.sectionHelper}>
                {listingForm.communityType
                  ? communityTypeOptions.find((option) => option.id === listingForm.communityType)?.description
                  : "Topluluk ilani icin once mama destegi, sahiplendirme veya diger topluluk tipini sec."}
              </Text>
            </SurfaceCard>
          ) : null}

          <SurfaceCard style={styles.sectionCard}>
            <Text style={styles.sectionEyebrow}>Temel bilgiler</Text>
            <Text style={styles.sectionTitle}>Ilani bir bakista anlasilir kur</Text>

            <Text style={styles.fieldLabel}>Ilan basligi</Text>
            <TextInput
              onChangeText={(value) => updateListingField("title", value)}
              placeholder={getTitlePlaceholder(listingForm.category, listingForm.communityType)}
              placeholderTextColor={colors.textMuted}
              style={styles.input}
              value={listingForm.title}
            />

            <View style={styles.formRow}>
              <View style={styles.formCol}>
                <Text style={styles.fieldLabel}>{fieldConfig.petTypeLabel}</Text>
                <TextInput
                  onChangeText={(value) => updateListingField("petType", value)}
                  placeholder={fieldConfig.petTypePlaceholder}
                  placeholderTextColor={colors.textMuted}
                  style={styles.input}
                  value={listingForm.petType}
                />
              </View>
              <View style={styles.formCol}>
                <Text style={styles.fieldLabel}>{fieldConfig.serviceLabel}</Text>
                <TextInput
                  onChangeText={(value) => updateListingField("serviceType", value)}
                  placeholder={fieldConfig.servicePlaceholder}
                  placeholderTextColor={colors.textMuted}
                  style={styles.input}
                  value={listingForm.serviceType}
                />
              </View>
            </View>

            <View style={styles.formRow}>
              <View style={styles.formCol}>
                <Text style={styles.fieldLabel}>Konum</Text>
                <TextInput
                  onChangeText={(value) => updateListingField("location", value)}
                  placeholder="Kadikoy, Besiktas, Moda..."
                  placeholderTextColor={colors.textMuted}
                  style={styles.input}
                  value={listingForm.location}
                />
              </View>
              <View style={styles.formCol}>
                <Text style={styles.fieldLabel}>{fieldConfig.scheduleLabel}</Text>
                <TextInput
                  onChangeText={(value) => updateListingField("availabilityOrSchedule", value)}
                  placeholder={fieldConfig.schedulePlaceholder}
                  placeholderTextColor={colors.textMuted}
                  style={styles.input}
                  value={listingForm.availabilityOrSchedule}
                />
              </View>
            </View>

            <Text style={styles.fieldLabel}>{fieldConfig.priceLabel}</Text>
            <TextInput
              onChangeText={(value) => updateListingField("priceOrBudget", value)}
              placeholder={fieldConfig.pricePlaceholder}
              placeholderTextColor={colors.textMuted}
              style={styles.input}
              value={listingForm.priceOrBudget}
            />

            <Text style={styles.fieldLabel}>Aciklama</Text>
            <TextInput
              multiline
              numberOfLines={7}
              onChangeText={(value) => updateListingField("description", value)}
              placeholder={fieldConfig.descriptionPlaceholder}
              placeholderTextColor={colors.textMuted}
              style={[styles.input, styles.textArea]}
              textAlignVertical="top"
              value={listingForm.description}
            />
          </SurfaceCard>

          <SurfaceCard style={styles.sectionCard}>
            <Text style={styles.sectionEyebrow}>Kapak gorseli</Text>
            <Text style={styles.sectionTitle}>Ilana uygun gorunur bir ilk izlenim sec</Text>
            <Image source={getPetImage(listingForm.imageId)} style={styles.coverPreview} />
            <View style={styles.imageSelectorRow}>
              {imageOptions.map((imageId) => {
                const isActive = listingForm.imageId === imageId;

                return (
                  <Pressable key={imageId} onPress={() => updateListingField("imageId", imageId)} style={styles.imageOptionWrap}>
                    <Image source={getPetImage(imageId)} style={[styles.imageOption, isActive && styles.imageOptionActive]} />
                  </Pressable>
                );
              })}
            </View>
          </SurfaceCard>

          <View style={styles.actionStack}>
            <PrimaryButton
              disabled={!canPreview}
              label="Onizle"
              onPress={() => {
                prepareListingPreview();
                navigate({ screen: "listing-preview" });
              }}
              tone="primary"
            />
            <PrimaryButton
              disabled={!canSaveDraft}
              label="Taslak Kaydet"
              onPress={() => {
                saveDraft();
                navigate({ screen: "drafts" });
              }}
              tone="secondary"
            />
          </View>

          <SurfaceCard style={styles.tipCard}>
            <Text style={styles.sectionEyebrow}>Production checklist</Text>
            <Text style={styles.sectionTitle}>Ilan kalitesini guclendiren notlar</Text>
            <View style={styles.tipList}>
              {qualityNotes.map((tip) => (
                <View key={tip} style={styles.tipItem}>
                  <View style={styles.tipDot} />
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </View>
          </SurfaceCard>
        </>
      ) : (
        <SurfaceCard style={styles.emptyCard}>
          <Text style={styles.sectionEyebrow}>Baslangic</Text>
          <Text style={styles.sectionTitle}>Ne acmak istedigini sec, form sana gore sekillensin</Text>
          <Text style={styles.emptyText}>
            Bakici arayanlar, bakicilar ve topluluk ilanlari ayni akista ama kendi bilgi yapisiyla ilerler.
          </Text>
        </SurfaceCard>
      )}

      <SurfaceCard style={styles.quoteCard}>
        <Text style={styles.quotePill}>Topluluktan gercek geri bildirim</Text>
        <Text style={styles.quoteText}>{communityQuote.text}</Text>
        <Text style={styles.quoteMeta}>{communityQuote.author}</Text>
      </SurfaceCard>
    </ScrollView>
  );
}

function getFieldConfig(
  category: ListingCategory | "",
  communityType: CommunityListingType | ""
): FieldConfig {
  if (category === "caregiver_offer") {
    return {
      petTypeLabel: "Baktigin hayvanlar",
      petTypePlaceholder: "Kedi, kopek, yavru bakimi...",
      serviceLabel: "Uzmanlik / hizmet",
      servicePlaceholder: "Evde bakim, yuruyus, ilac takibi",
      scheduleLabel: "Musaitlik",
      schedulePlaceholder: "Hafta ici 09.00 - 18.00",
      priceLabel: "Ucret",
      pricePlaceholder: "Saatlik 350 TL",
      descriptionPlaceholder: "Tecrubeni, hizmet standardini ve nasil bir bakim sundugunu net yaz."
    };
  }

  if (category === "community") {
    return {
      petTypeLabel: "Ilan kapsami",
      petTypePlaceholder: communityType === "adoption" ? "Yas, tur, karakter ozeti" : "Icerik kapsamini kisaca yaz",
      serviceLabel: "Teslimat / destek tipi",
      servicePlaceholder: communityType === "food_support" ? "Elden teslim, kargo, pickup" : "Duyuru, teslim, bulusma",
      scheduleLabel: "Ne zaman / nasil",
      schedulePlaceholder: "Bugun teslim, hafta sonu bulusma",
      priceLabel: "Ucret / durum",
      pricePlaceholder: "Ucretsiz, masraf paylasimli...",
      descriptionPlaceholder: "Topluluga ne sundugunu veya neye ihtiyacin oldugunu net ve guven verici bicimde acikla."
    };
  }

  return {
    petTypeLabel: "Hayvan turu",
    petTypePlaceholder: "Kedi, kopek, British Shorthair...",
    serviceLabel: "Ihtiyac duyulan hizmet",
    servicePlaceholder: "Evde bakim, yuruyus, ilac takibi",
    scheduleLabel: "Takvim / uygunluk",
    schedulePlaceholder: "Cumartesi - Pazar, 3 gun, sabah - aksam",
    priceLabel: "Butce",
    pricePlaceholder: "Gunluk 1.000 TL",
    descriptionPlaceholder: "Bakicidan bekledigin rutin, raporlama ve ozel ihtiyaclari acik yaz."
  };
}

function getTitlePlaceholder(category: ListingCategory | "", communityType: CommunityListingType | "") {
  if (category === "caregiver_offer") {
    return "Orn. Kadikoy icin deneyimli kedi ve kopek bakicisi";
  }

  if (category === "community") {
    if (communityType === "food_support") {
      return "Orn. Kapali paket kedi mamasi destegi veriyorum";
    }

    if (communityType === "adoption") {
      return "Orn. 2 aylik tekir icin sicak yuva ariyoruz";
    }

    return "Orn. Hafta sonu gecici yuva destegi ariyorum";
  }

  return "Orn. Hafta sonu icin deneyimli kopek bakicisi ariyorum";
}

function getQualityNotes(
  category: ListingCategory | "",
  communityType: CommunityListingType | "",
  defaultTips: string[]
) {
  if (category === "caregiver_offer") {
    return [
      "Verdigin hizmeti ve hangi hayvanlarla calistigini ilk iki satirda netlestir.",
      "Musaitlik ve ucreti acik yazmak daha kaliteli talep getirir.",
      ...defaultTips.slice(0, 1)
    ];
  }

  if (category === "community") {
    return [
      communityType === "adoption"
        ? "Sahiplendirme ilaninda karakter, saglik durumu ve tanisma surecini mutlaka belirt."
        : "Topluluk ilaninda ne sundugunu veya neye ihtiyacin oldugunu bir bakista anlasilir yap.",
      "Teslimat, bulusma veya destek sekli net olursa geri donusler daha hizli olur.",
      ...defaultTips.slice(2, 3)
    ];
  }

  return defaultTips;
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    color: colors.textMuted
  },
  title: {
    marginTop: spacing.sm,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "700",
    fontFamily: headlineFont,
    color: colors.text
  },
  subtitle: {
    marginTop: spacing.sm,
    fontSize: 15,
    lineHeight: 24,
    color: colors.textMuted
  },
  categoryGrid: {
    gap: spacing.sm,
    marginTop: spacing.xl,
    marginBottom: spacing.xl
  },
  categoryCard: {
    padding: spacing.lg
  },
  categoryCardActive: {
    borderColor: "rgba(255,255,255,0.08)"
  },
  categoryTitle: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "700",
    fontFamily: headlineFont,
    color: colors.text
  },
  categoryTitleActive: {
    color: colors.white
  },
  categoryDescription: {
    marginTop: spacing.xs,
    fontSize: 14,
    lineHeight: 22,
    color: colors.textMuted
  },
  categoryDescriptionActive: {
    color: "rgba(255,255,255,0.72)"
  },
  heroCard: {
    overflow: "hidden",
    marginBottom: spacing.lg
  },
  heroImage: {
    width: "100%",
    height: 240
  },
  heroBody: {
    padding: spacing.lg
  },
  heroPill: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
    borderRadius: radii.pill,
    fontSize: 11,
    fontWeight: "700",
    color: colors.primary,
    backgroundColor: colors.white
  },
  heroTitle: {
    marginTop: spacing.md,
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "700",
    fontFamily: headlineFont,
    color: colors.white
  },
  heroText: {
    marginTop: spacing.sm,
    fontSize: 14,
    lineHeight: 22,
    color: "rgba(255,255,255,0.74)"
  },
  sectionCard: {
    padding: spacing.lg,
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
  sectionHelper: {
    marginTop: spacing.md,
    fontSize: 13,
    lineHeight: 20,
    color: colors.textMuted
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
    marginTop: spacing.lg
  },
  fieldLabel: {
    marginBottom: spacing.xs,
    fontSize: 13,
    fontWeight: "700",
    color: colors.text
  },
  input: {
    paddingHorizontal: spacing.md,
    paddingVertical: 16,
    borderRadius: radii.md,
    marginBottom: spacing.md,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 15,
    color: colors.text
  },
  formRow: {
    flexDirection: "row",
    gap: spacing.sm
  },
  formCol: {
    flex: 1
  },
  textArea: {
    minHeight: 160
  },
  coverPreview: {
    width: "100%",
    height: 220,
    marginTop: spacing.lg,
    borderRadius: radii.lg
  },
  imageSelectorRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.md
  },
  imageOptionWrap: {
    flex: 1
  },
  imageOption: {
    width: "100%",
    height: 84,
    borderRadius: radii.md,
    borderWidth: 2,
    borderColor: "transparent"
  },
  imageOptionActive: {
    borderColor: colors.primary
  },
  actionStack: {
    gap: spacing.sm,
    marginBottom: spacing.xl
  },
  tipCard: {
    padding: spacing.lg,
    marginBottom: spacing.lg
  },
  tipList: {
    gap: spacing.md,
    marginTop: spacing.lg
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "flex-start"
  },
  tipDot: {
    width: 8,
    height: 8,
    borderRadius: radii.pill,
    marginTop: 8,
    marginRight: spacing.sm,
    backgroundColor: colors.primary
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
    color: colors.textMuted
  },
  emptyCard: {
    padding: spacing.lg,
    marginBottom: spacing.lg,
    backgroundColor: colors.infoSurfaceSoft
  },
  emptyText: {
    marginTop: spacing.md,
    fontSize: 14,
    lineHeight: 22,
    color: colors.textMuted
  },
  quoteCard: {
    padding: spacing.lg,
    backgroundColor: colors.infoSurfaceSoft
  },
  quotePill: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.1,
    color: colors.infoText
  },
  quoteText: {
    marginTop: spacing.md,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "700",
    fontFamily: headlineFont,
    color: colors.text
  },
  quoteMeta: {
    marginTop: spacing.md,
    fontSize: 13,
    fontWeight: "700",
    color: colors.textMuted
  }
});
