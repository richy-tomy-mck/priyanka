import React from "react";
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import { useRouter } from "expo-router";

import styles from "./footer.style";
import { icons } from "../../../constants";
import * as OrderService from "../../../services/GraphqlOrderService";

const Footer = ({updateOrderInput, edited}) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* <TouchableOpacity style={styles.likeBtn}>
        <Image
          source={icons.image}
          resizeMode="contain"
          style={styles.likeBtnImage}
        />
      </TouchableOpacity> */}

      <TouchableOpacity
        style={styles.updateOrderBtn(edited)}
        disabled={!edited}
        onPress={async () => {
          const result = await OrderService.updateOrder(updateOrderInput);
          router.back()
        }}
      >
        <Text style={styles.saveBtnText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
