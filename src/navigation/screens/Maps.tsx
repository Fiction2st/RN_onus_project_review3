import {Text, View} from "react-native";
import WebView from "react-native-webview";

function Maps(){

    const mapContent = `<!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=b4ba059cc959a1eda03e6266950025ab&libraries=services"></script>
        <style>
          body { margin: 0; padding: 0; height: 100%; }
          html { height: 100%; }
          #map { width: 100%; height: 100%; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          window.onload = function() {
            if (typeof kakao !== 'undefined' && kakao.maps) {
              const mapContainer = document.getElementById('map');
              const mapOption = {
                center: new kakao.maps.LatLng(37.5662952, 126.9779451),
                level: 3 // 레벨 수치가 높을 수록 지도를 더 넓게 표시함
              };
              const map = new kakao.maps.Map(mapContainer, mapOption);
              
              const imageSrc = 'https://fe-static.s3.ap-northeast-2.amazonaws.com/images/image/current-location.png';
              const imageSize = new kakao.maps.Size(48, 48);
              const imageOption = { offset: new kakao.maps.Point(24, 36) };
              const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
              const markerPosition = new kakao.maps.LatLng(37.5662952, 126.9779451);
              const marker = new kakao.maps.Marker({
                  position: markerPosition,
                  image: markerImage,
                });
              marker.setMap(map);
            } else {
              console.error('Kakao Maps is not available');
            }
          };
        </script>
      </body>
    </html>
    `
    return (
        <View style={{flex: 1}}>
            <WebView
                source ={{ html : mapContent}}
                style={{flex: 1}}
            />
        </View>
    )
}

export default Maps;