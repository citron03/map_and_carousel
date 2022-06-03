import { Link } from "react-router-dom";
import styled from "styled-components";

interface NavigatorProps {

}

const NavigatorDiv = styled.div`
    a {
        color: purple;
        text-decoration: none;
        padding: 50px;
        font-size: 3rem;
    }
`

const Navigator: React.FC<NavigatorProps> = () => {

    return (
        <NavigatorDiv>
            <Link to="/">지도 GO</Link>
            <Link to="/carousel">검색 결과 GO</Link>
        </NavigatorDiv>
    );
}

export default Navigator;