import React from "react";

//* Props 타입 명시 컴포넌트가 상위 컴포넌트로 부터 어떤 속성을 전달받을 지에 대한 props 정의
interface MapProps {
    children?: React.ReactNode;
    width?: number;
    onClick?: () => void;
}

const Map: React.FC<MapProps> = (props) => {
    // React.FC (React의 함수형 컴포넌트)
    const {width, children, onClick} = props;
    
    return (
        <div>
            <h1> 안녕</h1>
        </div>
        );
};

export default Map;