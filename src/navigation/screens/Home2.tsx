import React, {useMemo, useState} from 'react';
import {View, Text, Dimensions, TouchableOpacity, StyleSheet, Alert} from "react-native";

import * as ImagePicker from "expo-image-picker";
import {Image} from "expo-image";

import {Button} from "@react-navigation/elements";
import Block from "../../components/Block";
import {theme} from "../../constraints";

const {width} = Dimensions.get("window");
const Home2 = () => {
    const [active, setActive] = useState("탭1");
    const tabs = useMemo(()=>["탭1", "탭2","탭3"], []);
    const [photoUri, setPhotoUri] = useState<string | null>(null);

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

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();

        if (status !== "granted") {
            Alert.alert("카메라 권한이 필요합니다.");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1, // 사진의 해상도 퀄리티를 설정, 1이 원본, 0일수록 떨어짐
        });

        if (!result.canceled) {
            setPhotoUri(result.assets[0].uri);
        }
    };

    return (
        <Block center>
            <Text h1 bold color = {"red"}> Movie Info </Text>
            <Block flex={false} row style={styles.tabs}>
                {tabs.map(tab=>renderTab(tab))}
            </Block>
            {active === "탭1" && (
                <View style={{flex:1, alignItems : 'center'}}>
                    <Button title='사진가져오기' onPress={(takePhoto)}/>
                    <Button title='사진삭제' onPress={() => setPhotoUri(null)}/>
                    {photoUri && (
                        <Image
                            source = {{ uri : photoUri}}
                            style={{ width : 300, height : 400}}
                            resizeMode = "contain"
                        />
                    )}
                </View>
            )}
            {active === "탭2" && (
                <Text h1 bold> Inspiration</Text>
            )}
            {active === "탭3" && (
                <Text h1 bold> shop</Text>
            )}
        </Block>
    )
};

export default Home2;
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