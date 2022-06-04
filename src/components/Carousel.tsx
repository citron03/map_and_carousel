import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SwiperCore, { Navigation, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SearchResultCard from "./SearchResultCard";

//* Props 타입 명시 컴포넌트가 상위 컴포넌트로 부터 어떤 속성을 전달받을 지에 대한 props 정의
interface CarouselProps {
    setData: Function;
}

const SearchDiv = styled.div`
    display: flex;
    justify-content: center;
    label {
        padding: 15px;
        font-size: 1.5rem;
    }
    input {
        width: 60%;
        font-size: 2rem;
    }
    button {
        font-size: 1.5rem;
        margin: 15px;
        padding: 10px;
    }
`

declare global {
    interface Window {
      kakao: any;
    }
  }
  

const { kakao } = window;

const Carousel: React.FC<CarouselProps> = ({setData}) => {
    // React.FC (React의 함수형 컴포넌트)

    SwiperCore.use([Navigation, Scrollbar]);

    const settings = {
        loop: true,
        spaceBetween: 50,
        navigation: {},
        scrollbar: { draggable: true, el: null },
        pagination: { clickable: true },
        slidesPerView: 1,
        breakpoints: {
          768: { // 768px 이상에서 적용
            slidesPerView: 3,
          },
        }
    };

    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    const [cardList, setCardList] = useState([]);

    const handleSearch = () => {
        var places = new kakao.maps.services.Places();
        var callback = function(result: any, status: any) {
            if (status === kakao.maps.services.Status.OK) {
                setCardList(result);
            } else {
                alert("검색어가 잘못 되었습니다!");
            }
        };
        places.keywordSearch(keyword, callback);
    }

    const handleClickCard = (el: any) => {
        setData(el);
        navigate("/search");
    }

    const handleEnter = (event: any) => {
        if (event.code === 'Enter') {
            handleSearch();
        }
    }
    
    return (
        <div>
            <h1>캐러셀</h1>
            <Swiper {...settings}>
                {cardList.length > 0 ?
                    cardList.map((el, idx) => {
                        return (
                            <SwiperSlide key={idx}>
                                <SearchResultCard data={el} onClick={() => handleClickCard(el)}/>
                            </SwiperSlide>
                        );
                    }) 
                : <h3>검색 결과가 없습니다.</h3>}
            </Swiper>
            <SearchDiv>
                <label>장소 검색</label>
                <input type="text" placeholder="검색" onChange={(e) => setKeyword(e.target.value)} onKeyDown={(e) => handleEnter(e)}/>
                <button onClick={handleSearch}>GO!</button>
            </SearchDiv>
        </div>
        );
};

export default Carousel;