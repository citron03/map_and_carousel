import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SwiperCore, { Navigation, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { PieChart, SearchResultCard } from "./";

//* Props 타입 명시 컴포넌트가 상위 컴포넌트로 부터 어떤 속성을 전달받을 지에 대한 props 정의
interface CarouselProps {
    setData: Function;
}

const SearchDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    label {
        padding: 15px;
        font-size: 1.5rem;
        @media only screen and (max-width: 767px) {
            font-size: 1rem;
        }
    }
    input {
        width: 60%;
        height: 4rem;
        font-size: 2rem;
        padding-left: 40px;
        @media only screen and (max-width: 767px) {
            width: 30%;
            font-size: 1rem;
            height: 1.5rem;
            padding-left: 20px;
        }
    }
    button {
        font-size: 1.5rem;
        margin: 15px;
        padding: 15px;
        background-color: white;
        border-radius: 25px;
        @media only screen and (max-width: 767px) {
            font-size: 1rem;
            margin: 5px;
            padding: 5px;
        }
    }
`

const SwiperDiv = styled.div`
    @media only screen and (max-width: 767px) {
        width: 80%;
        margin: auto;
    }
`

declare global {
    interface Window {
      kakao: any;
    }
  }
  

const { kakao } = window;

const SearchCarousel: React.FC<CarouselProps> = ({setData}) => {
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
            <h1>검색 결과</h1>
            <SwiperDiv>
                {cardList.length > 0 ?
                    <Swiper {...settings}>
                        {cardList.map((el, idx) => {
                            return (
                                <SwiperSlide key={idx}>
                                    <SearchResultCard data={el} onClick={() => handleClickCard(el)}/>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                : <h3>검색 결과가 없습니다.</h3>}
            </SwiperDiv>
            <SearchDiv>
                <label>장소 검색</label>
                <input type="text" placeholder="검색" onChange={(e) => setKeyword(e.target.value)} onKeyDown={(e) => handleEnter(e)}/>
                <button onClick={handleSearch}>GO!</button>
            </SearchDiv>
            {cardList.length > 0 ? <PieChart data={cardList}/> : null}
        </div>
        );
};

export default SearchCarousel;