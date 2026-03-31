import { StyleSheet, Text, View } from "react-native";

import { TabId } from "../types";
import { colors } from "../theme/colors";

const titles: Record<TabId, { title: string; subtitle: string }> = {
  home: {
    title: "PetOwner",
    subtitle: "Hayvanina en uygun bakiciyi bul"
  },
  community: {
    title: "Topluluk",
    subtitle: "Mama, sahiplendirme ve daha fazlasi"
  },
  create: {
    title: "Ilan Ver",
    subtitle: "Ihtiyacini hizlica paylas"
  },
  messages: {
    title: "Mesajlar",
    subtitle: "Bakicilarla iletisimi surdur"
  },
  profile: {
    title: "Profil",
    subtitle: "Hesabini ve evcil dostlarini yonet"
  }
};

export function AppHeader({ activeTab }: { activeTab: TabId }) {
  const config = titles[activeTab];

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{config.title}</Text>
      <Text style={styles.subtitle}>{config.subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 14,
    backgroundColor: colors.canvas
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.text
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: colors.textMuted
  }
});
