import { useState, useEffect } from "react";
import {
  Image,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {
  Stack,
  useRouter,
  useRootNavigationState,
  useSegments,
} from "expo-router";
import { COLORS, icons, images, SIZES } from "../constants";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
  Orders,
} from "../components";
import { AuthStore } from "../store";
import { TEST } from '@env';
const test = TEST;

//

const Home = () => {
  const segments = useSegments();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const { isLoggedIn } = AuthStore.useState((s) => s);
  const navigationState = useRootNavigationState();

  


  // useEffect(() => {
  //     const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
  //     return subscriber;
  // }, []);

  useEffect(() => {
    console.log("Navigation state", navigationState?.key);
    if (!navigationState?.key) return;

    const inAuthGroup = segments[0] === "(auth)";
    console.log("authgroup", inAuthGroup);

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !isLoggedIn &&
      !inAuthGroup
    ) {
      console.log("logged in", isLoggedIn, inAuthGroup);
      // Redirect to the sign-in page.
      router.replace("login");
    } else if (isLoggedIn && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/home");
    }
  }, [isLoggedIn, segments, navigationState?.key]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={images.profile}
              handlePress={() => {
                router.push(`/profile`);
              }}
              dimension="100%"
            />
          ),
          headerTitle: "",
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(`/orders/${searchTerm}`);
              }
            }}
          />
          <Popularjobs />
          <Nearbyjobs />
        </View>
      </ScrollView>
      <Orders
            handleClick={() => {
              router.push(`/orders/createorder`);
            }}
          />
    </SafeAreaView>
  );
};

export default Home;
