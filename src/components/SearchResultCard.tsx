import React from "react"
import styled from "styled-components";

interface dataProp {
    address_name: string;
    road_address_name: string;
    category_group_name: string;
    category_name: string;
    phone: string;
    place_name: string;
    x: string;
    y: string;
}

interface SearchResultCardProps {
    data: dataProp;
    onClick: () => void;
}


const SearchResultCardDiv = styled.div`
    background-color: #f9f8d8;
    padding: 30px;
    margin: 60px;
    border: 3px solid black;
    border-radius: 20px;
    &:hover {
        border: 3px solid red;
        background-color: #fff700;
        cursor: pointer;
    }
`

const SearchResultCard: React.FC<SearchResultCardProps> = ({data, onClick}) => {
    return (
        <SearchResultCardDiv onClick={onClick}>
            <h1>{data.place_name}</h1>
            <h2>{data.category_group_name}</h2>
            <p>주소지: {data.address_name}</p>
            <p>도로명 주소: {data.road_address_name}</p>
            <p>카테고리 구분: {data.category_name}</p>
            {data.phone ? 
                <p>전화번호: {data.phone}</p> : null}
        </SearchResultCardDiv>
    );
}

export default SearchResultCard;