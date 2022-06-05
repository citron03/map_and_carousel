import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MapNavigation from "./MapNavigation";

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
    padding: 50px;
    margin: 60px auto;
    border: 3px solid #303952;
    width: fit-content;
    @media only screen and (max-width: 767px) {
        margin: 0 auto;
        padding: 15px;
        width: 60%;
    }
`

const RoadViewDiv = styled.div<{isVisible: boolean}>`
    display: ${({isVisible}) => isVisible ? "flex" : "none"};
    flex-direction: column;
`

const MapInfoDiv = styled.div<{isVisible: boolean}>`
    display: ${({isVisible}) => isVisible ? "flex" : "none"};
    flex-direction: column;
`

const KakaoMap = styled.div`
    width: 1000px;
    height: 800px;
    @media only screen and (max-width: 767px) {
        width: 100%;
        height: 400px;
    }
`

const RoadView = styled.div`
    width: 1000px;
    height: 800px;
    @media only screen and (max-width: 767px) {
        width: 100%;
        height: 400px;
    }
`

declare global {
    interface Window {
        kakao: any;
    }
}

const Map: React.FC<MapProps> = ({data}) => {    // React.FC : React의 함수형 컴포넌트

    const [mapObj, setMapObj] = useState({} as any);
    const [mapNavigator, setMapNavigator] = useState({"map": true, "roadview": true});
    const [isVaildRoadView, setIsVaildRoadView] = useState(true);

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
        if(data?.x) {
            const searchPosition = new window.kakao.maps.LatLng(data.y, data.x);
            if(mapObj?.setBounds){
                // 지도 위치 이동
                const bounds = new window.kakao.maps.LatLngBounds();
                bounds.extend(searchPosition);
                mapObj.setBounds(bounds);        
            }
            if(mapObj?.Id) {
                // 지도 마커 설정
                const marker = new window.kakao.maps.Marker();
                marker.setPosition(searchPosition);
                marker.setMap(mapObj);       
                // 로드 뷰 설정
                const roadviewContainer = document.getElementById('roadview'); 
                const roadview = new window.kakao.maps.Roadview(roadviewContainer); 
                const roadviewClient = new window.kakao.maps.RoadviewClient(); 
                
                // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
                roadviewClient.getNearestPanoId(searchPosition, 50, function(panoId: any) {
                    // console.log("panoId", panoId);
                    if(panoId){
                         //panoId와 중심좌표를 통해 로드뷰 실행, 로드뷰가 실행 가능한 상태일때만 (panoId 존재)
                        roadview.setPanoId(panoId, searchPosition);
                        setIsVaildRoadView(true);
                    } else {
                        setIsVaildRoadView(false); // 로드 뷰 없음
                    }
                });                
            }
        }
      }, [data, mapObj]);
    

    return (
        <MapDiv>
            <MapNavigation mapNavigator={mapNavigator} setMapNavigator={setMapNavigator}/>
            {data?.place_name ? 
                <h2>{data.place_name}</h2> : null}
            {data?.address_name ? 
                <h2>{data.address_name}</h2> : null}
            <MapInfoDiv isVisible={mapNavigator.map}>
                <h1>지도</h1>
                <KakaoMap id="map"/>
            </MapInfoDiv>          
            <RoadViewDiv isVisible={mapNavigator.roadview}>
                <h1>로드 뷰</h1>
                {isVaildRoadView ? 
                    <RoadView id="roadview"/> : <p>해당 지역에 로드뷰가 없습니다.</p>
                }
            </RoadViewDiv>
        </MapDiv>
        );
};

export default Map;