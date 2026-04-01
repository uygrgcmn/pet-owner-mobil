import { StatusBar } from "expo-status-bar";
import { Platform, SafeAreaView, StyleSheet, View } from "react-native";

import { BottomTabBar } from "./src/components/BottomTabBar";
import { CreateListingScreen } from "./src/screens/CreateListingScreen";
import { ExploreScreen } from "./src/screens/HomeScreen";
import { MessagesScreen } from "./src/screens/MessagesScreen";
import { ProfileScreen } from "./src/screens/ProfileScreen";
import { StackScreens } from "./src/screens/StackScreens";
import { useAppNavigation } from "./src/hooks/useAppNavigation";
import { MockAppProvider } from "./src/store/mockAppStore";
import { colors } from "./src/theme/colors";

export default function App() {
  const { activeTab, currentRoute, goBack, navigate, switchTab } = useAppNavigation();
  const showTabBar = !currentRoute;

  return (
    <MockAppProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <View style={styles.appShell}>
          <View pointerEvents="none" style={styles.backdrop}>
            <View style={styles.glowTop} />
            <View style={styles.glowBottom} />
          </View>
          <View style={styles.content}>
            {currentRoute ? (
              <StackScreens route={currentRoute} actions={{ goBack, navigate, switchTab }} />
            ) : (
              <>
                {activeTab === "explore" && <ExploreScreen navigate={navigate} switchTab={switchTab} />}
                {activeTab === "create" && <CreateListingScreen navigate={navigate} switchTab={switchTab} />}
                {activeTab === "messages" && <MessagesScreen navigate={navigate} switchTab={switchTab} />}
                {activeTab === "profile" && <ProfileScreen navigate={navigate} switchTab={switchTab} />}
              </>
            )}
          </View>
          {showTabBar ? (
            <View style={styles.tabBarHost}>
              <BottomTabBar activeTab={activeTab} onChange={switchTab} />
            </View>
          ) : null}
        </View>
      </SafeAreaView>
    </MockAppProvider>
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
  glowTop: {
    position: "absolute",
    top: -150,
    right: -90,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: "#E6EEFF",
    opacity: 0.9
  },
  glowBottom: {
    position: "absolute",
    left: -70,
    bottom: 180,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "#FFE4D3"
  },
  content: {
    flex: 1
  },
  tabBarHost: {
    backgroundColor: colors.nav,
    paddingBottom: Platform.OS === "android" ? 8 : 0
  }
});
