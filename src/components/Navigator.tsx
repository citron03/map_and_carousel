import { NavLink } from "react-router-dom";
import styled from "styled-components";

interface NavigatorProps {

}

const NavigatorDiv = styled.div`
    display: flex;
    justify-content: center;
    a {
        color: #574b90;
        text-decoration: none;
        font-size: 3rem;
        padding: 15px;
    }
`

const LinkDiv = styled.div`
    padding: 30px;
    margin: 20px;
`

const activeStyle = {
    border: "3px solid #7158e2",
    borderRadius: "30px",
}
 
const defaultStyle = {

}

const Navigator: React.FC<NavigatorProps> = () => {

    return (
        <NavigatorDiv>
            <LinkDiv>
                <NavLink to="/" style={({ isActive }) => isActive ? activeStyle : defaultStyle}>지도 GO</NavLink>
            </LinkDiv>
            <LinkDiv>
                <NavLink to="/carousel" style={({ isActive }) => isActive ? activeStyle : defaultStyle}>검색 GO</NavLink>
            </LinkDiv>  
        </NavigatorDiv>
    );
}

export default Navigator;