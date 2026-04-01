import { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { PostCard } from "../components/cards/PostCard";
import { SitterCard } from "../components/cards/SitterCard";
import { DetailHeader } from "../components/ui/DetailHeader";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { SurfaceCard } from "../components/ui/SurfaceCard";
import { TagChip } from "../components/ui/TagChip";
import { getPetImage, getPostImage, getSitterImage } from "../data/mockImages";
import { useMockApp } from "../store/mockAppStore";
import { colors } from "../theme/colors";
import { headlineFont } from "../theme/typography";
import { radii, spacing } from "../theme/tokens";
import { AppRoute, ScreenActions } from "../types";
import { getListingCategoryLabel } from "../utils/listing";

type Props = {
  route: AppRoute;
  actions: ScreenActions & { goBack: () => void };
};

export function StackScreens({ route, actions }: Props) {
  const {
    communityPosts,
    conversationMessages,
    conversations,
    ensureConversationForSitter,
    listingDrafts,
    listingPreview,
    petSitters,
    profilePets,
    sendMessage,
    userAds
  } = useMockApp();
  const [messageDraft, setMessageDraft] = useState("");

  if (route.screen === "sitter-directory") {
    return (
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <DetailHeader
          title="Bakici dizini"
          subtitle="Dogrulanmis profilleri fiyat, uygunluk ve uzmanliga gore hizli sekilde karsilastir."
          onBack={actions.goBack}
        />
        <View style={styles.chipRow}>
          <TagChip active label="Tum bakicilar" />
          <TagChip label="Bugun musait" />
          <TagChip label="Ilac takibi" />
          <TagChip label="Evde bakim" />
        </View>
        <View style={styles.listSection}>
          {petSitters.map((sitter) => (
            <SitterCard
              key={sitter.id}
              sitter={sitter}
              onOpen={() => actions.navigate({ screen: "sitter-detail", sitterId: sitter.id })}
            />
          ))}
        </View>
      </ScrollView>
    );
  }

  if (route.screen === "sitter-detail") {
    const sitter = petSitters.find((item) => item.id === route.sitterId) ?? petSitters[0];

    return (
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <DetailHeader title={sitter.name} subtitle={`${sitter.city} / ${sitter.rating.toFixed(1)} puan`} onBack={actions.goBack} />
        <SurfaceCard elevated style={styles.heroCard}>
          <Image source={getSitterImage(sitter.id)} style={styles.heroImage} />
          <Text style={styles.heroTitle}>{sitter.price}</Text>
          <Text style={styles.heroText}>
            Duzenli foto raporu, planli yuruyus, ilac takibi ve guven veren iletisim standardi ile calisir.
          </Text>
          <View style={styles.chipRow}>
            {sitter.tags.map((tag) => (
              <TagChip key={tag} label={tag} />
            ))}
          </View>
        </SurfaceCard>
        <SurfaceCard style={styles.panel}>
          <Text style={styles.panelTitle}>Musaitlik ozeti</Text>
          <Text style={styles.panelText}>Bugun 16.00 sonrasi uygun. Yarin tum gun evde bakim ve saatlik yuruyus acik.</Text>
        </SurfaceCard>
        <PrimaryButton
          label="Mesajlasmayi baslat"
          onPress={() =>
            actions.navigate({
              screen: "conversation-detail",
              conversationId: ensureConversationForSitter(sitter.id)
            })
          }
        />
      </ScrollView>
    );
  }

  if (route.screen === "discovery-map") {
    return (
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <DetailHeader
          title="Haritada kesfet"
          subtitle="Konuma gore bakici yogunlugunu ve hizli ulasilabilir profilleri incele."
          onBack={actions.goBack}
        />
        <SurfaceCard tone="dark" style={styles.mapCard}>
          <View style={styles.mapArea}>
            <View style={[styles.mapPin, styles.pinOne]} />
            <View style={[styles.mapPin, styles.pinTwo]} />
            <View style={[styles.mapPin, styles.pinThree]} />
          </View>
        </SurfaceCard>
        {petSitters.map((sitter) => (
          <Pressable key={sitter.id} onPress={() => actions.navigate({ screen: "sitter-detail", sitterId: sitter.id })}>
            <SurfaceCard style={styles.inlineCard}>
              <Image source={getSitterImage(sitter.id)} style={styles.inlineImage} />
              <Text style={styles.panelTitle}>{sitter.name}</Text>
              <Text style={styles.panelText}>{sitter.city} / {sitter.price}</Text>
            </SurfaceCard>
          </Pressable>
        ))}
      </ScrollView>
    );
  }

  if (route.screen === "sitter-application") {
    return (
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <DetailHeader
          title="Bakiciyim ilani"
          subtitle="Bakici olma akisi artik ayri basvuru yerine public ilan olarak Ilan Ver icinde olusturuluyor."
          onBack={actions.goBack}
        />
        <SurfaceCard style={styles.formCard}>
          <Text style={styles.panelTitle}>Yeni create akisi aktif</Text>
          <Text style={styles.panelText}>
            Artik bakici arayanlar, bakicilar ve topluluk ilanlari ayni production-grade create ekranindan aciliyor.
          </Text>
          <PrimaryButton label="Ilan Ver ekranina git" onPress={() => actions.switchTab("create")} tone="primary" />
        </SurfaceCard>
      </ScrollView>
    );
  }

  if (route.screen === "community-post-detail") {
    const post = communityPosts.find((item) => item.id === route.postId) ?? communityPosts[0];

    return (
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <DetailHeader title={post.title} subtitle={`${post.category} / ${post.author}`} onBack={actions.goBack} />
        <PostCard post={post} />
        <SurfaceCard style={styles.panel}>
          <Text style={styles.panelTitle}>Topluluk notlari</Text>
          <Text style={styles.panelText}>Yorum, destek ve iletisim detaylari backend baglandiginda burada canli olarak akacak.</Text>
        </SurfaceCard>
      </ScrollView>
    );
  }

  if (route.screen === "conversation-detail") {
    const conversation = conversations.find((item) => item.id === route.conversationId) ?? conversations[0];
    const messages = conversationMessages[conversation.id] ?? [];

    return (
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <DetailHeader title={conversation.name} subtitle="Mesajlasma detayi" onBack={actions.goBack} />
        <SurfaceCard style={styles.threadCard}>
          <View style={styles.thread}>
            {messages.map((message) => (
              <SurfaceCard
                key={message.id}
                style={message.sender === "other" ? styles.messageBubbleLeft : styles.messageBubbleRight}
                tone={message.sender === "other" ? "muted" : "default"}
              >
                <Text style={styles.threadText}>{message.text}</Text>
              </SurfaceCard>
            ))}
          </View>
        </SurfaceCard>
        <SurfaceCard style={styles.composeBar}>
          <TextInput
            onChangeText={setMessageDraft}
            placeholder="Mesaj yaz..."
            placeholderTextColor={colors.textMuted}
            style={styles.composeInput}
            value={messageDraft}
          />
          <PrimaryButton
            disabled={!messageDraft.trim()}
            label="Gonder"
            onPress={() => {
              sendMessage(conversation.id, messageDraft);
              setMessageDraft("");
            }}
          />
        </SurfaceCard>
      </ScrollView>
    );
  }

  if (route.screen === "listing-preview") {
    const preview = listingPreview ?? listingDrafts[0];

    return (
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <DetailHeader
          title="Ilan onizleme"
          subtitle={preview ? getListingCategoryLabel(preview.category) : "Yayin oncesi son kalite kontrolu"}
          onBack={actions.goBack}
        />
        <SurfaceCard elevated style={styles.panel}>
          <Image source={getPetImage(preview?.imageId ?? "1")} style={styles.panelImage} />
          <Text style={styles.panelMeta}>{preview?.badge ?? "ILAN"}</Text>
          <Text style={styles.panelTitle}>{preview?.title ?? "Onizleme icin bir ilan hazirla"}</Text>
          <Text style={styles.panelText}>{preview?.meta ?? "Ilan detaylari burada gorunecek."}</Text>
          <Text style={styles.panelText}>{preview?.description ?? "Ilan aciklamasi burada gorunecek."}</Text>
        </SurfaceCard>
        <PrimaryButton label="Taslagi profilimde gor" onPress={() => actions.navigate({ screen: "drafts" })} />
      </ScrollView>
    );
  }

  if (route.screen === "drafts") {
    return (
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <DetailHeader title="Taslaklar" subtitle="Yayinlanmamis ama kaydedilmis listing akislari" onBack={actions.goBack} />
        {listingDrafts.map((draft) => (
          <SurfaceCard key={draft.id} style={styles.inlineCard}>
            <Text style={styles.panelMeta}>{draft.badge}</Text>
            <Text style={styles.panelTitle}>{draft.title}</Text>
            <Text style={styles.panelText}>{draft.meta}</Text>
            <Text style={styles.panelText}>{draft.updatedAt} / Taslak</Text>
          </SurfaceCard>
        ))}
      </ScrollView>
    );
  }

  if (route.screen === "pet-detail") {
    const pet = profilePets.find((item) => item.id === route.petId) ?? profilePets[0];

    return (
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <DetailHeader title={pet.name} subtitle="Pet profili" onBack={actions.goBack} />
        <SurfaceCard elevated style={styles.panel}>
          <Image source={getPetImage(pet.id)} style={styles.panelImage} />
          <Text style={styles.panelTitle}>{pet.info}</Text>
          <Text style={styles.panelText}>Asi takvimi guncel, son veteriner kaydi ve davranis notlari sistemde hazir.</Text>
        </SurfaceCard>
      </ScrollView>
    );
  }

  if (route.screen === "ad-detail") {
    const ad = userAds.find((item) => item.id === route.adId) ?? userAds[0];

    return (
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <DetailHeader title={ad.title} subtitle={getListingCategoryLabel(ad.category)} onBack={actions.goBack} />
        <SurfaceCard elevated style={styles.panel}>
          <Image source={getPetImage(ad.imageId)} style={styles.panelImage} />
          <Text style={styles.panelMeta}>{ad.badge}</Text>
          <Text style={styles.panelTitle}>{ad.meta}</Text>
          <Text style={styles.panelText}>{ad.description}</Text>
          <Text style={styles.panelText}>Bu ilanda bugun 14 goruntulenme, 3 yeni talep ve 1 yeni mesaj olustu.</Text>
        </SurfaceCard>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <DetailHeader title="Profil ayarlari" subtitle="Hesap, bildirim ve gizlilik tercihleri" onBack={actions.goBack} />
      <SurfaceCard style={styles.inlineCard}>
        <Text style={styles.panelTitle}>Bildirim tercihleri</Text>
        <Text style={styles.panelText}>Mesajlar, ilanlar ve topluluk bildirimlerini burada yonetebilirsin.</Text>
      </SurfaceCard>
      <SurfaceCard style={styles.inlineCard}>
        <Text style={styles.panelTitle}>Gizlilik</Text>
        <Text style={styles.panelText}>Profil gorunurlugu ve iletisim izinleri modern bir kontrol panelinde toplanir.</Text>
      </SurfaceCard>
      <SurfaceCard tone="dark" style={styles.inlineCard}>
        <Text style={styles.panelTitleDark}>Hesap guvenligi</Text>
        <Text style={styles.panelTextDark}>Cihaz gecmisi, sifre guncelleme ve oturum aktiviteleri burada yer alir.</Text>
      </SurfaceCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs
  },
  listSection: {
    marginTop: spacing.lg
  },
  heroCard: {
    padding: spacing.lg,
    marginBottom: spacing.lg
  },
  heroImage: {
    width: "100%",
    height: 280,
    borderRadius: radii.lg,
    marginBottom: spacing.lg
  },
  heroTitle: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "700",
    fontFamily: headlineFont,
    color: colors.text
  },
  heroText: {
    marginTop: spacing.sm,
    fontSize: 15,
    lineHeight: 24,
    color: colors.textMuted
  },
  panel: {
    padding: spacing.lg,
    marginBottom: spacing.lg
  },
  panelTitle: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "700",
    fontFamily: headlineFont,
    color: colors.text
  },
  panelTitleDark: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "700",
    fontFamily: headlineFont,
    color: colors.white
  },
  panelText: {
    marginTop: spacing.sm,
    fontSize: 15,
    lineHeight: 23,
    color: colors.textMuted
  },
  panelTextDark: {
    marginTop: spacing.sm,
    fontSize: 15,
    lineHeight: 23,
    color: "rgba(255,255,255,0.7)"
  },
  panelImage: {
    width: "100%",
    height: 220,
    marginBottom: spacing.lg,
    borderRadius: radii.lg
  },
  panelMeta: {
    marginTop: spacing.md,
    fontSize: 13,
    fontWeight: "700",
    color: colors.primary
  },
  mapCard: {
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderColor: "rgba(255,255,255,0.08)"
  },
  mapArea: {
    height: 280,
    borderRadius: radii.lg,
    backgroundColor: "#1A1D23"
  },
  mapPin: {
    position: "absolute",
    width: 18,
    height: 18,
    borderRadius: 999,
    backgroundColor: colors.primary
  },
  pinOne: {
    top: 56,
    left: 72
  },
  pinTwo: {
    top: 124,
    right: 92
  },
  pinThree: {
    bottom: 62,
    left: 164
  },
  inlineCard: {
    padding: spacing.lg,
    marginBottom: spacing.md
  },
  inlineImage: {
    width: "100%",
    height: 156,
    marginBottom: spacing.md,
    borderRadius: radii.md
  },
  formCard: {
    padding: spacing.lg
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
  textArea: {
    minHeight: 160
  },
  threadCard: {
    padding: spacing.md,
    marginBottom: spacing.lg
  },
  thread: {
    gap: spacing.sm
  },
  messageBubbleLeft: {
    alignSelf: "flex-start",
    maxWidth: "84%",
    padding: spacing.md
  },
  messageBubbleRight: {
    alignSelf: "flex-end",
    maxWidth: "84%",
    padding: spacing.md,
    backgroundColor: colors.primarySoft,
    borderColor: "rgba(245, 139, 64, 0.14)"
  },
  threadText: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.text
  },
  composeBar: {
    padding: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm
  },
  composeInput: {
    flex: 1,
    paddingHorizontal: spacing.sm,
    fontSize: 15,
    color: colors.text
  }
});
