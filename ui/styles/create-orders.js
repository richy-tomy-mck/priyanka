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

  descriptionInput: {
    fontFamily: FONT.regular,
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
  },

  descriptionImage: {
    width: "100%",
    height: "100%",
    tintColor: "#F37453",
  },

  descriptionContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.large,
    height: 50,
  },
  descriptionWrapper: {
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
    width: "80%"
  },

  weightContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.large,
    height: 50,
  },
  weightWrapper: {
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
    width: "68%"
  },

  descriptionImageWrapper: {
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    borderRadius: SIZES.medium,
    width: 50,
  },

  ButtonText: {
    marginBottom: 4,
    color: COLORS.lightWhite,
  },
});

export default styles;
