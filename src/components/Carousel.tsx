import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

//* Props 타입 명시 컴포넌트가 상위 컴포넌트로 부터 어떤 속성을 전달받을 지에 대한 props 정의
interface CarouselProps {
    setData: Function;
}

const SearchDiv = styled.div`
    
`

declare global {
    interface Window {
      kakao: any;
    }
  }
  

const { kakao } = window;

const Carousel: React.FC<CarouselProps> = ({setData}) => {
    // React.FC (React의 함수형 컴포넌트)

    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");

    const handleSearch = () => {
        var places = new kakao.maps.services.Places();
        var callback = function(result: any, status: any) {
            if (status === kakao.maps.services.Status.OK) {
                console.log(result, "결과");
                setData(result);
            }
            navigate("/search");
        };
        places.keywordSearch(keyword, callback);
    }

    return (
        <div>
            <h1>캐러셀</h1>
            <SearchDiv>
                <label>검색</label>
                <input type="text" placeholder="검색" onChange={(e) => setKeyword(e.target.value)}/>
                <button onClick={handleSearch}>GO!</button>
            </SearchDiv>
        </div>
        );
};

export default Carousel;