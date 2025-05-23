import { Assets as NavigationAssets } from '@react-navigation/elements';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { Navigation } from './navigation';
import {useFonts} from "expo-font";
import {useEffect} from "react";
import {QueryClientProvider} from "@tanstack/react-query";
import queryClient from "./api/queryClient";

Asset.loadAsync([
  ...NavigationAssets,
  require('./assets/newspaper.png'),
  require('./assets/bell.png'),
]);

SplashScreen.preventAutoHideAsync();

export function App() {

    const [fontsLoaded] = useFonts({ // 설정한 폰트가 로드가 되었는지 fontsLoaded 변수 지정 (boolean)
        NotoSansKR : require('./assets/font/NotoSansKR-SemiBold.ttf'),
    })

    useEffect(() => { // fontsLoaded 상태가 변경될 떄 아래 함수를 실행한다.
        if (fontsLoaded){
            SplashScreen.hideAsync(); // Splash 화면을 숨김 처리한다.
        }
    }, [fontsLoaded]); // 해당 코드를 통해 폰트를 불러오기 전에 앱이 렌더링 되는 것을 방지 가능

    if(!fontsLoaded){
        return null;
    }
    return (
    <QueryClientProvider client={queryClient}>
    <Navigation
      linking={{
        enabled: 'auto',
        prefixes: [
          // Change the scheme to match your app's scheme defined in app.json
          'helloworld://',
        ],
      }}
      onReady={() => {
        SplashScreen.hideAsync();
      }}
    />
    </QueryClientProvider>
  );
}
