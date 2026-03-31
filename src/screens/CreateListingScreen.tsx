import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { colors } from "../theme/colors";

const chips = ["Bakici ariyorum", "Mama paylasimi", "Sahiplendirme", "Etkinlik"];

export function CreateListingScreen() {
  return (
    <ScrollView contentContainerStyle={styles.wrapper} showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        <Text style={styles.helper}>Bakici ihtiyaci, mama paylasimi ya da sahiplendirme gibi duyurularini mock akista olustur.</Text>

        <Text style={styles.label}>Ilan tipi</Text>
        <View style={styles.chips}>
          {chips.map((chip) => (
            <View key={chip} style={styles.chip}>
              <Text style={styles.chipText}>{chip}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.label}>Baslik</Text>
        <TextInput placeholder="Orn. 2 gunluk kedi bakicisi ariyorum" placeholderTextColor={colors.textMuted} style={styles.input} />

        <Text style={styles.label}>Aciklama</Text>
        <TextInput
          multiline
          numberOfLines={6}
          textAlignVertical="top"
          placeholder="Evcil dostun, tarih araligi, beklentilerin ve ucret detaylarini yaz."
          placeholderTextColor={colors.textMuted}
          style={[styles.input, styles.textArea]}
        />

        <View style={styles.cta}>
          <Text style={styles.ctaText}>Mock olarak kaydet</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 20
  },
  card: {
    padding: 20,
    borderRadius: 26,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border
  },
  helper: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.textMuted
  },
  label: {
    marginTop: 16,
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "800",
    color: colors.text
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: colors.primarySoft
  },
  chipText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.primary
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 18,
    backgroundColor: colors.canvas,
    fontSize: 14,
    color: colors.text
  },
  textArea: {
    minHeight: 140
  },
  cta: {
    marginTop: 22,
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    backgroundColor: colors.primary
  },
  ctaText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF"
  }
});
