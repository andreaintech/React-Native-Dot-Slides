import React from 'react';
import { StyleSheet, View, Dimensions, FlatList, Animated } from 'react-native';
import { CarouselItem } from './index';

const { width, height } = Dimensions.get('window');

const Carousel = ({ data }: any) => {
    const scrollX = new Animated.Value(0);
    let position = Animated.divide(scrollX, width);
    return (
        <View>
            <FlatList
                data={data}
                keyExtractor={(item: any, index: number) => String(index)}
                horizontal
                pagingEnabled
                scrollEnabled
                snapToAlignment='center'
                scrollEventThrottle={16}
                decelerationRate={'fast'}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <CarouselItem item={item} />
                    )
                }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
            />

            <View style={styles.dotView}>
                {data.map((_: any, i: number) => {
                    let opacity = position.interpolate({
                        inputRange: [i - 1, i, i + 1],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: 'clamp'
                    })

                    return (
                        <Animated.View
                            key={i}
                            style={{ opacity, height: 10, width: 10, backgroundColor: '#595959', margin: 8, borderRadius: 5 }}
                        />
                    )
                })}
            </View>
        </View>
    )
}

export default Carousel

const styles = StyleSheet.create({
    dotView: {
        flexDirection: 'row',
        justifyContent: 'center',
    }
})
