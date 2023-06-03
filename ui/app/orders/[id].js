import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View } from 'react-native'
import { Stack, useRouter, useSearchParams } from 'expo-router'
import { Text, SafeAreaView } from 'react-native'
import * as OrderService from "../../services/GraphqlOrderService";

import { ScreenHeaderBtn, NearbyJobCard } from '../../components'
import { COLORS, icons, SIZES } from '../../constants'
import styles from '../../styles/orderlist'


const OrderList = () => {
    // const params = useSearchParams();
    const router = useRouter()

    const [orders, setOrders] = useState([]);
    const [fetchLoader, setFetchLoader] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const [page, setPage] = useState(1);
    const [nextToken, setnextToken] = useState(null);
    const limit = 10;

    const fetchOrders = async () => {
        setFetchLoader(true);

        try {
            const result = await OrderService.listAllOrders(limit, nextToken)
            console.log(result)
            setOrders([...orders, ...result.items]);
            setnextToken(result.nextToken)

        } catch (error) {
            setFetchError(error);
            console.log(error);
        } finally {
            setFetchLoader(false);
        }
    };

    const handlePagination = (direction) => {
        if (direction === 'left' && page > 1) {
            setPage(page - 1)
            fetchOrders()
        } else if (direction === 'right') {
            setPage(page + 1)
            fetchOrders()
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension='60%'
                            handlePress={() => router.back()}
                        />
                    ),
                    headerTitle: "",
                }}
            />

            <FlatList
                data={orders}
                renderItem={({ item }) => (
                    <NearbyJobCard
                        order={item}
                        handleNavigate={() => router.push(`/order-details/${item.orderId}`)}
                    />
                )}
                keyExtractor={(item) => item.orderId}
                contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
                ListHeaderComponent={() => (
                    <>
                        <View style={styles.container}>
                            <Text style={styles.searchTitle}>All Orders</Text>
                            <Text style={styles.noOfSearchedJobs}>{orders.length}</Text>
                        </View>
                        <View style={styles.loaderContainer}>
                            {fetchLoader ? (
                                <ActivityIndicator size='large' color={COLORS.primary} />
                            ) : fetchError && (
                                <Text>Oops something went wrong</Text>
                            )}
                        </View>
                    </>
                )}
                ListFooterComponent={() => (
                    <View style={styles.footerContainer}>
                        <TouchableOpacity
                            style={styles.paginationButton}
                            onPress={() => handlePagination('left')}
                        >
                            <Image
                                source={icons.chevronLeft}
                                style={styles.paginationImage}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        <View style={styles.paginationTextBox}>
                            <Text style={styles.paginationText}>{page}</Text>
                        </View>
                        {nextToken == null && <TouchableOpacity
                            style={styles.paginationButton}
                            onPress={() => handlePagination('right')}
                        >
                            <Image
                                source={icons.chevronRight}
                                style={styles.paginationImage}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>}
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

export default OrderList