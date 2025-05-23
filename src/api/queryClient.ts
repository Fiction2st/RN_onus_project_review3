// 기본설정을 작성한다.
// 호출 - 응답이 에러일 때, 몇번 더 시도할 것인가? (retry)


// staleTime : 200 응답을 받았을 때, 해당 데이터가 fresh한 시간을 설정함 -> 해당 시간동안 동일한 호출은 새로 값을 받지 않는다.
// cacheTime : 데이터를 cache 에 유지하는 시간 -> staleTime 이후 cacheTime 안에서는 사용자가 선택하여 값을 가져올 수 있다.

import {QueryClient} from "@tanstack/react-query";

const queryClient : QueryClient = new QueryClient({
    defaultOptions: {
        queries : { // get 에 사용
            retry : false,
            staleTime : 20 * 1000, // fresh -> stale 로 변경되는데 걸리는 시간으로 20초 내에는 재호출 안함
            cacheTime : 5 * 60 * 1000, // 5분
        },
        mutations : { // post, put 에 사용
            retry : false,
        },
    },
});

export default queryClient;
