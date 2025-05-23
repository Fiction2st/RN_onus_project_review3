import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButton, Text } from '@react-navigation/elements';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import bell from '../assets/bell.png';
import newspaper from '../assets/newspaper.png';
import { Home } from './screens/Home';
import { Profile } from './screens/Profile';
import { Settings } from './screens/Settings';
import { Updates } from './screens/Updates';
import { NotFound } from './screens/NotFound';
import {AntDesign} from "@expo/vector-icons";
import Home2 from "./screens/Home2";
import MovieDetail from "./screens/MovieDetail";
import Three from "./screens/Three";

const HomeTabs = createBottomTabNavigator({
  screens: {
    Home3: { // 추가 작성을 통해 navigator 탭 바를 추가할 수 있음, 보통 최대 5개
      screen: Three,
      screenOptions:{
        tabBarLabelStyle:{
          fontFamily : 'NotoSansKR',
          fontSize : 14,
        },
      },
      options: {
        title: '첫번째',
        tabBarIcon: ({ color, size }) => (
            // <Image
            //     source={newspaper}
            //     tintColor={color}
            //     style={{
            //       width: size,
            //       height: size,
            //     }}
            // />
            <AntDesign name="linechart" size={24} color={color} />
        ),
      },
    },
    Home: {
      screen: Home,
      options: {
        title: 'Feed',
        tabBarIcon: ({ color, size }) => (
          <Image
            source={newspaper}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    Home2: { // 추가 작성을 통해 navigator 탭 바를 추가할 수 있음, 보통 최대 5개
      screen: Home2,
      screenOptions:{
        tabBarLabelStyle:{
          fontFamily : 'NotoSansKR',
          fontSize : 14,
        },
      },
      options: {
        title: '두번째메뉴',
        tabBarIcon: ({ color, size }) => (
            // <Image
            //     source={newspaper}
            //     tintColor={color}
            //     style={{
            //       width: size,
            //       height: size,
            //     }}
            // />
            <AntDesign name="linechart" size={24} color={color} />
        ),
      },
    },

    Updates: {
      screen: Updates,
      options: {
        tabBarIcon: ({ color, size }) => (
          <Image
            source={bell}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: 'Home',
        headerShown: false,
      },
    },
    MovieDetail: {
      screen: MovieDetail,
      linking: {
        path: 'movie/:id' // movie의 id를 받는것
      },
      options: {
        title: 'Movie Detail',
        headerShown: true,
      },
    },
    Profile: {
      screen: Profile,
      linking: {
        path: ':user(@[a-zA-Z0-9-_]+)',
        parse: {
          user: (value) => value.replace(/^@/, ''),
        },
        stringify: {
          user: (value) => `@${value}`,
        },
      },
    },
    Settings: {
      screen: Settings,
      options: ({ navigation }) => ({
        presentation: 'modal',
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>Close</Text>
          </HeaderButton>
        ),
      }),
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: '404',
      },
      linking: {
        path: '*',
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
