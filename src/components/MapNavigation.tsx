import styled from "styled-components";

interface mapNavigatorProp {
    map: boolean;
    roadview: boolean;
}

interface MapNavigationProps {
    setMapNavigator: Function;
    mapNavigator: mapNavigatorProp;
}

const MapNavigationDiv = styled.div`
    border: 2px solid #303952;
    width: fit content;
    margin: 30px auto;
    padding: 50px;
    font-size: 2.5rem;
    span {
        &:hover {
            color: #574b90;
            cursor: pointer;
        }
        &:not(:last-child)::after {
            content: "|";
            color: black;
            margin-left: 25px;
            margin-right: 25px;
        }
    }
`

const Span = styled.span<{isHighlight: boolean}>`
    color: ${({isHighlight}) => isHighlight ? "#ff4757" : "black"};
`

const MapNavigation: React.FC<MapNavigationProps> = ({mapNavigator, setMapNavigator}) => {

    return (
        <MapNavigationDiv>
            <Span onClick={() => setMapNavigator({"map": true, "roadview": false})} 
                isHighlight={mapNavigator.map && !mapNavigator.roadview}>지도 보기</Span>
            <Span onClick={() => setMapNavigator({"map": false, "roadview": true})}
                isHighlight={!mapNavigator.map && mapNavigator.roadview}>로드 뷰 보기</Span>
            <Span onClick={() => setMapNavigator({"map": true, "roadview": true})}
                isHighlight={mapNavigator.map && mapNavigator.roadview}>한 번에 보기</Span>
        </MapNavigationDiv>
    );
}

export default MapNavigation;