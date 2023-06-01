import React from "react";
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import { useRouter } from "expo-router";

import styles from "./footer.style";
import { icons } from "../../../constants";
import * as OrderService from "../../../services/GraphqlOrderService";
import uuid from 'react-native-uuid';

const Footer = ({ description, weight }) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.likeBtn}>
        <Image
          source={icons.image}
          resizeMode="contain"
          style={styles.likeBtnImage}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.createOrderBtn}
        onPress={async () => {
          const CreateOrderInput = {
            orderId: uuid.v4(),
            createdTime: Date.now(),
            description,
            weight,
          };
          console.log(CreateOrderInput);
          const result = await OrderService.createOrder(CreateOrderInput);
          router.back()
        }}
      >
        <Text style={styles.applyBtnText}>Create Order</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
