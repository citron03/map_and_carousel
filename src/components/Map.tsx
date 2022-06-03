import React, { useEffect, useState } from "react";
import styled from "styled-components";

//* Props 타입 명시 컴포넌트가 상위 컴포넌트로 부터 어떤 속성을 전달받을 지에 대한 props 정의
interface MapProps {
    search?: boolean;
    data?: Array<any>;
}

const MapDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;
    margin: 60px;
    border: 1px solid red;
`

const KaKaoMap = styled.div`
    width: 1000px;
    height: 800px;
`

declare global {
    interface Window {
        kakao: any;
    }
}

const Map: React.FC<MapProps> = ({data}) => {    // React.FC : React의 함수형 컴포넌트

    const [mapObj, setMapObj] = useState({} as any);

    useEffect(() => {
        let container = document.getElementById('map');
        let options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
          };
        let map = new window.kakao.maps.Map(container, options);
        setMapObj(map);
    }, []);

    useEffect(() => {
        if(data && data.length > 0){
            const placePosition = new window.kakao.maps.LatLng(data[0].y, data[0].x);
            const bounds = new window.kakao.maps.LatLngBounds();
            bounds.extend(placePosition);
            if(mapObj?.setBounds){
                mapObj.setBounds(bounds);        
            }
        }

      }, [data, mapObj]);

    return (
        <MapDiv>
            <h1>이건 지도</h1>
            <KaKaoMap id="map"/>
        </MapDiv>
        );
};

export default Map;