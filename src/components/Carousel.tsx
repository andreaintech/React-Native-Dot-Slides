import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Dimensions, FlatList, Animated } from 'react-native';
import { CarouselItem } from './index';

const { width } = Dimensions.get('window');

function infiniteScroll(dataList: any, mySlide: any) {
    const numberOfData = dataList.length
    let scrollValue = 0, scrolled = 0

    setInterval(function () {
        scrolled++
        if (scrolled < numberOfData)
            scrollValue = scrollValue + width
        else {
            scrollValue = 0
            scrolled = 0
        }
        if (mySlide.current) {
            mySlide.current.scrollToOffset({
                animated: true,
                offset: scrollValue,
            });
        }
    }, 3000);
}

const Carousel = ({ data }: any) => {
    const scrollX = new Animated.Value(0);
    let position = Animated.divide(scrollX, width);
    const [dataList, setDataList] = useState(data);
    const mySlide = useRef(null);

    useEffect(() => {
        setDataList(data);
        infiniteScroll(dataList, mySlide);
    }, []);

    return (
        <View>
            <FlatList
                ref={mySlide}
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
