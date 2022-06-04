import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface dataProp {
    address_name?: string;
    road_address_name?: string;
    category_group_name?: string;
    phone?: string;
    place_name?: string;
    x?: string;
    y?: string;
}

interface MapProps {
    search?: boolean;
    // data?: Array<any>;
    data?: dataProp;
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
        if(data?.x){
            const placePosition = new window.kakao.maps.LatLng(data.y, data.x);
            const bounds = new window.kakao.maps.LatLngBounds();
            bounds.extend(placePosition);
            if(mapObj?.setBounds){
                mapObj.setBounds(bounds);        
            }
        }
      }, [data, mapObj]);

    return (
        <MapDiv>
            <h1>지도</h1>
            {data?.place_name ? 
                <h2>{data.place_name}</h2> : null}
            {data?.address_name ? 
                <h2>{data.address_name}</h2> : null}
            <KaKaoMap id="map"/>
        </MapDiv>
        );
};

export default Map;