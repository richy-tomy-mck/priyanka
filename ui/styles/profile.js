import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../constants";

const styles = StyleSheet.create({
    userName: {
        fontFamily: FONT.bold,
        fontSize: SIZES.xLarge,
        color: COLORS.primary,
        marginTop: 2,
      },

      SignOutButtonText: {
        fontFamily: FONT.bold,
        fontSize: SIZES.large,
        color: COLORS.lightWhite,
        marginTop: 2,
      },

      SignOutButton: {
        paddingVertical: SIZES.small / 2,
        paddingHorizontal: SIZES.small,
        borderRadius: SIZES.medium,
        borderWidth: 1,
        backgroundColor: COLORS.red,
        borderColor: COLORS.secondary,
      },
});

export default styles;
