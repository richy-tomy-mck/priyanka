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
import styles from "../../styles/create-orders";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { useState, useCallback } from "react";
import {
  Company,
  JobAbout,
  OrderFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";

const CreateOrder = () => {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [weight, setweight] = useState('');

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
        <ScrollView showsVerticalScrollIndicator={false}>
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
                placeholder="Enter a description"
                nativeID="description"
                onChangeText={(text) => {
                  setDescription(text)
                }}
                value={description}
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
                placeholder="Enter weight"
                nativeID="weight"
                keyboardType = 'numeric'
                value={weight}
                onChangeText={(text) => {
                  setweight(text)
                }}
                style={styles.descriptionInput}
              />
            </View>
            <Text>grams</Text>
          </View>
        </ScrollView>

        <OrderFooter description={description} weight={weight}/>
      </>
    </SafeAreaView>
  );
};

export default CreateOrder;
