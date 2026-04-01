import { ReactNode } from "react";
import { StyleProp, StyleSheet, View, ViewProps, ViewStyle } from "react-native";

import { colors } from "../../theme/colors";
import { radii, shadows } from "../../theme/tokens";

type Tone = "default" | "muted" | "dark";

type Props = ViewProps & {
  children: ReactNode;
  elevated?: boolean;
  tone?: Tone;
  style?: StyleProp<ViewStyle>;
};

export function SurfaceCard({ children, elevated = false, tone = "default", style, ...rest }: Props) {
  return (
    <View
      style={[
        styles.base,
        tone === "default" && styles.defaultTone,
        tone === "muted" && styles.mutedTone,
        tone === "dark" && styles.darkTone,
        elevated && styles.elevated,
        style
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border
  },
  defaultTone: {
    backgroundColor: colors.white
  },
  mutedTone: {
    backgroundColor: colors.surfaceMuted
  },
  darkTone: {
    backgroundColor: colors.secondary,
    borderColor: "rgba(255,255,255,0.08)"
  },
  elevated: shadows.soft
});
