import { StyleSheet, Text, View } from "react-native";

import { colors } from "../../theme/colors";
import { headlineFont } from "../../theme/typography";
import { spacing } from "../../theme/tokens";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  inverse?: boolean;
};

export function PageIntro({ eyebrow, title, description, align = "left", inverse = false }: Props) {
  return (
    <View>
      <Text style={[styles.eyebrow, inverse && styles.inverseText, align === "center" && styles.center]}>
        {eyebrow}
      </Text>
      <Text style={[styles.title, inverse && styles.inverseTitle, align === "center" && styles.center]}>{title}</Text>
      <Text style={[styles.description, inverse && styles.inverseText, align === "center" && styles.center]}>
        {description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  eyebrow: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.2,
    color: colors.primary
  },
  title: {
    marginTop: spacing.sm,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "700",
    fontFamily: headlineFont,
    color: colors.secondary
  },
  description: {
    marginTop: spacing.sm,
    fontSize: 15,
    lineHeight: 24,
    color: colors.textMuted
  },
  inverseText: {
    color: "#D7E0EF"
  },
  inverseTitle: {
    color: colors.white
  },
  center: {
    textAlign: "center"
  }
});
