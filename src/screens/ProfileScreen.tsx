import { StyleSheet, Text, View } from "react-native";

import { colors } from "../theme/colors";

const pets = [
  { name: "Misket", type: "British Shorthair", age: "2 yas" },
  { name: "Fistik", type: "Golden Retriever", age: "4 yas" }
];

export function ProfileScreen() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.hero}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>UA</Text>
        </View>
        <Text style={styles.name}>Uygar A.</Text>
        <Text style={styles.meta}>Pet sahibi • Dogrulanmis profil</Text>
      </View>

      <Text style={styles.sectionTitle}>Evcil dostlarim</Text>
      {pets.map((pet) => (
        <View key={pet.name} style={styles.petCard}>
          <Text style={styles.petName}>{pet.name}</Text>
          <Text style={styles.petMeta}>
            {pet.type} • {pet.age}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 20
  },
  hero: {
    alignItems: "center",
    padding: 24,
    borderRadius: 28,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border
  },
  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.secondary
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF"
  },
  name: {
    marginTop: 16,
    fontSize: 22,
    fontWeight: "800",
    color: colors.text
  },
  meta: {
    marginTop: 6,
    fontSize: 14,
    color: colors.textMuted
  },
  sectionTitle: {
    marginTop: 24,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: "800",
    color: colors.text
  },
  petCard: {
    padding: 18,
    borderRadius: 22,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12
  },
  petName: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.text
  },
  petMeta: {
    marginTop: 6,
    fontSize: 13,
    color: colors.textMuted
  }
});
