import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, View } from "react-native";

import { AppHeader } from "./src/components/AppHeader";
import { BottomTabBar } from "./src/components/BottomTabBar";
import { CommunityScreen } from "./src/screens/CommunityScreen";
import { CreateListingScreen } from "./src/screens/CreateListingScreen";
import { HomeScreen } from "./src/screens/HomeScreen";
import { MessagesScreen } from "./src/screens/MessagesScreen";
import { ProfileScreen } from "./src/screens/ProfileScreen";
import { useAppTabs } from "./src/hooks/useAppTabs";
import { colors } from "./src/theme/colors";

export default function App() {
  const { activeTab, setActiveTab } = useAppTabs();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.appShell}>
        <View pointerEvents="none" style={styles.backdrop}>
          <View style={styles.orbLarge} />
          <View style={styles.orbSmall} />
          <View style={styles.orbAccent} />
        </View>

        <AppHeader activeTab={activeTab} />
        <View style={styles.content}>
          {activeTab === "home" && <HomeScreen />}
          {activeTab === "community" && <CommunityScreen />}
          {activeTab === "create" && <CreateListingScreen />}
          {activeTab === "messages" && <MessagesScreen />}
          {activeTab === "profile" && <ProfileScreen />}
        </View>
        <BottomTabBar activeTab={activeTab} onChange={setActiveTab} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.canvas
  },
  appShell: {
    flex: 1,
    backgroundColor: colors.canvas
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject
  },
  orbLarge: {
    position: "absolute",
    top: -90,
    right: -40,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: colors.primarySoft,
    opacity: 0.55
  },
  orbSmall: {
    position: "absolute",
    top: 150,
    left: -50,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#E6EEE9"
  },
  orbAccent: {
    position: "absolute",
    bottom: 120,
    right: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#F1E2BA",
    opacity: 0.55
  },
  content: {
    flex: 1
  }
});
