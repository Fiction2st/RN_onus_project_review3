import React, {useMemo} from 'react';
import Block from "../../components/Block";
import Text from "../../components/Text";
import {Dimensions, FlatList, StyleSheet, TouchableOpacity} from "react-native";
import {theme} from "../../constraints";

const {width} = Dimensions.get("window");

const Three = () => {

    const [active, setActive] = React.useState("Products");
    const tabs = useMemo(()=>["Products", "Inspiration","Shop"], []);

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

    return (
        <Block center>
            <Text h1 bold color = {"red"}> Movie Info </Text>
            <Block flex={false} row style={styles.tabs}>
                {tabs.map(tab=>renderTab(tab))}
            </Block>
            {active === "Products" && (
                    <Text h1 bold> product</Text>
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
});