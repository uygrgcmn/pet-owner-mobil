import { ScrollView, StyleSheet, Text, View } from "react-native";

import { SectionTitle } from "../components/SectionTitle";
import { SitterCard } from "../components/cards/SitterCard";
import { StatCard } from "../components/cards/StatCard";
import { petSitters, quickStats } from "../data/mockData";
import { colors } from "../theme/colors";

export function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <Text style={styles.heroEyebrow}>Guvenli eslesme</Text>
        <Text style={styles.heroTitle}>Evcil dostun icin dogru bakiciyi dakikalar icinde bul.</Text>
        <Text style={styles.heroText}>
          Konum, deneyim ve bakim ihtiyacina gore filtrelenmis bakici onerileri seni bekliyor.
        </Text>
      </View>

      <View style={styles.statsRow}>
        {quickStats.map((stat) => (
          <StatCard key={stat.id} value={stat.value} label={stat.label} />
        ))}
      </View>

      <SectionTitle title="One cikan bakicilar" action="Tumunu gor" />
      {petSitters.map((sitter) => (
        <SitterCard key={sitter.id} sitter={sitter} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingBottom: 24
  },
  hero: {
    padding: 22,
    borderRadius: 30,
    marginBottom: 20,
    backgroundColor: colors.secondary
  },
  heroEyebrow: {
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    color: "#CFE3D8"
  },
  heroTitle: {
    marginTop: 12,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "800",
    color: "#FFFFFF"
  },
  heroText: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 21,
    color: "#DCE8E5"
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 22
  }
});
