import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../constants";

const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
    color: "#455fff",
  },
  textInput: {
    width: 250,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#455fff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 8,
  },

  SignupButton: (disabled) => ({
    paddingHorizontal: SIZES.small / 2,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    backgroundColor: disabled ? COLORS.gray : COLORS.green,
    borderColor: COLORS.secondary,
    width: 150,
    marginTop: 2,
    justifyContent: "center",
    alignItems: "center",
  }),

  CancelButton: {
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    backgroundColor: COLORS.green,
    borderColor: COLORS.secondary,
    width: 150,
    marginTop: 2,
    justifyContent: "center",
    alignItems: "center",
  },

  ButtonText: {
    marginBottom: 4,
    color: COLORS.lightWhite,
  },
});

export default styles;
