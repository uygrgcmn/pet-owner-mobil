import { StyleSheet, Text, View } from "react-native";

import { colors } from "../theme/colors";
import { displayFont } from "../theme/typography";
import { TabId } from "../types";

const titles: Record<TabId, { title: string; subtitle: string; badge: string }> = {
  home: {
    title: "PetOwner",
    subtitle: "Hayvanina en uygun bakiciyi bul",
    badge: "CURATED CARE"
  },
  community: {
    title: "Topluluk",
    subtitle: "Mama, sahiplendirme ve daha fazlasi",
    badge: "COMMUNITY FLOW"
  },
  create: {
    title: "Ilan Ver",
    subtitle: "Ihtiyacini hizlica paylas",
    badge: "PUBLISH FAST"
  },
  messages: {
    title: "Mesajlar",
    subtitle: "Bakicilarla iletisimi surdur",
    badge: "LIVE INBOX"
  },
  profile: {
    title: "Profil",
    subtitle: "Hesabini ve evcil dostlarini yonet",
    badge: "TRUSTED PROFILE"
  }
};

export function AppHeader({ activeTab }: { activeTab: TabId }) {
  const config = titles[activeTab];

  return (
    <View style={styles.wrapper}>
      <View style={styles.topRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{config.badge}</Text>
        </View>
        <View style={styles.signal}>
          <Text style={styles.signalText}>LIVE</Text>
        </View>
      </View>
      <Text style={styles.title}>{config.title}</Text>
      <Text style={styles.subtitle}>{config.subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 18,
    backgroundColor: colors.canvas
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
    color: colors.secondary
  },
  signal: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#E8F1EA"
  },
  signalText: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.8,
    color: colors.accent
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    fontFamily: displayFont,
    letterSpacing: 0.2,
    color: colors.text
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textMuted
  }
});
