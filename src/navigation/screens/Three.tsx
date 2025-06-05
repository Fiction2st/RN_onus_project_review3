import React, {useMemo} from 'react';
import Block from "../../components/Block";
import Text from "../../components/Text";
import {Image, Dimensions, FlatList, Platform, StyleSheet, TouchableOpacity, View, ScrollView} from "react-native";

import {useGetMovies} from "../../api/useQueries";
import {theme} from "../../constraints";
import {FontAwesome} from "@expo/vector-icons";

const {width, height} = Dimensions.get("window");

const Three = () => {

    const [active, setActive] = React.useState("Products");
    const tabs = useMemo(()=>["Products", "Inspiration","Shop"], []);
    const {data : movies, isError} = useGetMovies();

    const handleTap= (tab:string) => setActive(tab);

    const renderTab = (tab:string) => {
        const isActive = active === tab;
        return (
            <TouchableOpacity
                key={`tab-${tab}`}
                onPress={() => handleTap(tab)}
                style={[styles.tab, isActive && styles.active]}
            >
                <Text size={16} medium gray={!isActive} secondary={isActive}>
                    {tab}
                </Text>
            </TouchableOpacity>
        )

    }

    const renderRatings = (rating) => {
        const stars = new Array(5).fill(0);
        return stars.map((_, index) => {
            const activeStar = Math.floor(rating) >= (index + 1);
            return (
                <FontAwesome
                    name="star"
                    key={`star-${index}`}
                    size={theme.sizes.font}
                    color={theme.colors[activeStar ? 'tertiary' : 'gray']}
                />
            );
        });
    };

    const renderMovieCard = (item, index) => {
        {console.log(item)}
        const isLastItem = index === useGetMovies.length -1;
        return (
            <Block flex col
                   style={[styles.shadow, styles.movieCard,
                            index === 0 && {marginLeft: 36},
                            isLastItem && {marginLeft: 36 / 2},
            ]}>
                <Block flex style={styles.movieHeader}>
                    <Image
                        source={{
                            uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                        }}
                        style={styles.poster}
                    />
                    <Block flex row style={styles.movieOptions}>
                        <Text style={styles.movieTemp}>
                        <FontAwesome
                            name={item.saved ? 'bookmark' : 'bookmark-o'}
                            color={theme.colors.white}
                            size={14*1.25}
                        />
                        </Text>
                    </Block>
                    <Block flex col style={[styles.shadow,
                        {justifyContent: 'space-evenly', padding : 36 /2 }]}>
                        <Text style={{fontSize : 14 * 1.25, fontWeight: '500', paddingBottom : 36 / 4.5}}>
                            {item.title.slice(0,15)}
                        </Text>
                        <Text style={{color : theme.colors.gray}}>
                            {item.overview.slice(0,50)}
                        </Text>
                        <Block row center space-between marginTop={36/2.5}>
                            <Text style={{color : 'red'}}>
                                {renderRatings(item.vote_average)}
                            </Text>
                        </Block>
                        <Text style={styles.movieTemp}>

                        </Text>
                    </Block>
                </Block>
            </Block>
        )
    }
    const renderMovieItem = () => (
        <View style={[styles.column, styles.recommendedList]}>
            <FlatList
                horizontal
                pagingEnabled
                scrollEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                snapToAlignment="start"
                style={styles.shadow}
                data={movies}
                keyExtractor={(item) => `${item.id}`}
                renderItem={({ item, index }) => renderMovieCard(item, index)}
            />
        </View>
    )

    return (
        <Block center>
            <Text h1 bold color = {"red"}> Movie Info </Text>
            <Block flex={false} row style={styles.tabs}>
                {tabs.map(tab=>renderTab(tab))}
            </Block>
            {active === "Products" && (
                <ScrollView
                    style={{marginTop : 10}}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom : 36}}
                >
                    {renderMovieItem()}
                </ScrollView>

            )}
            {active === "Inspiration" && (
                <Text h1 bold> Inspiration</Text>
            )}
            {active === "Shop" && (
                <Text h1 bold> shop</Text>
            )}
        </Block>
    )


};

export default Three;

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: theme.sizes.base * 2,
    },
    tabs: {
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginVertical: theme.sizes.base,
        marginHorizontal: theme.sizes.base * 2,
    },
    tab: {
        marginRight: theme.sizes.base * 2,
        paddingBottom: theme.sizes.base,
    },
    active: {
        borderBottomColor: theme.colors.secondary,
        borderBottomWidth: 3,
    },
    category: {
        minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
        maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
        maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    },
    poster: {
        width: (width - 36 * 2) / 2,
        height: (width - 36 * 2) / 2
    },
    movieTemp: {
      fontSize : 14 / 1.25,
        color : theme.colors.black,
        marginVertical: 36 / 5,
    },
    movieOptions:{
        alignItems:'center',
        justifyContent: 'space-between',
        padding : 36,
        position: 'absolute',
        top:0,
        left:0,
        right:0,
    },
    movieHeader: {
        overflow: 'hidden',
        borderTopRightRadius: 12,
        borderTopLeftRadius : 12,
    },
    shadow : {
        shadowColor : theme.colors.black,
        shadowOffset:{
            width : 0,
            height : 6,
        },
        shadowOpacity: 0.2,
        shadowRadius : 10,
        elevation: 5,
    },
    movieCard: {
        width : (width - (36 * 2))/2,
        marginHorizontal: 8,
        backgroundColor: theme.colors.white,
        overflow: 'hidden',
        borderRadius: 12,
        marginVertical: 36 * 0.5,
    }
});