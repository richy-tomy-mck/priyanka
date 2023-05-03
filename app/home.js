import { useState, useEffect } from 'react'
import { View, ScrollView, SafeAreaView } from 'react-native'
import { Stack, useRouter, useRootNavigationState, useSegments } from 'expo-router'
import { COLORS, icons, images, SIZES } from '../constants'
import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome } from '../components'
import { AuthStore } from "../store"

// 



const Home = () => {
    const segments = useSegments();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("")
    const { isLoggedIn } = AuthStore.useState((s) => s);
    const navigationState = useRootNavigationState();

    useEffect(() => {
        if (!navigationState?.key) return;
      
        const inAuthGroup = segments[0] === "(auth)";
      
        if (
          // If the user is not signed in and the initial segment is not anything in the auth group.
          !isLoggedIn &&
          !inAuthGroup
        ) {
          // Redirect to the sign-in page.
          router.replace("/(auth)/login");
        } else if (isLoggedIn && inAuthGroup) {
          // Redirect away from the sign-in page.
          router.replace("/home");
        }
      }, [isLoggedIn, segments, navigationState?.key]);


    return (<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <Stack.Screen
            options={{
                headerStyle: { backgroundColor: COLORS.lightWhite },
                headerShadowVisible: false,
                headerLeft: () => (
                    <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%"/>
                ),
                headerRight: () => (
                    <ScreenHeaderBtn iconUrl={images.profile} handlePress={()=>{
                        router.push(`/profile`)
                      }} dimension="100%"/>
                ),
                headerTitle: ""
            }} />
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{
                    flex: 1,
                    padding: SIZES.medium
                }}>
                    <Welcome
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    handleClick={() => {
                        if(searchTerm){
                            router.push(`/search/${searchTerm}`)
                        }
                    }}
                    />
                    <Popularjobs/>
                    <Nearbyjobs/>

                </View>
            </ScrollView>
    </SafeAreaView>)
}

export default Home