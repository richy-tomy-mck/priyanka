import {
  TextInput,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import styles from "../../styles/create-orders";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import * as OrderService from "../../services/GraphqlOrderService";
import {

  OrderDetailsFooter,
  ScreenHeaderBtn,

} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";

const OrderDetails = () => {
  const params = useSearchParams();
  const router = useRouter();

  const [order, setOrder] = useState({});
  const [edited, setEdited] = useState(false)
  const [fetchLoader, setFetchLoader] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("order-received");
  const [items, setItems] = useState([
    { label: "Order Received", value: "order-received" },
    { label: "Work in Progress", value: "work-in-progress" },
    { label: "Delivered", value: "delivered" },
    { label: "Order Completed", value: "order-completed" },
  ]);

  const fetchOrder = async () => {
    setFetchLoader(true);

    try {
      const result = await OrderService.getOrderById(params.id);
      setOrder(result);
      console.log(result);
    } catch (error) {
      setFetchError(error);
      console.log(error);
    } finally {
      setFetchLoader(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const date = new Date(order.createdTime);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
          ),
          headerTitle: "",
        }}
      />
      <>
        <View style={styles.descriptionContainer}>
          <View style={styles.descriptionImageWrapper}>
            <Image
              source={icons.description}
              resizeMode="contain"
              style={styles.descriptionImage}
            />
          </View>
          <View style={styles.descriptionWrapper}>
            <TextInput
              placeholder=""
              nativeID="description"
              onChangeText={(text) => {
                const updatedOrder = {...order, description:text};
                setOrder(updatedOrder)
                setEdited(true)
              }}
              value={order.description}
              style={styles.descriptionInput}
            />
          </View>
        </View>

        <View style={styles.weightContainer}>
          <View style={styles.descriptionImageWrapper}>
            <Image
              source={icons.weight}
              resizeMode="contain"
              style={styles.descriptionImage}
            />
          </View>
          <View style={styles.weightWrapper}>
            <TextInput
              placeholder=""
              nativeID="weight"
              keyboardType="numeric"
              value={order.weight}
              onChangeText={(text) => {
                const updatedOrder = {...order, weight:text};
                setOrder(updatedOrder)
                setEdited(true)
              }}
              style={styles.descriptionInput}
            />
          </View>
          <Text>grams</Text>
        </View>

        <View style={styles.orderStatusContainer}>
          <View style={styles.statusImageWrapper}>
            <Image
              source={icons.status}
              resizeMode="contain"
              style={styles.statusImage}
            />
          </View>
          <View style={styles.orderStatusWrapper}>
            <DropDownPicker
              open={open}
              value={order.orderStatus ? order.orderStatus : value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              onSelectItem={(item) => {
                console.log(item);
                const updatedOrder = {...order, orderStatus:item.value};
                setOrder(updatedOrder)
                setEdited(true)
              }}
              setItems={setItems}
              disableBorderRadius={true}
              style={styles.orderStatusDropDownPicker}
            />
          </View>
        </View>

        <View style={styles.createdDateWrapper}>
          <Text>Order created on {Date(parseInt(order.createdTime))}</Text>
        </View>
      </>
      <OrderDetailsFooter updateOrderInput={order} edited={edited}/>
    </SafeAreaView>
  );
};

export default OrderDetails;
